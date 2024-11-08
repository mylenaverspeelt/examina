"use client"
import React, { useState } from 'react';
import { FilePond, registerPlugin, FilePondFile } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import styles from './FileUpload.module.css'
import Button from '../Button/Button';
import { faRedo } from '@fortawesome/free-solid-svg-icons';


registerPlugin(FilePondPluginFileValidateType);

const FilePondUpload = () => {
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const [isUpload, setIsUpload] = useState<boolean>(false)

  const handleFileUpload = async (fileItems: FilePondFile[]) => {
    if (fileItems.length === 0) return;

    const file = fileItems[0].file;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Resposta da API:', data);
      } else {
        console.error('Erro ao enviar o arquivo. Status:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={false}
        server={{
          process: (fieldName, file, metadata, load) => {
            handleFileUpload([{ file } as FilePondFile]);
            load(file.name);
            setIsUpload(true)
          },
        }}
        allowFileTypeValidation={true}
        acceptedFileTypes={['application/pdf']}
        labelFileTypeNotAllowed={'Apenas arquivos PDF são permitidos.'}
        fileValidateTypeLabelExpectedTypes={'Apenas arquivos PDF'}
        name="file"
        labelIdle='Arraste e solte seu PDF ou <span class="filepond--label-action">selecione seus arquivos</span>'
      />
      {isUpload ? <div className={styles.cards}><Button  label='Enviar novo exame' variant='link' href={'/new'} icon={faRedo} /> <Button label={'Exames Arquivados'} icon={faFilePdf} href={'/uploads'} variant='link' /> </div> : null}
    </>
  );
};

export default FilePondUpload;
