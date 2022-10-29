import React, { useState } from "react";
import axios from "axios";

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    fetch("http://localhost:8000/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      className="w-50 h-50 d-flex justify-content-around "
      style={{ border: "3px solid black" }}
    >
      <div className="w-50 h-100">
        <img
          src="https://theqalead.b-cdn.net/wp-content/uploads/sites/2/2020/06/WHAT-IS-A-QA-ANALYST-AND-WHAT-DO-THEY-REALLY-DO-1-800x759.png"
          alt="Json"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="w-50 h-100 bg-danger p-4">
        <input className="text-white" type="file" name="file" onChange={changeHandler} />
        {isFilePicked ? (
          <div className="text-white">
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="text-white">Select a file to show details</p>
        )}
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default FileUploadPage;
