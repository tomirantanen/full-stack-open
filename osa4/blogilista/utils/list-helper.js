const _ = require("lodash");

/**
 * @typedef {Object} Blog
 * @property {string} title
 * @property {string} author
 * @property {string} url
 * @property {number} likes
 */

/**
 *
 * @param {Blog[]} blogs
 */
const dummy = blogs => {
  return 1;
};

/**
 *
 * @param {Blog[]} blogs
 */
const totalLikes = blogs =>
  blogs.reduce((total, blog) => {
    return blog.likes + total;
  }, 0);

/**
 * Get the blog with the most likes.
 * If multiple blogs have equal amount of likes, returns the first one.
 * @param {Blog[]} blogs
 */
const favoriteBlog = blogs =>
  blogs.reduce((previous, current) => {
    return current.likes > previous.likes ? current : previous;
  });

/**
 * Get the author with the most blogs.
 * @param {Blog[]} blogs
 * @returns {{author: string, blogs: number}}
 */
const mostBlogs = blogs => {
  const counts = _.countBy(blogs, "author");
  const author = Object.keys(counts).reduce((previous, current) =>
    counts[current] > counts[previous] ? current : previous
  );
  return { author, blogs: counts[author] };
};

/**
 * Get the author with the most total likes.
 * @param {Blog[]} blogs
 * @returns {{author: string, likes: number}}
 */
const mostLikes = blogs => {
  const authors = _(blogs)
    .groupBy("author")
    .map((value, key) => ({
      author: key,
      likes: _.sumBy(value, "likes")
    }))
    .value();

  return authors.reduce((mostLikes, current) =>
    mostLikes.likes > current.likes ? mostLikes : current
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
