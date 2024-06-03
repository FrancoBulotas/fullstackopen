
const { test, describe } = require('node:test')
const assert = require('node:assert')

const mostLikes = require('../utils/list_helper').mostLikes

describe('most likes', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422aa71b54a67634d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 9,
        __v: 0
      },
      {
        _id: '5a422aa71b54a6234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsgasdasdra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 19,
        __v: 0
      }
    ]

    test('returns author with most likes ', () => {
        const result = mostLikes(blogs)
        assert.deepStrictEqual(result.likes, 19)
    })
  })