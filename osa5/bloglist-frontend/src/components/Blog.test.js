import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

afterEach(cleanup);

test("Detailed info of a blog is displayed after title is clicked", () => {
  const blog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 4,
    user: {
      username: "Test"
    }
  };
  const user = {
    username: "Username"
  };

  const mockHandleUpdateBlog = jest.fn();
  const mockHandleRemoveBlog = jest.fn();
  const mockNotify = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      handleUpdateBlog={mockHandleUpdateBlog}
      handleRemoveBlog={mockHandleRemoveBlog}
      notify={mockNotify}
      user={user}
    />
  );

  // Likes should be initially hidden
  const likes = component.container.querySelector(".likes");
  expect(likes).toBeNull();

  const titleParagraph = component.container.querySelector(".blog-title");
  fireEvent.click(titleParagraph);

  // Likes should be visible after title is clicked
  const likesParagraph = component.container.querySelector(".likes");
  expect(likesParagraph).toBeDefined();
});
