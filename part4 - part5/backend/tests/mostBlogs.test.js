

const { test, describe } = require('node:test')
const assert = require('node:assert')

const mostBlogs = require('../utils/list_helper').mostBlogs

describe('most blogs', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        blogs: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a67634d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        blogs: 9,
        __v: 0
      },
      {
        _id: '5a422aa71b54a6234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        blogs: 17,
        __v: 0
      }
    ]

    test('returns author with most blogs ', () => {
        const result = mostBlogs(blogs)
        assert.deepStrictEqual(result.blogs, 17)
    })
  })