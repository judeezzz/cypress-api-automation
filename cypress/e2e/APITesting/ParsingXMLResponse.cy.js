//Install xml2js library
//npm install xml2js
//https://tools.onecompiler.com/multiline-to-singleline to convert a multiline xml to single line

import { Parser } from 'xml2js';
const parser = new Parser({ explicitArray: false });

describe("XML Parsing", () => {
    let xmlPayload = "<Pet> 	<id>0</id> 	<Category> 		<id>0</id> 		<name>Dog</name> 	</Category> 	<name>Jimmy</name> 	<status>available</status> </Pet>";
    let petId = null;

    before("creating PET", () => {
        cy.request({
            method: "POST",
            url: "https://petstore.swagger.io/v2/pet/",
            body: xmlPayload,
            headers: {
                'content-type': 'application/xml',
                'accept': 'application/xml'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            parser.parseString(response.body, (err, result) => {
                if (err) {
                    throw err;
                }
                petId = result.Pet.id;
            });
        });
    });

    it("Fetching Pet data - parsing xml response", () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/pet/'+petId,
            headers: {'accept': 'application/xml'}
        }).then((response) => {
            expect(response.status).to.eq(200);
            parser.parseString(response.body, (err, result) => {
                expect(result.Pet.id).equal(petId);
                expect(result.Pet.name).equal('Jimmy');
            });
        });
    });
});