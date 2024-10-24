"use client";

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button/Button';

interface Pdf {
    id: number;
    name: string;
    fileName: string;
    base64Pdf: string; 
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


//base64 são dados binários em formato de string que o navegador não consegue entender e precisa converter pra um ArrayBuffer que é uma estrutura binária que manipula dados em bytes porem ele só consegue ser aberto como um PDF se for criado um Blob que é um objeto que representa dados binários brutos em forma de arquivo do tipo MIME, dai é possivel criar uma URL temporaria pra que possa ser clicado e visualizado o PDF.

//navegadores não abrem Base64 diretamente como arquivos: a representação Base64 é útil para armazenar ou transferir dados, mas o navegador precisa de um formato binário para abrir e renderizar o PDF.

//segurança e eficiência: o Blob permite que o navegador lide de forma segura com os dados binários, sem risco de interpretá-los incorretamente. A URL temporária gerada pelo Blob é usada apenas temporariamente, garantindo que a memória seja liberada depois.