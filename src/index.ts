import express from 'express'
import bodyParser from 'express'
import { postsRouter } from './router/posts_router'
import { blogsRouter } from './router/blogs_router'
import { deletedAllRouter } from './router/deletedAllRouter'

const app = express()

app.use(bodyParser())
app.use('/posts', postsRouter)
app.use('/blogs', blogsRouter)
app.use('/testing/all-data', deletedAllRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {console.log(`Server was started at port ${PORT}`)})
