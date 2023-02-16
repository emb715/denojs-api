# denojs-api

API using DenoJS and Prisma as ORM
## Features

- Schema Validation
- Error Logger
- ORM DataBase

---
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_PORT`

`DATABASE_URL`

---

# Usage

Generate the schemas for the API

```
yarn prisma:generate
```

To initiate this project run

```bash
  yarn dev
```

---


## API Reference

#### Get all things

```http
  GET /api/v1/things
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

---
#### Get thing

```http
  GET /api/things/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of thing to fetch |

---

## Tech

 - [DenoJS](https://deno.land/)
 - [Oak](https://deno.land/x/oak@v11.1.0)
 - [Prisma](https://www.prisma.io/docs)
 - [Zod](https://zod.dev/)
 - [Sentry](https://docs.sentry.io/platforms/node/)

---
## License

[MIT](https://choosealicense.com/licenses/mit/)

---

### TODO:
- Add Auth/Bearer token
- Add prisma docs