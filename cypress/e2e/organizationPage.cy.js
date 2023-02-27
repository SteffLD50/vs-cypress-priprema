/// <reference types="Cypress"/>

import { organizationPage } from "../POM/organizationPOM";
import { myOrganizationsPage } from "../POM/myOrganizationsPOM";
import { faker } from "@faker-js/faker/locale/de";

describe("Boards page case", () => {
    beforeEach(() => {
        cy.intercept("GET", `${Cypress.env("apiUrl")}/my-organizations`).as(
            "loadMyOrganizations"
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
        organizationPage.navBarTitle
            .should("be.visible")
            .and("have.text", "Boards")
            .and("have.css", "text-transform", "uppercase");
    });

    it("", () => {
        organizationPage.createNewBoard(faker.animal.fish());
    });
});
