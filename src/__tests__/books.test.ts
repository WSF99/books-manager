import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import app from '../index'

const books = [
  {
    author: faker.name.fullName(),
    sbn: faker.random.numeric(9),
    name: faker.lorem.words(2),
    description: faker.lorem.paragraph(),
    inventory: faker.random.numeric(2)
  },
  {
    author: faker.name.fullName(),
    name: faker.lorem.words(2),
    description: faker.lorem.paragraph(),
    inventory: faker.random.numeric(2)
  },
  {
    author: faker.name.fullName(),
    name: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    inventory: faker.random.numeric(1)
  },
  {
    author: '',
    name: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    inventory: faker.random.numeric(1)
  }
]

let tempID = 0

describe('Cadastro de livros (POST)', () => {
  it('Retorna 201, livro cadastrado com sucesso.', async () => {
    const { statusCode, body } = await supertest(app)
      .post('/api/v1/books')
      .send(books[0])
    expect(statusCode).toBe(201)
    tempID = body.data.id
  })
  it('Retorna 400, erro no cadastro do livro.', async () => {
    const { statusCode } = await supertest(app)
      .post('/api/v1/books')
      .send(books[1])
    expect(statusCode).toBe(400)
  })
  it('Retorna 409, SBN já existe.', async () => {
    const { statusCode } = await supertest(app)
      .post('/api/v1/books')
      .send(books[0])
    expect(statusCode).toBe(409)
  })
})

describe('Buscar livros (GET)', () => {
  it('Retorna 200, livro encontrado com sucesso.', async () => {
    const { statusCode } = await supertest(app).get(`/api/v1/books/${tempID}`)
    expect(statusCode).toBe(200)
  })
  it('Retorna 400, ID inválido.', async () => {
    const { statusCode } = await supertest(app).get('/api/v1/books/a')
    expect(statusCode).toBe(400)
  })
  it('Retorna 404, ID válido e livro não encontrado.', async () => {
    const { statusCode } = await supertest(app).post('/api/v1/books/12345671')
    expect(statusCode).toBe(404)
  })
})

describe('Atualização de livros (PUT)', () => {
  it('Retorna 200, livro atualizado com sucesso.', async () => {
    const { statusCode } = await supertest(app)
      .put(`/api/v1/books/${tempID}`)
      .send(books[2])
    expect(statusCode).toBe(200)
  })

  it('Retorna 400, input inválido.', async () => {
    const { statusCode } = await supertest(app)
      .put(`/api/v1/books/${tempID}`)
      .send(books[3])
    expect(statusCode).toBe(400)
  })
  it('Retorna 400, ID inválido.', async () => {
    const { statusCode } = await supertest(app)
      .put('/api/v1/books/a')
      .send(books[2])
    expect(statusCode).toBe(400)
  })
  it('Retorna 404, livro não encontrado.', async () => {
    const { statusCode } = await supertest(app)
      .put(`/api/v1/books/123456789`)
      .send(books[2])
    expect(statusCode).toBe(404)
  })
})

describe('Apagar livro (DELETE)', () => {
  it('Retorna 204, livro excluído com sucesso.', async () => {
    const { statusCode } = await supertest(app).delete(
      `/api/v1/books/${tempID}`
    )
    expect(statusCode).toBe(204)
  })
  it('Retorna 400, ID inválido.', async () => {
    const { statusCode } = await supertest(app).delete('/api/v1/books/a')
    expect(statusCode).toBe(400)
  })
  it('Retorna 404, ID válido e livro não encontrado.', async () => {
    const { statusCode } = await supertest(app).delete(
      `/api/v1/books/${tempID}`
    )
    expect(statusCode).toBe(404)
  })
})
