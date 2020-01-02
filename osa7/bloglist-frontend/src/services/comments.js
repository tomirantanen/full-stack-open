import axios from "axios";
const baseUrl = "/api/blogs";

const create = async (blog, comment) => {
  const commentObject = { text: comment };
  const response = await axios.post(
    `${baseUrl}/${blog.id}/comments`,
    commentObject
  );
  return response.data;
};

export default { create };
