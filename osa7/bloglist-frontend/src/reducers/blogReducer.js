import blogService from "../services/blogs";

const sortByLikes = (a, b) => b.likes - a.likes;

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data.sort(sortByLikes);
    case "CREATE_BLOG":
      return state.concat(action.data);
    case "UPDATE_BLOG":
      return state
        .filter(blog => blog.id !== action.data.id)
        .concat(action.data)
        .sort(sortByLikes);
    case "REMOVE_BLOG":
      return state.filter(blog => blog.id !== action.data.id);
    default:
      return state;
  }
};

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: "CREATE_BLOG",
      data: newBlog
    });
  };
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    });
  };
};

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog);
    dispatch({
      type: "REMOVE_BLOG",
      data: blog
    });
  };
};

export const addLikeToBlog = blog => {
  return async dispatch => {
    const blogForUpdating = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(blogForUpdating);
    dispatch({
      type: "UPDATE_BLOG",
      data: updatedBlog
    });
  };
};

export default blogReducer;
