import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async blog => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async blog => {
  const blogData = {
    user: blog.user.id,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url
  };
  const config = { headers: { Authorization: token } };
  const url = `${baseUrl}/${blog.id}`;
  const response = await axios.put(url, blogData, config);
  return response.data;
};

const remove = blog => {
  const url = `${baseUrl}/${blog.id}`;
  const config = { headers: { Authorization: token } };
  return axios.delete(url, config);
};

export default { getAll, setToken, create, update, remove };
