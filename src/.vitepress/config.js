const { getPosts } = require('./getPosts')

module.exports = {
  title: 'Lucas Azevedo',
  description: 'Web Developer',

  head: [
    ['link', {rel: 'preconnect', href: 'https://fonts.gstatic.com'}],
    ['link', {href: 'https://fonts.googleapis.com/css2?family=Inter:wght@800&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap', rel: 'stylesheet'}]
  ],

  customData: {
    posts: getPosts()
  }
}
