import {errorsArray, resolutionDB} from "../index";

export const validationVideoTitle = (el: any) => {
    if (!el || el.length > 40 || typeof (el) !== 'string' || !el.trim()) {
        errorsArray.push({
            "message": "Incorrect Input",
            "field": "title"
        })
    }
}

export const validationVideoAuthor = (el: any) => {
    if (!el || el.length > 20 || typeof (el) !== 'string' || !el.trim()) {
        errorsArray.push({
            "message": "Incorrect Input",
            "field": "author"
        })
    }
}

export const validationAvailableResolutions = (el: Array<string>) => {
    if (el.length === 0) {
        errorsArray.push({
            "message": "Incorrect Input",
            "field": "resolution"
        })
    }
    el.forEach((e: string) => {
        if (!resolutionDB.includes(e) || !Array.isArray(el)) {
            errorsArray.push({
                "message": "Incorrect Input",
                "field": "resolution"
            })
        }
    })
}

export const validationCanBeDownloaded = (el: any) => {
    if(!el) return
    if(typeof(el) !== 'boolean') {
        errorsArray.push({
            "message": "Incorrect Input",
            "field": "can be downloaded"
        })
    }
}

export const validationMinAgeRestriction = (el: any) => {
    if(typeof(el) === 'boolean') {
        errorsArray.push({
            "message": "Incorrect Input",
            "field": "age"
        })
    }
    if(!el) return
    if(el < 1 || el > 18 ||  typeof(el) !== 'number') {
        errorsArray.push({
            "message": "Incorrect Input",
            "field": "age"
        })
    }
}

export const validationCreatedAt = (el: any) => {
    if(!el) return
    if(typeof(el) !== 'string') {
        errorsArray.push({
            "message": "Incorrect Input",
            "field": "date"
        })
    }
}

export const validationPublicationDate = (el: any) => {
    if(!el) return
    if(typeof(el) !== 'string') {
        errorsArray.push({
            "message": "Incorrect Input",
            "field": "date"
        })
    }
}
