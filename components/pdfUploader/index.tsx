"use client";

import React, { useState } from "react";
import axios from "axios";
import PDFList from "../pdfList";

const PDFUploader: React.FC = () => {
  const [file, setFile] = useState<File>();

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
      <div className="pdf-upload-container">
        <div className="upload-pdf ">
          <button className="fileInput">
            <form
              onSubmit={handleUpload}
              className="flex justify-center"
              action="/upload"
              method="post"
              encType="multipart/form-data"
            >
              <input
                id="post-file"
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  setFile(e.target.files?.[0]);
                }}
              />
              <label htmlFor="post-file">
                <div className="fileText ">Click to upload file</div>
              </label>
            </form>
            <div className="select-file flex justify-center p-3">
              <div className="select-file flex justify-center">
                {file?.name}
              </div>
            </div>
          </button>
          <div className="select-file">
            {file && <button className="upload-btn">Upload</button>}
          </div>
        </div>
        <PDFList />
      </div>
    </>
  );
};

export default PDFUploader;
