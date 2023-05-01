import express from 'express'
import {videoRouter} from "./routes/video-router";
import {testRouter} from "./routes/test-router";
import {baseRouter} from "./routes/base-router";

export const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/', baseRouter)
app.use('/testing', testRouter)
app.use('/videos', videoRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})