describe('HTTP Requests', ()=>
{
    it('GET Request', ()=>{
        cy.request('GET','https://jsonplaceholder.typicode.com/posts/1')
        .its('status')
        .should('equal', 200);
    })

    it('POST Request', ()=>{
        cy.request('POST','https://jsonplaceholder.typicode.com/posts',{userId: 1, title: "Test Title", body: "This is a test body"})
        .its('status').should('equal', 201)
    })

    it('PUT Request', ()=>{
        cy.request('PUT','https://jsonplaceholder.typicode.com/posts/1',{id: 1, userId: 1, title: "Update Title", body: "This is a PUT call"})
        .its('status').should('equal', 200)
    })
    
    it('DELETE', ()=>
    {
        cy.request('DELETE', 'https://jsonplaceholder.typicode.com/posts/1')
        .its('status').should('equal', 200)
    })

})