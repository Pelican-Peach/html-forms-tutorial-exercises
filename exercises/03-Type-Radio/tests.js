const fs = require('fs');
// const { it } = require('node:test');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

jest.dontMock('fs');

describe('basic HTML structure', function () {
    beforeEach(() => { document.documentElement.innerHTML = html.toString(); });
    afterEach(() => { jest.resetModules(); });

     it('order of HTML tags', function () {
        let a = document.documentElement.innerHTML = html.toString()
        let b = a.indexOf("<!DOCTYPE html>")
        let c = a.indexOf("<html")
        let d = a.indexOf("<head>")
        let e = a.indexOf("<title>")
        let f = a.indexOf("<body>")

        //here we check for the order of the tags
        expect(b).toBeLessThan(c)
        expect(c).toBeLessThan(d)
        expect(d).toBeLessThan(e)
        expect(e).toBeLessThan(f)

    })

    test("there should be four input elements of type radio", function () {
        let inpts = document.querySelectorAll("input[type=radio]")
        
        expect(inpts.length).toEqual(4)
    })
    test("the radio inputs should have the requested values, aka, Male, Female, Heterosexual, LGBTI", function () {
       let inpts = document.querySelectorAll("input[type=radio]")
        let requestedValues = ["Male", "Female", "Heterosexual", "LGBTI"]

        inpts.forEach((e,idx) => {
            expect(e.getAttribute("value")).toBe(requestedValues[idx]);
        })
    })
    test("there should only be two unique names, one per pair of radio inputs", function () {
       let inpts = document.querySelectorAll("input[type=radio]")
        let firstName =  inpts[0].getAttribute("name")
        let secondName =  inpts[2].getAttribute("name")


        inpts.forEach((e,idx) => {
            expect(e.getAttribute("name")).toBe(idx < 2 ? firstName : secondName);
        })
    })





});
