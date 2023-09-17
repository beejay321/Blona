"use client";

import React, { useState } from "react";
import axios from "axios";

const PDFUploader: React.FC = () => {
  const [file, setFile] = useState<File>();
  const [files, setFiles] = useState(["file1", "file2", "file3"]);
  const handleUpload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("pdf", file);
        console.log(formData);
        const response = await axios.post("/api/pdfUpload", formData);
      } catch (error) {
        console.error("Error uploading the PDF:", error);
      }
    }
  };

  return (
    <>
      <div className="upload-pdf ">
        <button className="fileInput">
          <form
            className="flex flex-col align-middle"
            action="/upload"
            method="post"
            encType="multipart/form-data"
          >
            <input
              id="post-file"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                console.log(e.target.files?.[0]);
                setFile(e.target.files?.[0]);
              }}
            />
            <label htmlFor="post-file">
              <div className="fileText">Click to upload file</div>
            </label>
          </form>
          <div className="select-file">
            <div>{file?.name}</div>
          </div>
        </button>
        <div className="filesDisplay">
          {files.map((file, i) => (
            <div className="files" key={i}>
              <span>{file}</span>
              <span className="delete-btn">x</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PDFUploader;
