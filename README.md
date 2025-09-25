# Portfolio API Backend

API backend robusta e escalável desenvolvida com NestJS para gerenciar projetos, habilidades e dados de contato para o seu portfólio.

---

## 💻 Tecnologias Utilizadas

-   **[NestJS](https://nestjs.com/)**: Framework Node.js para construção de APIs.
-   **[TypeScript](https://www.typescriptlang.org/)**: Linguagem com tipagem estática para maior segurança e escalabilidade.
-   **[Prisma](https://www.prisma.io/)**: ORM para acesso ao banco de dados PostgreSQL.
-   **[Cloudinary](https://cloudinary.com/)**: Serviço de gerenciamento de assets digitais para upload de imagens.
-   **[JWT](https://jwt.io/)**: JSON Web Tokens para autenticação.
-   **[Multer](https://github.com/expressjs/multer)**: Middleware para manipulação de uploads de arquivos.
-   **[Eslint & Prettier](https://eslint.org/)**: Para padronização e formatação de código.
-   **[Docker](https://www.docker.com/)**: Para ambientes de desenvolvimento e produção consistentes.

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* Node.js (versão >= 16)
* npm ou yarn
* PostgreSQL
* Uma conta no Cloudinary

---

## 🛠️ Configuração do Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Crie o arquivo de variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e preencha com suas credenciais:

    ```env
    # Configuração do Banco de Dados
    DATABASE_URL="postgresql://user:password@host:port/database"
    
    # Segredos de Autenticação JWT
    JWT_SECRET="seu_segredo_jwt_aqui"
    ADMIN_EMAIL="seu_email@dominio.com"
    PASS="sua_senha_secreta"
    
    # Configuração do Cloudinary
    CLOUDINARY_CLOUD_NAME="seu_cloud_name"
    CLOUDINARY_API_KEY="sua_api_key"
    CLOUDINARY_API_SECRET="seu_api_secret"
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute as migrações do Prisma:**
    ```bash
    npx prisma migrate dev --name init
    ```

---

## ▶️ Como Rodar

* **Modo de Desenvolvimento:**
    ```bash
    npm run start:dev
    ```
    A API estará disponível em `http://localhost:3000`.

* **Modo de Produção:**
    ```bash
    npm run build
    npm run start:prod
    ```

---

## 🗺️ Endpoints da API

### `Auth` (Autenticação)

* `POST /auth/login`
    Faz login do usuário. Requer `email` e `password` no corpo da requisição (JSON). O token JWT é retornado e armazenado em um cookie `jwt`.

* `GET /auth/profile`
    Retorna os dados do usuário autenticado. **Requer Autenticação JWT.**

* `GET /auth/logout`
    Limpa o cookie JWT e encerra a sessão.

### `Projects` (Projetos)

* `GET /projects`
    Lista todos os projetos de forma paginada. **Endpoint Público.**
    Parâmetros de query (opcionais): `?page=1&limit=10`

* `GET /projects/:id`
    Retorna um projeto específico. **Endpoint Público.**

* `POST /projects`
    Cria um novo projeto. **Requer Autenticação JWT.**
    -   `Content-Type`: `multipart/form-data`
    -   Campos no body: `title`, `description`, `linkRepo` (opcional), `linkDeploy` (opcional).
    -   Arquivos: `image` (suporta múltiplos arquivos).

* `PATCH /projects/:id`
    Atualiza um projeto existente. **Requer Autenticação JWT.**

* `DELETE /projects/:id`
    Deleta um projeto. **Requer Autenticação JWT.** Retorna `204 No Content` em caso de sucesso.

### `Skills` (Habilidades)

* `GET /skills`
    Lista todas as habilidades. **Endpoint Público.**

* `GET /skills/:id`
    Retorna uma habilidade específica. **Endpoint Público.**

* `POST /skills`
    Cria uma nova habilidade. **Requer Autenticação JWT.**
    -   `Content-Type`: `application/json`
    -   Campos no body: `name` e `level` (`Basico`, `Intermediario`, `Avancado`, `Especialista`).

* `PATCH /skills/:id`
    Atualiza uma habilidade. **Requer Autenticação JWT.**

* `DELETE /skills/:id`
    Deleta uma habilidade. **Requer Autenticação JWT.** Retorna `204 No Content` em caso de sucesso.

### `Contact` (Contato)

* `POST /contact`
    Envia uma mensagem de contato. **Endpoint Público.**
    -   `Content-Type`: `application/json`
    -   Campos no body: `name`, `email` e `message`.

---

## 🤝 Como Contribuir

1.  Faça um `fork` do projeto.
2.  Crie uma nova `branch` (`git checkout -b feature/sua-feature`).
3.  Faça suas mudanças (`git commit -am 'feat: adicionei nova feature'`).
4.  Envie suas mudanças para o seu `fork` (`git push origin feature/sua-feature`).
5.  Abra um `Pull Request` detalhado.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

---

## 👨‍💻 Contato

Desenvolvido por [Hugo](https://github.com/hugozeymer). Sinta-se à vontade para entrar em contato para dúvidas ou sugestões.