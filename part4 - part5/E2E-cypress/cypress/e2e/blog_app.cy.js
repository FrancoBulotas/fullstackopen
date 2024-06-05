

describe('Blogd App', function ()  {

  beforeEach(function() {    
    cy.visit('http://localhost:5173')  
  })
  
  it('front page can be opened', function () {
    cy.contains('Blogs')
  })
})