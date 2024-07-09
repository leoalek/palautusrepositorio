const {test, after, beforeEach, describe} = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')


const api = supertest(app)



beforeEach(async() => {
    await Blog.deleteMany({})

    let blogObjs = helper.initBlogs.map(blog => new Blog(blog))

    const promiseArray = blogObjs.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('right ammount of blogs as json', async () => {
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-type',/application\/json/)
    assert.strictEqual(response.body.length,3)
})

test('blog _id shown as id', async () => {
  const response = await api.get('/api/blogs')
  const includesId = Object.keys(response.body[0]).includes("id")
  
  assert.strictEqual(includesId,true)

})
describe('when token is needed',() =>{

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const newUser = new User({ username: 'root', passwordHash, blogs: [] })
    
    await newUser.save()
  
    const login = await api.post('/api/login').send({
      username: 'root',
      password: 'password'
    })
    headers = login.body.token
  })

  test("adding blog sucessfully", async () => {
    const users = await helper.usersInDb()
    const nBlog = {
      title: "TEST",
      author: "test_dummy",
      url: "https://reactpatterns.com/",
      user: users[0].id,
      likes: 21,
    }

    await api.post('/api/blogs')
    .set('Authorization', `Bearer ${headers}`)
    .send(nBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length,helper.initBlogs.length+1)
    assert(response.body.some(b => 
      b.title === nBlog.title &&
      b.author === nBlog.author &&
      b.url === nBlog.url
      ))
  })

  test('when likes are empty set likes to 0', async () => {
    const users = await helper.usersInDb()
    const nBlog = {
      title: "TEST",
      author: "test_dummy",
      url: "https://reactpatterns.com/",
      user: users[0],
      likes: null
    }

    await api.post('/api/blogs')
    .set('Authorization', `Bearer ${headers}`)
    .send(nBlog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')


    assert.strictEqual(response.body[response.body.length-1].likes,0)
  })

  //does not have authentication done
  test("deleting blog", async () => {
    const blogs = await helper.blogsInDb()
    
    await api.delete(`api/blogs/${blogs[0].id}`)
    .expect(204)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length,helper.initBlogs.length-1)
  })

})


//user_tests
describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'xxx',
      name: 'yyy',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})


after(async () => {
  await mongoose.connection.close()
})