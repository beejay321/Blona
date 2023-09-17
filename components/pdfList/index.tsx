"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const PDFList: React.FC = () => {
  const [files, setFiles] = useState(["file1", "file2", "file3"]);

  const fetchPdfs = async () => {
    try {
      const response = await axios.get("/api/pdfList");
      console.log(response);
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
        {files.map((file, i) => (
          <div className="files" key={i}>
            <span>{file}</span>
            <span className="delete-btn">x</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default PDFList;
