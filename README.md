# Portfolio Backend API

API backend construída com NestJS para gerenciar projetos e habilidades.

---

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) - Framework Node.js para construção de APIs escaláveis.
- [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript com tipagem estática.
- [Prisma](https://www.prisma.io/) - ORM para banco de dados.
- [Cloudinary](https://cloudinary.com/) - Serviço para upload e gerenciamento de imagens.
- [JWT](https://jwt.io/) - Autenticação via JSON Web Tokens.
- [Multer](https://github.com/expressjs/multer) - Middleware para upload de arquivos.
- [Jest](https://jestjs.io/) - Framework de testes.
- [Supertest](https://github.com/visionmedia/supertest) - Testes end-to-end para APIs.

---

## Requisitos

- Node.js >= 16
- Banco de dados configurado e migrado via Prisma
- Conta Cloudinary com credenciais configuradas no `.env`

---

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="sua_string_de_conexao"
JWT_SECRET="seu_segredo_jwt"
CLOUDINARY_CLOUD_NAME="seu_cloud_name"
CLOUDINARY_API_KEY="sua_api_key"
CLOUDINARY_API_SECRET="seu_api_secret"
```

---

## Como Rodar

```bash
npm install
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

---

## Endpoints

### Auth

- `POST /auth/login`  
  Login do usuário. Recebe JSON com `email` e `password`. Retorna token JWT via cookie.

- `GET /auth/profile`  
  Retorna dados do usuário autenticado. Requer JWT.

- `GET /auth/logout`  
  Faz logout limpando o cookie JWT.

---

### Projects

- `GET /projects`  
  Lista todos os projetos. Requer JWT.

- `GET /projects/:id`  
  Busca projeto por ID. Requer JWT.

- `POST /projects`  
  Cria um novo projeto. Requer JWT.  
  Aceita campos no body (form-data):  
  - `title` (string, obrigatório)  
  - `description` (string, obrigatório)  
  - `linkRepo` (string, URL, opcional)  
  - `linkDeploy` (string, URL, opcional)  
  - `image` (arquivo, aceita múltiplos arquivos)  

- `PATCH /projects/:id`  
  Atualiza projeto por ID. Requer JWT.

- `DELETE /projects/:id`  
  Deleta projeto por ID. Requer JWT.

---

### Skills

- `GET /skills`  
  Lista todas as habilidades. Requer JWT.

- `GET /skills/:id`  
  Busca habilidade por ID. Requer JWT.

- `POST /skills`  
  Cria nova habilidade. Requer JWT.  
  Campos JSON:  
  - `name` (string, obrigatório)  
  - `level` (enum: Basico, Intermediario, Avançado, Especialista)

- `PATCH /skills/:id`  
  Atualiza habilidade por ID. Requer JWT.

- `DELETE /skills/:id`  
  Deleta habilidade por ID. Requer JWT.

---

## Como Testar Upload de Imagens

No endpoint `POST /projects`, para enviar imagens:

- Use `multipart/form-data`.
- Para múltiplas imagens, envie várias vezes a chave `image` com arquivos diferentes.
- Exemplo no Postman:  
  - Chave: `title`, valor: "Meu Projeto"  
  - Chave: `description`, valor: "Descrição do projeto"  
  - Chave: `image`, tipo: File, selecione arquivo 1  
  - Chave: `image`, tipo: File, selecione arquivo 2  
  - ...

---

## Observações

- O middleware valida se os arquivos enviados não estão vazios.
- O upload é feito para o Cloudinary e as URLs são salvas no banco.
- Autenticação é feita via JWT em cookie ou header Authorization.

---

## Contato

Desenvolvido por Hugo.  
Para dúvidas ou contribuições, abra uma issue ou pull request.

---

## Licença

MIT License
