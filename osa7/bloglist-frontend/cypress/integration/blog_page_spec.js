describe("Login", function() {
  const user = {
    name: "Han Solo",
    username: "hsolo",
    password: "pass"
  };

  const blog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  };

  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("user can login", function() {
    cy.contains("Login to application");
    cy.get("input[data-cy=username]").type(user.username);
    cy.get("input[data-cy=password]").type(user.password);
    cy.get("button[data-cy=login]").click();
    cy.get("div[data-cy=logged-user]").contains(user.name);
  });

  describe("when logged in", function() {
    beforeEach(function() {
      cy.get("input[data-cy=username]").type(user.username);
      cy.get("input[data-cy=password]").type(user.password);
      cy.get("button[data-cy=login]").click();
    });

    it("a new blog can be created", function() {
      cy.get("div[data-cy=logged-user]").contains(user.name);
      cy.get("button")
        .contains("Create blog")
        .click();
      cy.get("input[data-cy=blog-title]").type(blog.title);
      cy.get("input[data-cy=blog-author]").type(blog.author);
      cy.get("input[data-cy=blog-url]").type(blog.url);
      cy.get("button[data-cy=create-blog]").click();
      cy.get("table[data-cy=blogs-table]").contains(blog.title);
    });
  });

  describe("when logged in and blog exists", function() {
    /**
     * Login and create blog
     */
    beforeEach(function() {
      cy.get("input[data-cy=username]").type(user.username);
      cy.get("input[data-cy=password]").type(user.password);
      cy.get("button[data-cy=login]").click();
      cy.get("div[data-cy=logged-user]").contains(user.name);
      cy.get("button")
        .contains("Create blog")
        .click();
      cy.get("input[data-cy=blog-title]").type(blog.title);
      cy.get("input[data-cy=blog-author]").type(blog.author);
      cy.get("input[data-cy=blog-url]").type(blog.url);
      cy.get("button[data-cy=create-blog]").click();
    });

    it("a blog can be liked", function() {
      cy.get("table[data-cy=blogs-table]")
        .contains(blog.title)
        .click();
      cy.get("div[data-cy=likes-count]").contains(0);
      cy.get("button[data-cy=add-like]").click();
      cy.get("div[data-cy=likes-count]").contains(1);
    });

    it("a blog can be commented", function() {
      cy.get("table[data-cy=blogs-table]")
        .contains(blog.title)
        .click();
      cy.get("textarea[data-cy=comment-text-area]").type(
        "This is a great blog"
      );
      cy.get("button[data-cy=add-comment]").click();
      cy.get("div[data-cy=bloglist-item]").contains("This is a great blog");
    });

    it("a blog can be removed", function() {
      cy.get("table[data-cy=blogs-table]")
        .contains(blog.title)
        .click();
      cy.get("button[data-cy=remove-blog]").click();
      // Should redirect to root after removal
      cy.location("pathname").should("eq", "/");
    });
  });
});
