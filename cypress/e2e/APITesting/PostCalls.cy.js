describe("API Testing", () => {
    it("approach1 - hardcoded json object", () => {
        let requestBody = {
            tourist_name: "Jude",
            tourist_email: "abcdfghj@gmail.com",
            tourist_location: "Newcastle"
        }
        cy.request('POST', 'http://restapi.adequateshop.com/api/Tourist', requestBody)
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.tourist_name).to.eq("Jude")
                expect(response.body.tourist_email).to.eq("abcdfghj@gmail.com")
            })
    })

    it.only("approach1 - dynamic json object", () => {
        let requestBody = {
            tourist_name: Math.random().toString().substring(2),
            tourist_email: Math.random().toString().substring(2) + "@gmail.com",
            tourist_location: "Newcastle"
        }
        cy.request('POST', 'http://restapi.adequateshop.com/api/Tourist', requestBody)
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
                expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
                expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
            })
    })

    it("approach1 - using fixture", () => {

        cy.fixture('tourists').then((data) => {
            const requestBody = data;

            cy.request('POST', 'http://restapi.adequateshop.com/api/Tourist', requestBody)
                .then((response) => {
                    expect(response.status).to.eq(201)
                    expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
                    expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
                    expect(response.body.tourist_location).to.eq(requestBody.tourist_location)

                    expect(response.body).has.property('tourist_email', requestBody.tourist_email)
                    expect(response.body).to.have.property('tourist_email', requestBody.tourist_email)
                })
        })
    })

})