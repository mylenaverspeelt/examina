# Examina

Examina é uma plataforma desenvolvida para facilitar o armazenamento e recuperação de exames médicos. Além de gerenciar arquivos PDF de exames, a aplicação também permite a extração de dados dos documentos para gerar gráficos e outras visualizações, oferecendo uma visão detalhada e acessível dos resultados de exames.

## Funcionalidades

- **Armazenamento de Exames**: Permite o upload de exames em formato PDF, organizando e armazenando para fácil acesso.
- **Recuperação de Arquivos PDF**: Exibe e disponibiliza os exames armazenados, permitindo sua visualização direta na plataforma.
- **Extração de Dados de PDFs**: Usa bibliotecas para ler e extrair dados dos exames PDF, possibilitando o uso desses dados em outras funcionalidades.
- **Geração de Gráficos**: Exibe gráficos detalhados, extraindo informações dos exames para criar representações visuais úteis, permitindo uma análise rápida e fácil.

## Tecnologias Utilizadas
  - [Next.js](https://nextjs.org/)
  - [FilePond](https://pqina.nl/filepond/) para upload de arquivos
  - [SweetAlert2](https://sweetalert2.github.io/) para exibição de alertas amigáveis

- **Visualização e Gráficos**: 
  - [ECharts](https://echarts.apache.org/) e [React-Chartjs-2](https://react-chartjs-2.js.org/) para a criação de gráficos dinâmicos.

- **Manipulação de PDFs**:
  - [PDF2JSON](https://github.com/modesty/pdf2json) para extração de dados dos arquivos PDF.

- **Documentação de API**:
  - [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) para documentar e testar a API.

- **Gerenciamento de Dependências**:
  - [FontAwesome](https://fontawesome.com/) para ícones
  - [UUID](https://www.npmjs.com/package/uuid) para geração de identificadores únicos.

- **Testes**:
  - [Cypress](https://www.cypress.io/) para testes end-to-end e de componentes.
  
## Instalação e Uso

Para incluir as instruções sobre a configuração do banco de dados e variáveis de ambiente, aqui está uma seção atualizada que pode ser adicionada na parte de "Instalação e Uso" do seu README:

---

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

   A plataforma requer um banco de dados PostgreSQL configurado. Certifique-se de que o PostgreSQL está instalado e funcionando na sua máquina. Em seguida, siga estes passos:

   - Crie um banco de dados no PostgreSQL para a aplicação.
   - Configure o arquivo de variáveis de ambiente `.env` na raiz do projeto. 

   Exemplo de configuração no `.env`:
   ```plaintext
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
   ```

   - Em seguida, gere e aplique o esquema do banco de dados (localizado no Prisma) usando os comandos:

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Inicie o projeto em modo de desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Inicie o projeto em modo de produção**:
   ```bash
   npm start
   ```

Essas instruções orientam a pessoa a configurar o banco de dados corretamente e também fornecem detalhes claros sobre o uso do Prisma para gerar o esquema, além da configuração do `.env`. Isso deve facilitar a instalação e configuração.
## Scripts Disponíveis

- `dev`: Inicia a aplicação em modo de desenvolvimento.
- `build`: Compila a aplicação para produção.
- `start`: Inicia a aplicação no modo de produção.
- `lint`: Executa o linter para garantir a padronização do código.

## Estrutura do Projeto

- **/pages**: Contém as rotas e componentes de cada página do Next.js.
- **/components**: Componentes reutilizáveis da interface.
- **/utils**: Funções utilitárias para manipulação de dados e formatação.
- **/services**: Serviços para comunicação com a API e manipulação de arquivos.
- **/styles**: Arquivos de estilos globais e específicos.
- **/tests**: Configurações e testes unitários e end-to-end.

## Contribuição

1. Faça o fork do projeto
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Envie para o branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request
