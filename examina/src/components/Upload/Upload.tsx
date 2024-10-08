'use client'
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Upload.module.css';
import Button from '../Button/Button';

export default function FileUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const pdfFile = acceptedFiles[0];
        setSelectedFile(pdfFile); // Armazena o arquivo selecionado
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'], // Aceita apenas PDFs
        },
    });

    const handleSubmit = () => {
        if (selectedFile) {
            console.log("Enviando arquivo:", selectedFile);
            // Lógica de envio do arquivo para o backend
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Solte o arquivo aqui...</p>
                ) : (
                    <p>Arraste e solte o arquivo PDF aqui, ou clique para selecionar</p>
                )}
            </div>

            {selectedFile && (
                <div className={styles.fileInfo}>
                    <p><b>Arquivo carregado:</b> {selectedFile.name}</p>
                    <Button label="Enviar arquivo" onClick={handleSubmit} />
                </div>
            )}
        </div>
    );
}
