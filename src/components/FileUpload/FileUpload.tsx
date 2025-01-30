'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import ModalAlert from '../ModalAlert/ModalAlert';
import styles from './FileUpload.module.css';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        ModalAlert({
          message: 'Apenas arquivos PDF são permitidos.',
          type: 'error',
          title: 'Erro',
        });
        return;
      }

      const maxSizeInBytes = 500 * 1024;
      if (selectedFile.size > maxSizeInBytes) {
        ModalAlert({
          message: 'O arquivo não pode exceder 500KB.',
          type: 'error',
          title: 'Erro',
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      ModalAlert({
        message: 'Selecione ou arraste um arquivo.',
        type: 'error',
        title: 'Erro',
      });
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/uploadPdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao enviar o arquivo.');
      }

      setIsUploadSuccessful(true);
      ModalAlert({
        message: 'Arquivo salvo com sucesso!',
        type: 'success',
        title: 'Sucesso',
      });
    } catch (error: any) {
      ModalAlert({
        message: error.message || 'Erro desconhecido.',
        type: 'error',
        title: 'Erro',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className={styles.fileInput}
      />

      {!isUploadSuccessful && (
        <Button
          variant="contained"
          className="upload-pdf-button"
          onClick={handleUpload}
          disabled={isUploading || !file}
        >
          {isUploading ? 'Enviando...' : 'Enviar'}
        </Button>
      )}

      {isUploadSuccessful && (
        <div className={styles.buttonsDiv}>
          <Button
            variant="contained"
            className="basicButton"
            startIcon={<FolderCopyIcon fontSize="large" />}
            href="/uploads"
          >
            Exames Arquivados
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
