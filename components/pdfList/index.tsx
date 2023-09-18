"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const PDFList: React.FC = () => {
  const [files, setFiles] = useState([]);

  const handleDelete = async (pdfName: string) => {
    try {
      const response = await axios.get("/api/files/" + pdfName);
      console.log(response?.data);
      setFiles(response?.data);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchPdfs = async () => {
    try {
      const response = await axios.get("/api/files");
      console.log(response?.data);
      setFiles(response?.data);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    fetchPdfs();
  }, []);

  return (
    <>
      <div className="filesDisplay">
        {files?.map((file, i) => (
          <div className="files" key={i}>
            <span>{file}</span>
            <span className="delete-btn" onClick={() => handleDelete(file)}>
              x
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default PDFList;
