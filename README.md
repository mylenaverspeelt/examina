# Examina

Examina é uma plataforma desenvolvida para facilitar o armazenamento e recuperação de exames médicos. Além de gerenciar arquivos PDF de exames, a aplicação também permite a extração de dados dos documentos para gerar gráficos, oferecendo uma visão detalhada e acessível dos resultados de exames.

## Funcionalidades

- **Armazenamento de Exames**: Upload de exames em formato PDF, organizando e armazenando para fácil acesso.
- **Recuperação de Arquivos PDF**: Exibição e disponibilização dos exames armazenados para visualização direta.
- **Extração de Dados de PDFs**: Extração de informações dos arquivos PDF.
- **Geração de Gráficos**: Representações visuais dinâmicas baseadas nos dados extraídos.

## Tecnologias Utilizadas

- **Next.js** para o desenvolvimento do front-end e back-end.
- **FilePond** e **React-FilePond** para upload de arquivos PDF.
- **SweetAlert2** para exibição de alertas amigáveis.
- **React-Chartjs-2** para geração de gráficos dinâmicos.
- **PDF2JSON** para extração de dados dos PDFs.
- **Prisma** para modelagem e interação com o banco de dados.
- **UUID** para geração de identificadores únicos.
- **Jest** para testes unitários.
- **Vercel** para deploy contínuo e hospedagem do projeto.
- **GitHub Actions** para automação utilizado para realizar fluxo de integração contínua (CI). 
- **PostgreSQL**: Hospedado no [Neon](https://console.neon.tech/app/projects).

## Instalação e Uso

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/mylenaverspeelt/examina.git
   ```

2. **Acesse o diretório e instale as dependências**:
   ```bash
   cd examina
   npm install
   ```

3. **Configuração do Banco de Dados**:
   - Certifique-se de que o PostgreSQL está instalado e funcionando na sua máquina.
   - Configure o arquivo `.env` na raiz do projeto com a URL do banco de dados:
     ```plaintext
     DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
     ```
   - Aplique o esquema do banco de dados:
     ```bash
     npx prisma migrate dev --name init
     ```

4. **Inicie o projeto**:
   ```bash
   npm run dev
   ```

## Build em Produção

A aplicação está disponível em produção na Vercel e pode ser acessada [aqui](https://examina-mylenaverspeelts-projects.vercel.app/)

## Modelo de laudo
O modelo do laudo para upload esta disponível pra download [aqui](https://drive.google.com/drive/folders/15Ar3aJjjLi4XCMXsLj673TxMAiKgxpIB?usp=sharing)

## Testes Unitários

O projeto utiliza **Jest** para os testes unitários, garantindo a qualidade do código e funcionamento esperado das funcionalidades.

### Rodando os Testes

Para executar os testes, utilize o seguinte comando:

```bash
npm run test
```

Se quiser executar os testes no modo contínuo ou em pipelines de CI, você pode usar:

```bash
npm run test:ci
```

Os testes estão configurados para rodar automaticamente antes de cada push no repositório.

## Integração Contínua (CI)

Foi configurado um sistema de Integração Contínua (CI) que executa automaticamente os testes unitários toda vez que você faz um push para o repositório. Isso garante que o código enviado está funcionando corretamente e atende aos critérios estabelecidos antes de ser integrado ao projeto.

O CI está configurado no arquivo `.github/workflows/test.yml` e utiliza GitHub Actions para automação.

## Scripts Disponíveis

- `dev`: Inicia o aplicativo em modo de desenvolvimento.
- `build`: Gera o build de produção.
- `start`: Inicia o servidor em modo de produção.
- `test`: Executa os testes unitários.
- `lint`: Executa o linter para verificar a padronização do código.

## Estrutura do Projeto

- **/src**: Diretório principal contendo o código-fonte do projeto.
- **/app**: Diretório onde estão as páginas, rotas e testes unitários da aplicação.
- **/components**: Componentes reutilizáveis da interface do usuário.
- **/dto**: Objetos de transferência de dados (Data Transfer Objects) para padronização de dados entre as camadas do sistema.
- **/services**: Arquivos responsáveis pela comunicação com a API.
- **/styles**: Arquivos de estilos globais e específicos.
- **/utils**: Funções utilitárias para manipulação e formatação de dados.

## Contribuição

1. Faça o fork do projeto.
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie para o branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.
