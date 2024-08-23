import React, { useState, useRef } from "react"; 
import axios from "axios";
import "../Styles/FileUploader.css";

// USED BOOTSTRAP FOR JSX AND CSS TO MAKE A DRAG AND DROP UPLOADER and edited some parts for my use
export const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const fileInputRef = useRef(null); 

    const onInputChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validate file type
            if (selectedFile.type === "image/gif") {
                setFile(selectedFile);
                setErrorMessage(""); // Clear any previous error message
            } else {
                setFile(null);
                setErrorMessage("Only GIF files are allowed.");
                fileInputRef.current.value = ""; // Reset the file input element
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            setErrorMessage("Please select a valid GIF file before submitting.");
            return;
        }

        const data = new FormData();
        data.append("gif", file); // Just to remember the key is gif

        axios.post("http://127.0.0.1:5000/uploads", data)
            .then(() => {
                console.log("SUCCESS");
                setErrorMessage(""); // Clear any previous error message
            })
            .catch((e) => {
                console.log("Error", e);
                setErrorMessage("Failed to upload the file. Please try again.");
            });
    };

    const onDelete = () => {
        setFile(null); // Clear the selected file
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset the file input element
        }
        setErrorMessage(""); // Clear any previous error message
    };

    return (
        <div className="Uploader">
            <form method="post" action="#" id="#" onSubmit={onSubmit}>
                <div className="form-group files">
                    <label>
                        <b>Upload Your File here</b>
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        ref={fileInputRef} 
                        accept="image/gif"
                        onChange={onInputChange}
                        name="gif"
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
                <div className="button-container">
                    <button type="submit" disabled={!file}>Submit</button>
                    {file && (
                        <button type="button" onClick={onDelete} style={{ backgroundColor: 'red', color: 'white' }}>
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
