"use client";
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button/Button';
import ClipLoader from "react-spinners/ClipLoader";

interface Pdf {
    id: number;
    name: string;
    fileName: string;
    base64Pdf: string;
}

export default function Uploads() {
    const [pdfs, setPdfs] = useState<Pdf[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPdfs = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/getAll');
            const data: Pdf[] = await response.json();
            setPdfs(data);
        } catch (error) {
            console.error('Erro ao carregar PDFs:', error);
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
                alert('A aba foi bloqueada, permita pop-ups para abrir o PDF.');
            }

            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
        } catch (error) {
            console.error('Erro ao abrir o PDF:', error);
            alert(`Falha ao abrir o PDF: ${error}`);
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
                            icon={faFilePdf}
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
