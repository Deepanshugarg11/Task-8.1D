import React, { useState } from 'react';
import './App.css';
import PostTypeSelector from './PostTypeSelector'; 
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import FindQuestion from './FindQuestion';

function App() {
    const [selectedOption, setSelectedOption] = useState('question');
    
    return (
        <div className="app-container">
            <h1>Welcome</h1>
            <PostTypeSelector selectedOption={selectedOption} onSelectOption={setSelectedOption} />
            {selectedOption === 'question' && <QuestionForm />} 
            {selectedOption === 'article' && <ArticleForm />} 
            {selectedOption === 'findQuestion' && <FindQuestion />}
        </div>
    );
}

export default App;
