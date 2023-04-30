import {Request, Response, Router} from "express";
import {
    validationAvailableResolutions,
    validationCanBeDownloaded,
    validationCreatedAt,
    validationMinAgeRestriction,
    validationPublicationDate,
    validationVideoAuthor,
    validationVideoTitle
} from "../valadation/bodyValidation";

import {videoDB, VideoType} from "../db/videoDB";
import {errorsArray} from "../db/errorsDB";

const createdDate = new Date()

export const videoRouter = Router({})


// videoRouter.get('/', (req: Request, res: Response) => {
//     res.status(200).send("Hello my friend =)");
// })
videoRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videoDB);
    return;
})
videoRouter.get('/:id', (req: Request, res: Response) => {
    const video = videoDB.find(v => v.id === +req.params.id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.sendStatus(404)
    }

})
videoRouter.post('/', (req: Request, res: Response) => {
    validationVideoTitle(req.body.title)
    validationVideoAuthor(req.body.author)
    validationAvailableResolutions(req.body.availableResolutions)
    validationCanBeDownloaded(req.body.canBeDownloaded)
    validationMinAgeRestriction(req.body.minAgeRestriction)
    validationCreatedAt(req.body.createdAt)
    validationPublicationDate(req.body.publicationDate)

    if (errorsArray.length > 0) {
        res.status(400).json({errorsMessages: errorsArray})
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
videoRouter.put('/:id', (req: Request, res: Response) => {
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
        res.status(400).json({errorsMessages: errorsArray})
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
videoRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videoDB.length; i++) {
        if(videoDB[i].id === +req.params.id) {
            videoDB.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})