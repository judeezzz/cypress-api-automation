//prerequisites
//Install ajv library - npm install ajv
//https://transform.tools/json-to-json-schema - to get the json schema

import Ajv from 'ajv'
const avj=new Ajv()

describe('Schema Validation',()=>
{
    it('schema validation against response', ()=>
        {
            cy.request({
                method: 'GET',
                url:'https://fakestoreapi.com/products'
            })
            .then((response)=>{
                const schema = {
                    "$schema": "http://json-schema.org/draft-07/schema#",
                    "title": "Generated schema for Root",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number"
                        },
                        "title": {
                          "type": "string"
                        },
                        "price": {
                          "type": "number"
                        },
                        "description": {
                          "type": "string"
                        },
                        "category": {
                          "type": "string"
                        },
                        "image": {
                          "type": "string"
                        },
                        "rating": {
                          "type": "object",
                          "properties": {
                            "rate": {
                              "type": "number"
                            },
                            "count": {
                              "type": "number"
                            }
                          },
                          "required": [
                            "rate",
                            "count"
                          ]
                        }
                      },
                      "required": [
                        "id",
                        "title",
                        "price",
                        "description",
                        "category",
                        "image",
                        "rating"
                      ]
                    }
                  }
                  //schema ended
                  const validate = avj.compile(schema)
                  const isvalid = validate(response.body)
                  expect(isvalid).to.be.true

            })            
        })
})