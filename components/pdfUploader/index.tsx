"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import axios from "axios";
import PDFList from "../pdfList";

const PDFUploader: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputRef = ref.current!;
    if (!inputRef.files?.length) {
      return;
    }
    try {
      const formData = new FormData();
      for (const file of Array.from(inputRef.files ?? [])) {
        formData.append("pdf-file", file);
      }
      await axios.post("/api/upload", formData);
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="pdf-upload-container">
        <div className="upload-pdf ">
          <div className="fileInput">
            <form
              className="flex justify-center"
              action="/upload"
              method="post"
              encType="multipart/form-data"
            >
              <input
                id="post-file"
                type="file"
                accept=".pdf"
                ref={ref}
                onChange={handleFileChange}
              />
              <label htmlFor="post-file">
                <div className="fileText ">Choose file</div>
              </label>
            </form>
            <div className="select-file flex justify-center p-3">
              {file ? (
                <div className="select-file flex justify-center">
                  {file?.name}
                </div>
              ) : (
                <div className="select-file flex justify-center">
                  No file chosen
                </div>
              )}
            </div>
          </div>
          <div className="select-file">
            {file && (
              <button onClick={handleSubmit} className="upload-btn">
                Upload
              </button>
            )}
          </div>
        </div>
        <PDFList />
      </div>
    </>
  );
};

export default PDFUploader;
