import React, { useState } from "react";
import axios from "axios";
import FileDownload from "js-file-download";

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    axios.post("http://localhost:8000/", formData, {
      responseType: "blob"
        }).then(res => {
           return res.data;
        }).then((result)=>{
          FileDownload(result);
        })
  };

  return (
    <div
      className="w-50 h-50  d-flex justify-content-around "
      
    >
      <div className="w-50 h-100"
      style={{
        boxShadow: '15px 15px 6px #838de6',
      }}>
        <img
          src="https://theqalead.b-cdn.net/wp-content/uploads/sites/2/2020/06/WHAT-IS-A-QA-ANALYST-AND-WHAT-DO-THEY-REALLY-DO-1-800x759.png"
          alt="Json"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="w-50 h-100 bg-danger p-4"
      style={{
        boxShadow: '15px 15px 15px #f78279',
      }}>
        <input
          className="text-white"
          type="file"
          name="file"
          onChange={changeHandler}
        />
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
