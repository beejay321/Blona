import React, { useState, useEffect } from "react";
import styles from "./list.module.css";

type PDF = {
  id: string;
  name: string;
};

const PDFList: React.FC = () => {
  const [pdfs, setPDFs] = useState<PDF[]>([]);

  useEffect(() => {
    // Fetch the list of uploaded PDFs from the server
    const fetchPDFs = async () => {
      try {
        const response = await fetch("/api/list");
        const data = await response.json();
        setPDFs(data.pdfs);
      } catch (error) {
        console.error("Error fetching the list of PDFs:", error);
      }
    };

    fetchPDFs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted PDF from the state
        setPDFs((prevPDFs) => prevPDFs.filter((pdf) => pdf.id !== id));
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error("Error deleting the PDF:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Uploaded PDFs</h2>
      <ul>
        {pdfs.map((pdf) => (
          <li key={pdf.id}>
            {pdf.name}
            <button onClick={() => handleDelete(pdf.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PDFList;
