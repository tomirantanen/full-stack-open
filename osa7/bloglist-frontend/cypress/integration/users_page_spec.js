describe("Users page", function() {
  const user = {
    name: "Han Solo",
    username: "hsolo",
    password: "pass"
  };

  /**
   * Reset database and login to application
   */
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
    cy.get("input[data-cy=username]").type(user.username);
    cy.get("input[data-cy=password]").type(user.password);
    cy.get("button[data-cy=login]").click();
  });

  it("opens through navigation menu", function() {
    cy.get("a[data-cy=users-menu]").click();
    cy.get("a[data-cy=user-link]").contains(user.username);
  });
});
