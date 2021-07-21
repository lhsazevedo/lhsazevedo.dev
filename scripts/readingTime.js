const fs = require('fs')
const matter = require('gray-matter')
const readingTime = require('reading-time')

const files = fs.readdirSync('../src/posts')

for (const file of files) {
    const contents = fs.readFileSync('../src/posts/' + file, 'utf-8')

    const readTime = readingTime(matter(contents).content).text

    const newContents = contents.replace(/readingTime:.*/, 'readingTime: ' + readTime)

    fs.writeFileSync('../src/posts/' + file, newContents)
}
