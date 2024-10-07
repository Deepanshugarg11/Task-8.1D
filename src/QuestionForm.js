import React, { useState } from 'react';
import './QuestionForm.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

function QuestionForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');

    const userQuestionsRef = collection(db, 'questions');

    const writeQuestionData = async () => {
        await addDoc(userQuestionsRef, { title, description, tag })
            .then(() => alert('Question Uploaded!'))
            .catch((error) => console.error("Error uploading question: ", error));
    };

    return (
        <div className="question-form">
            <h2>Ask a Question</h2>
            <div className="form-field">
                <label>Title:</label>
                <input
                    type="text"
                    placeholder="Enter question title"
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div className="form-field">
                <label>Description:</label>
                <textarea
                    placeholder="Enter question description"
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <div className="form-field">
                <label>Tags:</label>
                <input
                    type="text"
                    placeholder="Enter tags"
                    onChange={(event) => setTag(event.target.value)}
                />
            </div>
            <button onClick={writeQuestionData} className="submit-button">Submit</button>
        </div>
    );
}

export default QuestionForm;




