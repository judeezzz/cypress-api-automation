describe('API Testing', () => {
    let authToken = null;

    before("creating access token", () => {
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/api-clients',
            headers: { 'Content-Type': 'application/json' },
            body: {
                clientName: 'ABC',
                clientEmail: Math.random().toString(5).substring(2) + "@gmail.com"
            }
        }).then((response) => {
            authToken = response.body.accessToken
        })
    })

    before('creating a new order', () => {
        cy.request({
            method: 'POST',
            url: 'https://simple-books-api.glitch.me/orders',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            body: {
                "bookId": 1,
                "customerName": "xawvds"
            }
        }).then((response) => {
            expect(response.status).equal(201)
            expect(response.body.created).equal(true);
        })

    })

    it('fetchin the orders', () => {
        cy.request({
            method: 'GET',
            url: 'https://simple-books-api.glitch.me/orders',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            cookies: {
                'cookieName': 'mycookie'
            }
        }).then((response)=>
        {
            expect(response.status).equal(200)
            expect(response.body).has.length(1)
        })

    }
    )



})