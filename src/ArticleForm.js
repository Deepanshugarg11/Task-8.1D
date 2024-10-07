import React, { useState } from 'react';
import './ArticleForm.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import Image from './Image';

function ArticleForm() {
    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [article, setArticle] = useState("");
    const [tag, setTag] = useState("");

    const userCollectionRef = collection(db, "article");

    const writeUserData = async () => {
        await addDoc(userCollectionRef, { title: title, abstract: abstract, article: article, tag: tag })
            .then(() => alert("Data Uploaded!"));
    };

    return (
        <>
            <div className="img">
                <h2>Add an image:</h2>
                <Image />
            </div>
            <div className='articleHeader'>
                <h2>What do you want to share?</h2>
                <div className='title'>
                    <label>Title:</label>
                    <input type="text" placeholder="Enter title" onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div className='Abstract'>
                    <label>Abstract:</label>
                    <input type="text" placeholder="Enter article abstract" onChange={(event) => setAbstract(event.target.value)} />
                </div>
                <div className='Article'>
                    <label>Article Text:</label>
                    <input type="text" placeholder="Enter article text" onChange={(event) => setArticle(event.target.value)} />
                </div>
                <div className='Tag'>
                    <label>Tags:</label>
                    <input type="text" placeholder="Enter tags" onChange={(event) => setTag(event.target.value)} />
                </div>
                <button onClick={writeUserData} className="Button">Post</button>
            </div>
        </>
    );
}

export default ArticleForm;
