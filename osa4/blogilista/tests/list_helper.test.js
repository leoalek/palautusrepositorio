const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes',() => {
    test('when more than one blog', ()=>{
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result,36)
    })

    test('of an empty list', () => {
      const emptyArr = [];
      const result = listHelper.totalLikes(emptyArr)
      assert.strictEqual(result,0)
    })

    test('when one blog', () => {
      const oneBlog = [{
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      }]
      const result = listHelper.totalLikes(oneBlog)
      assert.strictEqual(result,7)
    })
})

describe('favorite blog',() =>{
    test('When likes of one blog is greater than others', ()=>{
        const result = listHelper.favoriteBlog(blogs)
        const expectedForm = {
          title: blogs[2].title,
          author: blogs[2].author,
          likes: blogs[2].likes
        }
        assert.deepStrictEqual(result,expectedForm)
    })
})

describe('most blogs', () => {
  test('ammount of blogs by author', () => {
    const result = listHelper.mostBlogs(blogs)
    const expectedForm = {
      author: "Robert C. Martin",
      blogs: 3
    }

    assert.deepStrictEqual(result,expectedForm)
  })
})

describe('most likes',() => {
  test('total ammount of likes by author',() => {
    const result = listHelper.mostLikes(blogs)
    const expectedForm = {
      author: 'Edsger W. Dijkstra', 
      likes: 17
    }
    assert.deepStrictEqual(result,expectedForm)
  })
})