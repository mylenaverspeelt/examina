'use client';

import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import Swal from 'sweetalert2';
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
              error('O arquivo deve ser um PDF.');
              ModalAlert({ message: 'Apenas arquivos PDF são permitidos.', type: 'error' });
              return;
            }

            const maxSizeInBytes = 500 * 1024;
            if (file.size > maxSizeInBytes) {
              error('O arquivo não pode exceder 500KB.');
              ModalAlert({ message: 'O arquivo não pode exceder 500KB.', type: 'error' });
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
                  throw new Error('Erro ao enviar o arquivo.');
                }
                return response.json();
              })
              .then((data) => {
                if (data.success) {
                  load(file.name);
                  setIsUpload(true);

                
              ModalAlert({ message: 'Arquivo salvo com sucesso!', type: 'success' });

                } else {
                  error(data.message || 'Erro ao enviar o arquivo. Tente novamente!');
                  ModalAlert({ message: data.message || 'Erro ao enviar o arquivo. Tente novamente!', type: 'error' });
                }
              })
              .catch((err) => {
                error(err.message);
                ModalAlert({ message: err.message || 'Erro ao enviar o arquivo. Tente novamente!', type: 'error' });
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
