/// <reference types="Cypress"/>

import { organizationPage } from "../POM/organizationPOM";
import { myOrganizationsPage } from "../POM/myOrganizationsPOM";

describe("Board page case", () => {
    beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("apiUrl")}/my-organizations`).as(
            "loadMyOrganizations"
        );
        cy.intercept("GET", `${Cypress.env("apiUrl")}/boards/**`).as(
            "loadBoard"
        );
        cy.loginViaBackend();
        cy.visit("/my-organizations");
        myOrganizationsPage.firstOrg.click();
        cy.wait("@loadMyOrganizations").then((interception) => {
            let orgId = interception.response.body[0].id;
            expect(interception.response.statusCode).eq(200);
            organizationPage.ModalWindowOkBtn.click();
            cy.url().should("contain", `/organizations/${orgId}/boards`);
        });
        organizationPage.firstBoard.click();
        cy.wait("@loadBoard").then((interception) => {
            let boardId = interception.response.body.id;
            expect(interception.response.statusCode).eq(200);
            cy.url().should("contain", `/boards/${boardId}`);
        });
        cy.get(".vs-c-col")
            .first()
            .find("h2")
            .should("exist")
            .and("be.visible")
            .and("have.text", "To Do");
    });

    it("", () => {});
});
