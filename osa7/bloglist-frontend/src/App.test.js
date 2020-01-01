import React from "react";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
  test("If user is not logged in, login form is rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("login"));

    expect(component.container).toHaveTextContent("Login to application");

    // Blogs should not be rendered
    const blogTitle = component.container.querySelector("blog-title");
    expect(blogTitle).toBeNull();
  });

  test("If user is logged in, blogs are rendered", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Donald Tester"
    };

    localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() =>
      component.container.querySelector(".blog-title")
    );

    const blogs = component.container.querySelectorAll(".blog-title");
    expect(blogs.length).toBe(6);

    expect(component.container).toHaveTextContent(
      "Go To Statement Considered Harmful"
    );
  });
});
