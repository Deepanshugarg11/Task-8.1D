import React from 'react';

function PostTypeSelector({ selectedOption, onSelectOption }) {
    return (
        <div>
            <label>Select Post Type:</label>
            <select value={selectedOption} onChange={(e) => onSelectOption(e.target.value)}>
                <option value="question">Question</option>
                <option value="article">Article</option>
                <option value="findQuestion">Find Question</option>
            </select>
        </div>
    );
}

export default PostTypeSelector;

