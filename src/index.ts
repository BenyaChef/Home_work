import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {
    validationAvailableResolutions,
    validationCanBeDownloaded,
    validationCreatedAt,
    validationMinAgeRestriction,
    validationPublicationDate,
    validationVideoAuthor,
    validationVideoTitle
} from "./valadation/validation-videos-input-value";

const app = express()
const port = process.env.PORT || 3000

const createdDate = new Date()

type errorsType = {
    "message": string
    "field": string
}

export let errorsArray: Array<errorsType> = []

type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean | false,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Array<string>
}

export const resolutionDB: Array<string> = [
    'P144',
    'P240',
    'P360',
    'P480',
    'P720',
    'P1080',
    'P1440',
    'P2160'
]


let videoDB: Array<VideoType> = [{
    id: 1,
    title: 'Through hardship to the stars',
    author: 'Richard Viktorov',
    canBeDownloaded: true,
    minAgeRestriction: 14,
    createdAt: '1981-04-23T12:00:53.661Z',
    publicationDate: '1981-04-24T12:00:53.661Z',
    availableResolutions: [resolutionDB[0]]
}]

const parserMiddleware = bodyParser();
app.use(parserMiddleware)

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videoDB.splice(0);
    res.send(204)
})
app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(videoDB);
})
app.get('/videos/:id', (req: Request, res: Response) => {
    const video = videoDB.find(v => v.id === +req.params.id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.sendStatus(404)
    }

})
app.post('/videos', (req: Request, res: Response) => {
    validationVideoTitle(req.body.title)
    validationVideoAuthor(req.body.author)
    validationAvailableResolutions(req.body.availableResolutions)
    validationCanBeDownloaded(req.body.canBeDownloaded)
    validationMinAgeRestriction(req.body.minAgeRestriction)
    validationCreatedAt(req.body.createdAt)
    validationPublicationDate(req.body.publicationDate)

    if (errorsArray.length > 0) {
        res.status(400).send(errorsArray)
        errorsArray.splice(0)
        return
    }

    const newVideo: VideoType = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded || false,
        minAgeRestriction: req.body.minAgeRestriction || null,
        createdAt: createdDate.toISOString(),
        publicationDate: new Date(createdDate.setDate(createdDate.getDate() + 1)).toISOString(),
        availableResolutions: req.body.availableResolutions

    }
    videoDB.push(newVideo)
    res.status(201).send(newVideo);

})
app.put('/videos/:id', (req: Request, res: Response) => {
    const video = videoDB.find(v => v.id === +req.params.id)
    if (!video) {
        res.send(404)
        return
    }
    validationVideoTitle(req.body.title)
    validationVideoAuthor(req.body.author)
    validationAvailableResolutions(req.body.availableResolutions)
    validationCanBeDownloaded(req.body.canBeDownloaded)
    validationMinAgeRestriction(req.body.minAgeRestriction)
    validationCreatedAt(req.body.createdAt)
    validationPublicationDate(req.body.publicationDate)

    if (errorsArray.length > 0) {
        res.status(400).send(errorsArray)
        errorsArray.splice(0)
        return
    }

    video.title = req.body.title
    video.author = req.body.author
    video.canBeDownloaded = req.body.canBeDownloaded || false
    video.minAgeRestriction = req.body.minAgeRestriction || null
    video.publicationDate = req.body.publicationDate
    video.availableResolutions = req.body.availableResolutions

    res.sendStatus(204)

})
app.delete('/videos/:id', (req: Request, res: Response) => {
    let video = videoDB.find(v => v.id === +req.params.id)
    if (!video) {
        res.sendStatus(404)
        return
    }
    videoDB = videoDB.filter(v => v.id !== +req.params.id)
    res.sendStatus(204)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})