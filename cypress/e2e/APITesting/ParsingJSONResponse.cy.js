describe("Parsing JSON Response", () => {
    it("parsing simple JSON response", () => {
        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products'
        })
            .then((response) => {
                expect(response.status).equal(200)
                //https://jsonpathfinder.com/ to find the json path
                expect(response.body[0].id).equal(1)
                expect(response.body[0].price).equal(109.95)
                expect(response.body[0].rating.rate).equal(3.9)

                expect(response.body[19].id).equal(20)
                expect(response.body[19].price).equal(12.99)
                expect(response.body[19].rating.rate).equal(3.6)
            })
    })

    it("parsing simple JSON response", () => {
        let totalprice=0;
        cy.request({
            method: 'GET',
            url: 'https://fakestoreapi.com/products',
            qs:{limit:5}
        })
            .then((response) => {
                expect(response.status).equal(200)
                response.body.forEach(element => {
                    totalprice=totalprice+element.price
                });
                expect(totalprice).to.equal(899.23)

            })
    })
})