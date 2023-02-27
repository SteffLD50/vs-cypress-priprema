/// <reference types="Cypress"/>

import { myOrganizationsPage } from "../POM/myOrganizationsPOM";
import { faker } from "@faker-js/faker/locale/de";

describe("My organizations page case", () => {
    beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("apiUrl")}/my-organizations`).as(
            "getMyOrganizations"
        );
        cy.loginViaBackend();
        cy.visit("/my-organizations");
        cy.wait("@getMyOrganizations").then((interception) => {
            expect(interception.response.statusCode).eq(200);
            expect(window.localStorage.getItem("token")).to.exist;
        });
        cy.url().should("include", "/my-organizations");
        myOrganizationsPage.navBarTitle
            .should("be.visible")
            .and("have.text", "My Organizations")
            .and("have.css", "text-transform", "uppercase");
        myOrganizationsPage.sideBarAccountLink
            .should("exist")
            .and("be.visible")
            .and("have.css", "color", "rgb(77, 77, 77)");
    });

    it("Add new organization with valid data", () => {
        let orgId;
        let randomOrgName = faker.random.word();

        cy.intercept("POST", `${Cypress.env("apiUrl")}/organizations`).as(
            "successfullNewOrg"
        );

        myOrganizationsPage.addNewOrganization(randomOrgName);

        cy.wait("@successfullNewOrg").then((interception) => {
            orgId = interception.response.body.id;
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.body.name).eq(randomOrgName);

            cy.visit(`/organizations/${orgId}/boards`);
            cy.url().should("include", `/organizations/${orgId}/boards`);
            cy.get(".vs-l-project__nav").should("have.text", "Boards");
        });

        // myOrganizationsPage.getModalWindowOkBtn.click();
        myOrganizationsPage.homePageBtn.click({ force: true });
        myOrganizationsPage.lastOrg
            .find("h2")
            .should("have.text", randomOrgName);
    });
});
