import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

afterEach(cleanup);

test("Renders content", () => {
  const blog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 4
  };

  const component = render(<SimpleBlog blog={blog} />);

  const likesDiv = component.container.querySelector(".likes");
  expect(likesDiv).toHaveTextContent("blog has 4 likes");

  const titleDiv = component.container.querySelector(".title");
  expect(titleDiv).toHaveTextContent(`${blog.title} ${blog.author}`);
});

test("Clicking the button calls event handler", () => {
  const blog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 4
  };

  const mockHandler = jest.fn();
  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);
  const button = component.container.querySelector("button");
  fireEvent.click(button);
  fireEvent.click(button);
  expect(mockHandler.mock.calls.length).toBe(2);
});
