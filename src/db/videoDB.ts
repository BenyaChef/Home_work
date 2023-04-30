import {resolutionDB} from "./resolutionDB";


export type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean | false,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Array<string>
}
export let videoDB: Array<VideoType> = [{
    id: 1,
    title: 'Through hardship to the stars',
    author: 'Richard Viktorov',
    canBeDownloaded: true,
    minAgeRestriction: 14,
    createdAt: '1981-04-23T12:00:53.661Z',
    publicationDate: '1981-04-24T12:00:53.661Z',
    availableResolutions: [resolutionDB[0]]
}]
