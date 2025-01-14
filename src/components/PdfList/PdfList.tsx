"use client";

import React, { useEffect, useState } from 'react';
import styles from "./PdfList.module.css";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import ClipLoader from "react-spinners/ClipLoader";
import ModalAlert from '@/components/ModalAlert/ModalAlert';
import { useSingleRequest } from '@/hooks/useSingleRequest';

interface Pdf {
  id: number;
  name: string;
  fileName: string;
  base64Pdf: string;
  createdAt: string;
}

export default function PdfList() {
  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const [loading, setLoading] = useState(false);
  const executeSingleRequest = useSingleRequest();

  const fetchPdfs = async () => {
    setLoading(true);
    try {
      const data = await executeSingleRequest(async () => {
        const response = await fetch('/api/getAllPdfs');
        const result: Pdf[] = await response.json();
        return result;
      });

      if (data) {
        const sortedData = [...data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPdfs(sortedData);
      }
    } catch {
      ModalAlert({ message: 'Erro ao carregar PDFs.', type: 'error', title: 'Erro' });
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
        ModalAlert({ message: 'A aba foi bloqueada. Permita pop-ups para abrir o PDF.', type: 'error', title: 'Erro' });
      }

      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      ModalAlert({ message: `Falha ao abrir o PDF: ${error}`, type: 'error', title: 'Erro' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('/api/deletePdf', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir o PDF');
      }

      await fetchPdfs();
      ModalAlert({ message: 'PDF excluído com sucesso!', type: 'success', title: 'Sucesso' });
    } catch {
      ModalAlert({ message: 'Falha ao excluir o PDF.', type: 'error', title: 'Erro' });
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <ClipLoader color="#388B8B" size={50} />
      </div>
    );
  }

  return (
    <div className={styles.pdfsDiv}>
      {pdfs.length > 0 ? (
        pdfs.map((pdf) => (
          <div key={pdf.id} className={styles.pdfRow}>
            <Button
              variant="contained"
              className={`${styles.pdfButton} pdf-button`}
              startIcon={<PictureAsPdfIcon sx={{ width: 30, height: 30 }} />}
              onClick={() => handlePdfClick(pdf)}
            >
              {pdf.fileName}
            </Button>
            <IconButton
              className={styles.deleteButton}
              color="error"
              onClick={() => handleDelete(pdf.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))
      ) : (
        <p>Nenhum exame arquivado encontrado.</p>
      )}
    </div>
  );
}
