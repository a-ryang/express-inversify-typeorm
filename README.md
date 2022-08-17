# express-inversify-typeorm

### Quick Start

```bash
git clone https://github.com/a-ryang/express-inversify-typeorm.git
cd express-inversify-typeorm
npm install
```

referring to the `scripts` in `package.json` and create `.development.env` or `.production.env` file in the root directory as follows:

```
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PW=
DB=
```

### Example API

```
POST /boards        create a board.
 └── reqeust body:   writer, title, content
```

```
GET /boards/:id     get a board detail.
 └── reqeust param:   id(number)
```

```
GET /boards         get boards. (pagination)
 ├── reqeust param:   id(number)
 └── reqeust query:   page, maxResults (both optional)
```

```
PATCH /boards/:id   modify a board.
 ├── reqeust param:   id(number)
 └── reqeust query:   writer, title, content
```

```
DELTE /boards/:id   remove a board.
  └── reqeust param:   id(number)
```

### Dependencies

- class-transformer
- class-validator
- dotenv
- express
- helmet
- inverisfy
- inversify-express-utils
- mysql2
- reflect-metadata
- typeorm
- typeorm-naming-strategies
- winston
