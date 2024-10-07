import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

function Image() {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const uploadImage = () => {
        if (image === null) return;
        const imageRef = ref(storage, `images/${image.name}`);
        uploadBytes(imageRef, image)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImageUrl(url);
                    alert("Image uploaded successfully!");
                });
            })
            .catch((error) => {
                console.error("Image upload failed:", error);
            });
    };

    return (
        <div>
            <input
                type="file"
                onChange={(event) => setImage(event.target.files[0])}
            />
            <button onClick={uploadImage}>Upload</button>
            {imageUrl && (
                <div>
                    <img src={imageUrl} alt="Uploaded" width="200px" />
                </div>
            )}
        </div>
    );
}

export default Image;

