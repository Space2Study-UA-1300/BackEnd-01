const { serverInit, serverCleanup, stopServer } = require('~/test/setup')
const { expectError } = require('~/test/helpers')
const { UNAUTHORIZED, FORBIDDEN } = require('~/consts/errors')
const testUserAuthentication = require('~/utils/testUserAuth')
const {
  roles: { ADMIN }
} = require('~/consts/auth')

const endpointUrl = '/categories'

const testCategoryData = {
  name: 'Music'
}

const studentUserData = {
  role: 'student',
  firstName: 'test',
  lastName: 'test',
  email: 'test@test.test',
  password: 'Test1234!',
  isEmailConfirmed: true,
  lastLogin: new Date().toJSON(),
  lastLoginAs: 'student'
}

describe('Category controller', () => {
  let app, server, accessToken, studentAccessToken, testResourceCategory

  beforeAll(async () => {
    ;({ app, server } = await serverInit())
  })

  beforeEach(async () => {
    accessToken = await testUserAuthentication(app, { role: ADMIN })
    studentAccessToken = await testUserAuthentication(app, studentUserData)

    testResourceCategory = await app
      .post(endpointUrl)
      .send(testCategoryData)
      .set('Cookie', [`accessToken=${accessToken}`])
  })

  afterEach(async () => {
    await serverCleanup()
  })

  afterAll(async () => {
    await stopServer(server)
  })

  describe(`POST ${endpointUrl}`, () => {
    it('should create a new category', async () => {
      expect(testResourceCategory.statusCode).toBe(201)
      expect(testResourceCategory._body).toMatchObject({
        _id: expect.any(String),
        appearance: {
          color: '#66C42C',
          icon: 'language'
        },
        ...testCategoryData
      })
    })

    it('should throw UNAUTHORIZED', async () => {
      const response = await app.post(endpointUrl)

      expectError(401, UNAUTHORIZED, response)
    })

    it('should throw FORBIDDEN', async () => {
      const response = await app
        .post(endpointUrl)
        .send(testCategoryData)
        .set('Cookie', [`accessToken=${studentAccessToken}`])

      expectError(403, FORBIDDEN, response)
    })
  })
  describe(`GET ${endpointUrl}`, () => {
    it('should get categories', async () => {
      const response = await app.get(endpointUrl).set('Cookie', [`accessToken=${studentAccessToken}`])

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        items: [
          {
            _id: expect.any(String),
            appearance: {
              color: '#66C42C',
              icon: 'language'
            },
            ...testCategoryData
          }
        ],
        count: 1
      })
    })

    it('should throw UNAUTHORIZED', async () => {
      const response = await app.post(endpointUrl)

      expectError(401, UNAUTHORIZED, response)
    })
  })

  describe(`GET ${endpointUrl}/names`, () => {
    it('should get category names', async () => {
      const response = await app.get(`${endpointUrl}/names`).set('Cookie', [`accessToken=${studentAccessToken}`])

      const id = response.body[0]._id

      const response2 = await app.get(`${endpointUrl}/${id}`).set('Cookie', [`accessToken=${studentAccessToken}`])

      expect(response2.statusCode).toBe(200)
      expect(response2.body).toMatchObject({
        _id: expect.any(String),
        appearance: {
          color: '#66C42C',
          icon: 'language'
        },
        offers: 0,
        ...testCategoryData
      })
    })

    it('should throw UNAUTHORIZED', async () => {
      const response = await app.post(endpointUrl)

      expectError(401, UNAUTHORIZED, response)
    })
  })

  describe(`GET ${endpointUrl}/:id`, () => {
    it('should get category by id', async () => {
      const response = await app.get(`${endpointUrl}/names`).set('Cookie', [`accessToken=${studentAccessToken}`])

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([
        {
          _id: expect.any(String),
          ...testCategoryData
        }
      ])
    })

    it('should throw UNAUTHORIZED', async () => {
      const response = await app.post(endpointUrl)

      expectError(401, UNAUTHORIZED, response)
    })
  })
})
