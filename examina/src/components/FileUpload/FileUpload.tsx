'use client';
import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import type { FilePondFile } from 'filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import Swal from 'sweetalert2';
import Button from '../Button/Button';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import styles from './FileUpload.module.css';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const FilePondUpload = () => {
  const [files, setFiles] = useState<(FilePondFile)[]>([]);
  const [isUpload, setIsUpload] = useState<boolean>(false);


  return (
    <>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        allowFileTypeValidation={true}
        acceptedFileTypes={['application/pdf']}
        labelFileTypeNotAllowed={'Apenas arquivos PDF são permitidos.'}
        fileValidateTypeLabelExpectedTypes={'Apenas arquivos PDF'}
        allowFileSizeValidation={true}
        maxFileSize={'1MB'}
        labelMaxFileSizeExceeded={'O arquivo é muito grande.'}
        labelMaxFileSize={'O tamanho máximo do arquivo é {filesize}.'}
        server={{
          process: (fieldName, file, metadata, load, error, progress, abort) => {
            if (file.type !== 'application/pdf') {
              error('O arquivo deve ser um PDF.');
              ErrorAlert({ message: 'PDF inválido, tente novamente.' });
              return;
            }

            if (file.size > 1024 * 1024) {
              error('O arquivo não pode exceder 1MB.');
              ErrorAlert({ message: 'O arquivo não pode exceder 1MB.' });
              return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const controller = new AbortController();
            const signal = controller.signal;

            fetch('/api/upload', {
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

                  Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Arquivo salvo com sucesso!',
                    confirmButtonText: 'OK',
                  });
                } else {
                  error(data.message || 'Erro ao enviar o arquivo. Tente novamente!');
                  ErrorAlert({ message: data.message || 'Erro ao enviar o arquivo. Tente novamente!' });
                }
              })
              .catch((err) => {
                error(err.message);
                ErrorAlert({ message: err.message || 'Erro ao enviar o arquivo. Tente novamente!' });
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
      {isUpload ? (
        <div className={styles.buttonsDiv}>
          <Button
            label={'Exames Arquivados'}
            icon={faFilePdf}
            href={'/uploads'}
            variant="link"
          />
        </div>
      ) : null}
    </>
  );
};

export default FilePondUpload;
