'use client';
import { FilePond, registerPlugin, FilePondFile } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { useState } from 'react';

// filepond registra o plugin pra validar o tipo de arquivo
registerPlugin(FilePondPluginFileValidateType);

export default function FileUpload() {
  const [files, setFiles] = useState<FilePondFile[]>([]); 

  return (
    <div>
      <FilePond
        files={files}
        onupdatefiles={(fileItems) => setFiles(fileItems)}
        allowMultiple={false}
        acceptedFileTypes={['application/pdf']}
        server={{
          process: {
            url: '/api/upload', 
            method: 'POST',
            withCredentials: false,
            headers: {},
            onload: (response: string) => {
              try {
                const result = JSON.parse(response);
                console.log(result.message);
                // retorna um id de arquivo como string, necessário pro filepond
                return result.fileId || 'uploaded-file-id'; // retorna um id padrão se o id não estiver presente
              } catch (error) {
                return (`Erro ao processar a resposta: ${error}`)
              }
            },
            onerror: (error) => {
              console.error('Erro ao enviar o arquivo:', error);
            },
          },
        }}
        labelIdle='Arraste e solte um arquivo PDF ou <span class="filepond--label-action">clique para selecionar</span>'
      />
    </div>
  );
}


// VER COMO FICA MAIS DE UM UPLOAD
// VER COMO FICA UPLOAD DE !PDF
// ESTILOS DO COMPONENTE UPLOAD
// VERIFICAÇÃO DO TAMANHO DO PDF
// VER SOBRE CONVERTER PRA JSON !!!!!!