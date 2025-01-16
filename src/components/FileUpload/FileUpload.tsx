'use client';

import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { Button } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import ModalAlert from '../ModalAlert/ModalAlert';
import styles from './FileUpload.module.css';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const FilePondUpload: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [isUpload, setIsUpload] = useState<boolean>(false);

  return (
    <>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        maxFiles={1}
        acceptedFileTypes={['application/pdf']}
        labelFileTypeNotAllowed={'Apenas arquivos PDF são permitidos.'}
        fileValidateTypeLabelExpectedTypes={'Apenas arquivos PDF'}
        server={{
          process: (fieldName, file, metadata, load, error, progress, abort) => {
            if (file.type !== 'application/pdf') {
              console.log('Chamando ModalAlert com erro de tipo inválido');
              error('O arquivo deve ser um PDF.');
              ModalAlert({ message: 'Apenas arquivos PDF são permitidos.', type: 'error', title: 'Erro' });
              return;
            }
            
            const maxSizeInBytes = 500 * 1024;
            if (file.size > maxSizeInBytes) {
              error('O arquivo não pode exceder 500KB.');
              ModalAlert({ message: 'O arquivo não pode exceder 500KB.', type: 'error', title: 'Erro' });
              return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const controller = new AbortController();
            const signal = controller.signal;

            fetch('/api/uploadPdf', {
              method: 'POST',
              body: formData,
              signal,
            })
              .then((response) => {
                if (!response.ok) {
                  return response.json().then((data) => {
                    throw new Error(data.message || 'Erro ao enviar o arquivo.');
                  });
                }
                return response.json();
              })
              .then((data) => {
                if (data.success) {
                  load(file.name);
                  setIsUpload(true);
                  ModalAlert({ message: 'Arquivo salvo com sucesso!', type: 'success', title: 'Sucesso' });
                } else {
                  error(data.message || 'Erro ao enviar o arquivo.');
                  ModalAlert({ message: data.message || 'Erro ao enviar o arquivo.', type: 'error', title: 'Erro' });
                }
              })
              .catch((err) => {
                const errorMessage = typeof err.message === 'string' ? err.message : 'Erro desconhecido.';
                error(errorMessage);
                ModalAlert({ message: errorMessage, type: 'error', title: 'Erro' });
              });

            return {
              abort: () => {
                controller.abort();
                abort();
              },
            };
          },
        }}
        name="file"
        labelIdle='Arraste e solte seu PDF ou <span class="filepond--label-action">selecione seu arquivo</span>'
      />
      {isUpload && (
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
    </>
  );
};

export default FilePondUpload;
