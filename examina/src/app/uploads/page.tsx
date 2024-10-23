"use client";

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button/Button';

interface Pdf {
    id: number;
    name: string;
    fileName: string;
    base64Pdf: string; // PDF será recebido como base64 string
}

export default function Uploads() {
    const [pdfs, setPdfs] = useState<Pdf[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPdfs() {
            try {
                const response = await fetch('/api/getAll');
                const data: Pdf[] = await response.json();
                setPdfs(data);
            } catch (error) {
                console.error('Erro ao carregar PDFs:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPdfs();
    }, []);

    const base64ToArrayBuffer = (base64: string) => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };

    const handlePdfClick = (pdf: Pdf) => {
        try {
            if (!pdf.base64Pdf || pdf.base64Pdf.length === 0) {
                throw new Error("O PDF está vazio ou corrompido.");
            }

            // converte de base64 para ArrayBuffer e cria um blob
            const arrayBuffer = base64ToArrayBuffer(pdf.base64Pdf);
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

            const blobUrl = URL.createObjectURL(blob);

            const newWindow = window.open();
            if (newWindow) {
                newWindow.document.write(`<iframe src="${blobUrl}" style="width:100%; height:100%; border:none;"></iframe>`);
                newWindow.document.title = pdf.name; // 
            } else {
                alert('A aba foi bloqueada, permita pop-ups para abrir o PDF.');
            }

            // libera url do blob após o uso
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
        } catch (error) {
            console.error('Erro ao abrir o PDF:', error);
            alert(`Falha ao abrir o PDF: ${error}`);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.main}>
            <h1>Exames arquivados</h1>
            {pdfs.length > 0 ? (
                pdfs.map((pdf) => (
                    <div key={pdf.id} onClick={() => handlePdfClick(pdf)} style={{ cursor: 'pointer' }}>
                        <Button
                            href="#"
                            variant="linkPDF"
                            icon={faFilePdf}
                            label={pdf.fileName}
                        />
                    </div>
                ))
            ) : (
                <p>Nenhum exame arquivado encontrado.</p>
            )}
        </div>
    );
}
