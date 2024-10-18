"use client"
import React, { useState } from 'react';
import { FilePond, registerPlugin, FilePondFile } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

// Importar o plugin de validação de tipo de arquivo
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Registrar o plugin
registerPlugin(FilePondPluginFileValidateType);

const FilePondUpload = () => {
  const [files, setFiles] = useState<FilePondFile[]>([]); // Definir o tipo dos arquivos como FilePondFile[]

  const handleFileUpload = async (fileItems: FilePondFile[]) => {
    // Verificar se há arquivos disponíveis
    if (fileItems.length === 0) return;

    // Extrair o arquivo do FilePond
    const file = fileItems[0].file;

    console.log('Arquivo selecionado:', file);

    // Criar um FormData para enviar para a API
    const formData = new FormData();
    formData.append('file', file);

    console.log('FormData construído:', formData);

    try {
      // Fazer a requisição para a API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Requisição enviada para a API. Aguardando resposta...');

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
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={false} // Permitir apenas um arquivo
      server={{
        process: (fieldName, file, metadata, load) => {
          // Chama a função handleFileUpload para lidar com o upload manualmente
          handleFileUpload([{ file } as FilePondFile]);
          load(file.name); // Finaliza o processo
        },
      }}
      allowFileTypeValidation={true}
      acceptedFileTypes={['application/pdf']} // Aceitar apenas PDFs
      labelFileTypeNotAllowed={'Apenas arquivos PDF são permitidos.'}
      fileValidateTypeLabelExpectedTypes={'Apenas arquivos PDF'}
      name="file" // Nome do campo de upload
      labelIdle='Arraste e solte seu PDF ou <span class="filepond--label-action">procure</span>'
    />
  );
};

export default FilePondUpload;
