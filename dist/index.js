"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const createdDate = new Date();
var resolutionDB;
(function (resolutionDB) {
    resolutionDB["P144"] = "P144";
    resolutionDB["P240"] = "P240";
    resolutionDB["P360"] = "P360";
    resolutionDB["P480"] = "P480";
    resolutionDB["P720"] = "P720";
    resolutionDB["P1080"] = "P1080";
    resolutionDB["P1440"] = "P1440";
    resolutionDB["P2160"] = "P2160";
})(resolutionDB || (resolutionDB = {}));
const videoDB = [{
        id: 1,
        title: 'Through hardship to the stars',
        author: 'Richard Viktorov',
        canBeDownloaded: true,
        minAgeRestriction: 14,
        createdAt: '1981-04-23T12:00:53.661Z',
        publicationDate: '1981-04-24T12:00:53.661Z',
        availableResolutions: [resolutionDB.P720]
    }];
const parserMiddleware = (0, body_parser_1.default)();
app.use(parserMiddleware);
app.delete('/testing/all-data', (req, res) => {
    videoDB.splice(0);
    res.send(204);
});
app.get('/videos', (req, res) => {
    res.send(videoDB);
});
app.get('/videos/:id', (req, res) => {
    const video = videoDB.find(v => v.id === +req.params.id);
    if (video) {
        res.send(video);
    }
    else {
        res.send(404);
    }
});
app.post('/videos', (req, res) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: req.body.canBeDownloaded || false,
        minAgeRestriction: req.body.minAgeRestriction || null,
        createdAt: createdDate.toISOString(),
        publicationDate: new Date(createdDate.setDate(createdDate.getDate() + 1)).toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    videoDB.push(newVideo);
    res.status(201).send(newVideo);
});
app.put('/videos/:id', (req, res) => {
    const video = videoDB.find(v => v.id = +req.params.id);
    if (video) {
        video.title = req.body.title;
        video.author = req.body.author;
        video.canBeDownloaded = req.body.canBeDownloaded || false;
        video.minAgeRestriction = req.body.minAgeRestriction || null;
        video.publicationDate = req.body.publicationDate;
        video.availableResolutions = req.body.availableResolutions;
        res.send(204);
    }
});
app.delete('/videos/:id', (req, res) => {
    for (let i = 0; i < videoDB.length; i++) {
        if (videoDB[i].id === +req.params.id) {
            videoDB.splice(i, 1);
            res.send(204);
        }
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
