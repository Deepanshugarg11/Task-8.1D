import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import "./FindQuestion.css";

function FindQuestion() {
    const [questions, setQuestions] = useState([]);
    const [filterTitle, setFilterTitle] = useState('');
    const [filterTag, setFilterTag] = useState('');
    const [newQuestion, setNewQuestion] = useState({ title: '', tag: '', desc: '', date: '' });
    const [expandedIndex, setExpandedIndex] = useState(null);
    const userQuestionsRef = collection(db, 'questions');
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    useEffect(() => {
        const getQuestions = async () => {
            const data = await getDocs(userQuestionsRef);
            const questionData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setQuestions(questionData);
            setFilteredQuestions(questionData);
        };
        getQuestions();
    }, []);

    const handleFilter = () => {
        const filteredQuestions = questions.filter(
            (question) =>
                question.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
                question.tag.toLowerCase().includes(filterTag.toLowerCase())
        );
        setFilteredQuestions(filteredQuestions);
    };

    const handleDeleteQuestion = async (id) => {
        await deleteDoc(doc(db, 'questions', id));
        const updatedQuestions = filteredQuestions.filter((question) => question.id !== id);
        setFilteredQuestions(updatedQuestions);
    };

    const handleSubmitNewQuestion = async () => {
        const currentDate = new Date().toLocaleDateString();
        const questionWithDate = { ...newQuestion, date: currentDate };
        await addDoc(collection(db, 'questions'), questionWithDate);
        setFilteredQuestions([...filteredQuestions, questionWithDate]);
        setNewQuestion({ title: '', tag: '', desc: '', date: '' });
    };

    const handleExpand = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <div className='FindQuestion'>
            <h2>Filter Questions</h2>
            <div className="filter">
                <label>Filter by title:</label>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={filterTitle}
                    onChange={(event) => setFilterTitle(event.target.value)}
                />
                <label>Filter by tag:</label>
                <input
                    type="text"
                    placeholder="Enter tag"
                    value={filterTag}
                    onChange={(event) => setFilterTag(event.target.value)}
                />
                <button onClick={handleFilter} className="Button">Search</button>
            </div>

            <div className="questions-list">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question, index) => (
                        <div key={question.id} className="card">
                            <h2>{question.title}</h2>
                            <p>Tags: {question.tag}</p>
                            <p>Date: {question.date}</p>
                            <button className="Button" onClick={() => handleExpand(index)}>
                                {expandedIndex === index ? 'Hide Details' : 'Show Details'}
                            </button>
                            {expandedIndex === index && <p>Description: {question.desc}</p>}
                            <button className="Button" onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No questions found.</p>
                )}
            </div>

            <div className="new-question-form">
                <h2>Add New Question</h2>
                <label>Title:</label>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={newQuestion.title}
                    onChange={(event) => setNewQuestion({ ...newQuestion, title: event.target.value })}
                />
                <label>Tags:</label>
                <input
                    type="text"
                    placeholder="Enter tags"
                    value={newQuestion.tag}
                    onChange={(event) => setNewQuestion({ ...newQuestion, tag: event.target.value })}
                />
                <label>Description:</label>
                <input
                    type="text"
                    placeholder="Enter description"
                    value={newQuestion.desc}
                    onChange={(event) => setNewQuestion({ ...newQuestion, desc: event.target.value })}
                />
                <button onClick={handleSubmitNewQuestion} className="Button">Add</button>
            </div>
        </div>
    );
}

export default FindQuestion;

