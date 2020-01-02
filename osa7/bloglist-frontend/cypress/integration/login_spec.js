describe("Login", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });

  it("user can login", function() {
    cy.contains("Login to application");
    cy.get("input[data-cy=username]").type("test");
    cy.get("input[data-cy=password]").type("test");
    cy.get("button[data-cy=login]").click();
    cy.get("div[data-cy=logged-user]").contains("test test logged in");
  });
});
