class OrganizationPage {
    get homePageBtn() {
        return cy.get("header").find(".vs-c-site-logo");
    }

    get ModalWindow() {
        return cy.get(".vs-c-modal");
    }

    get ModalWindowOkBtn() {
        return cy.get(".vs-c-modal").find("button").eq(1);
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
        return cy.get("aside").find(".vs-c-list-btn--new-workspace"); // .trigger("mouseover").click();
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
        return cy.get("aside").find("a").first();
    }

    get sideBarAccountLink() {
        return cy.get("a[href='/account']");
    }

    get activeBoardsHeader() {
        return cy.get(".vs-c-organization__header");
    }

    get activeBoardsTitle() {
        return this.activeBoardsHeader.find("span").eq(0);
    }

    get activeBoardsImportBoard() {
        return this.activeBoardsHeader.find("a");
    }

    get activeBoardsAddNewBoard() {
        return this.activeBoardsHeader.find("button");
    }

    get firstBoard() {
        return cy.get(".vs-c-organization-boards__item").first();
    }

    get lastBoard() {
        return cy.get(".vs-c-organization-boards__item").last();
    }

    get firstBoardTitle() {
        return this.firstBoard.find("p");
    }

    get firstBoardMember() {
        return this.firstBoard.find(".vs-c-boards-item__content-section-title");
    }

    get addNewBoard() {
        return cy
            .get(".vs-c-organization__section")
            .find(".vs-c-organization-boards__item--add-new");
    }

    get addNewBoardWindow() {
        return cy.get(".vs-c-modal");
    }

    get addNewBoardDotLength() {
        return cy.get(".vs-c-dot-pagination").find("li");
    }

    get addNewBoardDot1() {
        return cy.get(".vs-c-dot-pagination").find("li").eq(0);
    }

    get addNewBoardDot2() {
        return cy.get(".vs-c-dot-pagination").find("li").eq(1);
    }

    get addNewBoardDot3() {
        return cy.get(".vs-c-dot-pagination").find("li").eq(2);
    }

    get addNewBoardDot4() {
        return cy.get(".vs-c-dot-pagination").find("li").eq(3);
    }

    get addNewBoardDot5() {
        return cy.get(".vs-c-dot-pagination").find("li").eq(4);
    }

    get addNewBoardWindowTitle() {
        return this.addNewBoardWindow.find("h2");
    }

    get addNewBoardOrgSelectInput() {
        return this.addNewBoardWindow.find("input").first();
    }

    get addNewBoardTitleInput() {
        return this.addNewBoardWindow.find("input").last();
    }

    get addNewBoardNextBtn() {
        return this.addNewBoardWindow.find("button").eq(2);
    }

    get addNewBoardRadioBtnScrum() {
        return this.addNewBoardWindow.find("input").eq(0);
    }

    get addNewBoardRadioBtnKanban() {
        return this.addNewBoardWindow.find("input").eq(1); //.check({ force: true });
    }

    get addNewBoardUploadBoardLogo() {
        return this.addNewBoardWindow.find("a");
    }

    get addNewBoardFinishBtn() {
        return this.addNewBoardWindow.find("button").eq(2);
    }

    get sideMenuBoards() {
        return cy.get("[data-cy='organization-boards']");
    }

    get sideMenuProjects() {
        return cy.get("[data-cy='organization-projects']");
    }

    get sideMenuInvoicing() {
        return cy.get("[data-cy='organization-invoicing']");
    }

    get sideMenuClients() {
        return cy.get("[data-cy='organization-clients']");
    }

    get sideMenuWorklogs() {
        return cy.get("[data-cy='organization-worklogs']");
    }

    get sideMenuTeamManagement() {
        return cy.get("[data-cy='organization-team-management']");
    }

    get sideMenuReports() {
        return cy.get("[data-cy='organization-reports']");
    }

    get sideMenuConfiguration() {
        return cy.get("[data-cy='organization-configuration']");
    }

    createNewBoard(boardName) {
        this.addNewBoard.click();
        this.addNewBoardWindowTitle.should(($el) =>
            expect($el.text().trim()).to.equal("New Board")
        );
        this.addNewBoardDot1.should("have.class", "active");
        this.addNewBoardDot2.should("not.have.class", "active");
        this.addNewBoardNextBtn.should("be.disabled");
        this.addNewBoardTitleInput.type(boardName);
        this.addNewBoardNextBtn.should("not.be.disabled");
        this.addNewBoardNextBtn.click();
        this.addNewBoardWindowTitle.should(($el) =>
            expect($el.text().trim()).to.equal("Board Type")
        );
        this.addNewBoardRadioBtnKanban.check({ force: true });
        this.addNewBoardNextBtn.click();
        this.addNewBoardWindowTitle.should(($el) =>
            expect($el.text().trim()).to.equal("Import")
        );
        this.addNewBoardNextBtn.click();
        this.addNewBoardWindowTitle.should(($el) =>
            expect($el.text().trim()).to.equal("Board Logo")
        );
        this.addNewBoardDot4.should("have.class", "active");
        this.addNewBoardDot5.should("not.have.class", "active");
        this.addNewBoardNextBtn.click();
        this.addNewBoardWindowTitle
            .find("span")
            .last()
            .should("have.text", boardName);
        this.addNewBoardFinishBtn.click();
    }
}

export const organizationPage = new OrganizationPage();
