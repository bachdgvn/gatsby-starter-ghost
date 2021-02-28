import { readingTime as readingTimeHelper } from "@tryghost/helpers"

const convertReadingTimeToViVn = (post, template) => {
    const readingTime = readingTimeHelper(post)
    const min = readingTime.match(/\d+/g).join(``)
    return template.replace(`%`, min)
}

export default convertReadingTimeToViVn
