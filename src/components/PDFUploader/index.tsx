import React, { useRef } from "react";
// import styles from "./uploader.module.css";

const PDFUploader: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("pdf", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // Handle successful upload, e.g., refresh the list of PDFs
        } else {
          // Handle errors
        }
      } catch (error) {
        console.error("Error uploading the PDF:", error);
      }
    }
  };

  return (
    <div className="">
      <input type="file" accept=".pdf" ref={fileInputRef} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default PDFUploader;
