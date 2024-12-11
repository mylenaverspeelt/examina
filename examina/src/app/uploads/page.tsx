"use client";
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Button from '@/components/Button/Button';
import ClipLoader from "react-spinners/ClipLoader";
import ErrorAlert from '@/components/ErrorAlert/ErrorAlert';

interface Pdf {
  id: number;
  name: string;
  fileName: string;
  base64Pdf: string;
  createdAt: string; 
}

export default function Uploads() {
  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPdfs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getAll');
      const data: Pdf[] = await response.json();
      
      // Ordena os PDFs pela data de envio (createdAt), do mais recente para o mais antigo
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setPdfs(data);
    } catch {
      ErrorAlert({ message: 'Erro ao carregar PDFs.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const base64ToArrayBuffer = (base64: string) => {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const handlePdfClick = (pdf: Pdf) => {
    try {
      if (!pdf.base64Pdf || pdf.base64Pdf.length === 0) {
        throw new Error("O PDF está vazio ou corrompido.");
      }

      const arrayBuffer = base64ToArrayBuffer(pdf.base64Pdf);
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

      const blobUrl = URL.createObjectURL(blob);       

      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<iframe src="${blobUrl}" style="width:100%; height:100%; border:none;"></iframe>`);
        newWindow.document.title = pdf.name;
      } else {
        ErrorAlert({ message: 'A aba foi bloqueada. Permita pop-ups para abrir o PDF.' });
      }

      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      ErrorAlert({ message: `Falha ao abrir o PDF: ${error}` });
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader color="#0070f3" size={50} />
      </div>
    );
  }
  
  return (
    <div className={styles.main}>
      <h1>Exames arquivados</h1>
      {pdfs.length > 0 ? (
        pdfs.map((pdf) => (
          <div key={pdf.id} style={{ cursor: 'pointer' }}>
            <Button
              variant="linkPDF"
              icon={<PictureAsPdfIcon />}
              label={pdf.fileName}
              onClick={() => handlePdfClick(pdf)}
              id={pdf.id}
              onDeleted={fetchPdfs}
            />
          </div>
        ))
      ) : (
        <p>Nenhum exame arquivado encontrado.</p>
      )}
    </div>
  );
}
