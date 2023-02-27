class MyOrganizationsPage {
    get homePageBtn() {
        return cy.get("header").find(".vs-c-site-logo");
    }

    get navBarTitle() {
        return cy.get("header").find(".vs-u-text--uppercase");
    }

    get navBarShowSearch() {
        return cy.get("header").find("button").eq(0);
    }

    get navBarShowNotifications() {
        return cy.get("header").find("button").eq(-2);
    }

    get navBarHowItWorks() {
        return cy.get("header").find("button").eq(-1);
    }

    get collapseSidebar() {
        return cy.get("aside").find(".vs-c-list__btn").first();
    }

    get sideBarAddNew() {
        return cy.get(".vs-c-list-btn--new-workspace"); // .trigger("mouseover").click();
    }

    get sideBarAddOrganization() {
        return cy.get(".vs-c-tooltip-active-sprints").find("a").eq(0);
    }

    get sideBarAddBoard() {
        return cy.get(".vs-c-tooltip-active-sprints").find("a").eq(1);
    }

    get sideBarImportBoard() {
        return cy.get(".vs-c-tooltip-active-sprints").find("a").eq(2);
    }

    get sideBarFirstOrg() {
        return cy.get(".vs-c-list__oragnisation-item").first();
    }

    get sideBarAccountLink() {
        return cy.get("a[href='/account']");
    }

    get importBoard() {
        return cy.get("a[href='/import-board']");
    }

    get firstOrg() {
        return cy
            .get(".vs-c-my-organizations-item-wrapper")
            .eq(0)
            .find(".organization-list-item")
            .first();
    }

    get lastOrg() {
        return cy
            .get(".vs-c-my-organizations-item-wrapper")
            .eq(0)
            .find(".organization-list-item")
            .last();
    }

    get firstOrgTitle() {
        return this.firstOrg.find("h2");
    }

    get firstOrgEdit() {
        return this.firstOrg.find("span").eq(1);
    }

    get firstOrgArchive() {
        return this.firstOrg.find(".vs-c-icon--archive"); // ne radi / hidden
    }

    get firstOrgAddNewProject() {
        return this.firstOrg.find(".vs-c-my-organization__project-new");
    }

    get firstOrgAddNewBoard() {
        return this.firstOrg.find(".vs-c-my-organization__board-new");
    }

    get addNewOrg() {
        return cy.get(".vs-c-my-organization--add-new");
    }

    get addNewOrgLeftDot() {
        return cy.get(".dialog-footer").find("li").first();
    }

    get addNewOrgRightDot() {
        return cy.get(".dialog-footer").find("li").last();
    }

    get addNewOrgNameInput() {
        return cy.get("input");
    }

    get addNewOrgNextBtn() {
        return cy.get(".dialog-footer").find("button").eq(1);
    }

    get addNewOrgCreateBtn() {
        return cy.get(".dialog-footer").find("button").eq(1);
    }

    get getModalWindow() {
        return cy.get(".vs-c-modal");
    }

    get getModalWindowOkBtn() {
        return cy.get(".vs-c-modal").find("button").eq(1);
    }

    get archivedHeader() {
        return cy.get(".vs-c-my-organizations__header").eq(1);
    }

    get firstArchivedOrg() {
        return cy
            .get(".vs-c-my-organizations-item-wrapper--archived")
            .find(".organization-list-item")
            .first();
    }

    get firstArchivedOrgTitle() {
        return this.firstArchivedOrg.find("h2");
    }

    get firstArchivedOrgDelete() {
        return this.firstArchivedOrg.find(".vs-c-icon--remove"); // ne radi / hidden
    }

    get firstArchivedOrgReopen() {
        return this.firstArchivedOrg.find(".vs-c-icon--archive"); // ne radi / hidden
    }

    addNewOrganization(orgName) {
        this.addNewOrg.click();
        this.addNewOrgLeftDot.should("have.class", "active");
        this.addNewOrgRightDot.should("not.have.class", "active");
        this.addNewOrgNextBtn.should("be.disabled");
        this.addNewOrgNameInput.type(orgName);
        this.addNewOrgNextBtn.should("not.be.disabled");
        this.addNewOrgNextBtn.click();
        this.addNewOrgLeftDot.should("not.have.class", "active");
        this.addNewOrgRightDot.should("have.class", "active");
        this.addNewOrgCreateBtn.click();
    }
}

export const myOrganizationsPage = new MyOrganizationsPage();
