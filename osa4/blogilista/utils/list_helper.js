const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((prev, a) => prev + a, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    const favBlog = blogs.find(blog => blog.likes === mostLikes)
    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(author => author.author)
    const blogAmmount = _.countBy(authors)
    const maxBlogs = _.maxBy(Object.entries(blogAmmount),([name, ammount]) => ammount)
    return{
        author: maxBlogs[0],
        blogs: maxBlogs[1]
    }
}

const mostLikes = (blogs) => {
    const authors = blogs.map(author => [author.author, author.likes])

    const groupByAuthor = _.groupBy(authors, ([author, count]) => author)

    const sumOfLikes = _.map(groupByAuthor,(likes,author) => {
        const sum = _.sumBy(likes,([authors,likes]) => likes)
        return { author, likes: sum };
    })

    const maxLikes = _.maxBy(sumOfLikes, 'likes')
    return maxLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}