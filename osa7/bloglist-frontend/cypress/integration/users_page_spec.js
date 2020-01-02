describe("Users page", function() {
  const username = "test";
  const password = "test";
  /**
   * Login to application
   */
  beforeEach(function() {
    cy.visit("http://localhost:3000");
    cy.get("input[data-cy=username]").type(username);
    cy.get("input[data-cy=password]").type(password);
    cy.get("button[data-cy=login]").click();
  });

  it("opens through navigation menu", function() {
    cy.get("a[data-cy=users-menu]").click();
    cy.get("a[data-cy=user-link]").contains(username);
  });
});
