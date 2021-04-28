var fetch = require('node-fetch')
const redis = require("redis");
client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json'

function updateArrIfNameIncludes(beforeAfterObj, locationLongStr, arrToUpdate, i){
    let tempLoc;
    if (locationLongStr.includes(beforeAfterObj.nameBefore) && !locationLongStr.includes(beforeAfterObj.nameAfter)) {
        if (beforeAfterObj.isReplace) {
            tempLoc = arrToUpdate[i].location.replace(beforeAfterObj.nameBefore, beforeAfterObj.nameAfter);
        } else {
            tempLoc = arrToUpdate[i].location.concat(`, ${beforeAfterObj.nameAfter}`);
        }
        arrToUpdate[i].location = tempLoc;
        return true;
    }
    return false;
}

function countriesParser(allJobs) {
      let allJobsUpdated = allJobs;
      [
        {nameBefore: "USA", nameAfter: "United States ", isReplace: true}, 
        {nameBefore: "Russia", nameAfter: "Russian Federation", isReplace: true},
        {nameBefore: "UK", nameAfter: "United Kingdom", isReplace: true},
        {nameBefore: "US", nameAfter: "United States", isReplace: false},
        {nameBefore: "CA", nameAfter: "United States", isReplace: false},
        {nameBefore: "NJ", nameAfter: "United States", isReplace: false},
        {nameBefore: "GA", nameAfter: "United States", isReplace: false},
        {nameBefore: "VA", nameAfter: "United States", isReplace: false},
        {nameBefore: "CO", nameAfter: "United States", isReplace: false},
        {nameBefore: "FL", nameAfter: "United States", isReplace: false},
        {nameBefore: "IL", nameAfter: "United States", isReplace: false},
        {nameBefore: "MA", nameAfter: "United States", isReplace: false},
        {nameBefore: "MD", nameAfter: "United States", isReplace: false},
        {nameBefore: "MN", nameAfter: "United States", isReplace: false},
        {nameBefore: "CT", nameAfter: "United States", isReplace: false},
        {nameBefore: "New York", nameAfter: "United States", isReplace: false},
        {nameBefore: "Menlo Park", nameAfter: "United States", isReplace: false},
        {nameBefore: "Munich", nameAfter: "Germany", isReplace: false},
        {nameBefore: "München", nameAfter: "Germany", isReplace: false},
        {nameBefore: "Berlin", nameAfter: "Germany", isReplace: false},
        {nameBefore: "Düsseldorf", nameAfter: "Germany", isReplace: false},
        {nameBefore: "Amsterdam", nameAfter: "Netherlands", isReplace: false},
        {nameBefore: "Utrecht", nameAfter: "Netherlands", isReplace: false},
        {nameBefore: "London", nameAfter: "United Kingdom", isReplace: false}
      ].forEach(obj => {
        allJobs.forEach((job,i) => {
            updateArrIfNameIncludes(obj, job.location, allJobsUpdated, i);
        });
    })
  
    return allJobsUpdated;
}

async function fetchGithub() {
    let resultCount = 1
    let onPage = 0
    const allJobs =[]


    while (resultCount > 0) {
        const res = await fetch(`${baseUrl}?page=${onPage}`)
        const jobs = await res.json()
        allJobs.push(...jobs)
        resultCount = jobs.length
        console.log('got', resultCount, 'jobs')
        onPage++
    }

    console.log('got', allJobs.length, 'jobs')

    const juniorJobs = allJobs.filter(job => {
        const title = job.title.toLowerCase()

        if (title.includes('senior') || 
            title.includes('manager') ||
            title.includes('sr.') ||
            title.includes('architect') ||
            title.includes('devops') || 
            title.includes('lead') ||
            title.includes('dev ops') ||
            title.includes('expert') ||
            title.includes('experienced') ||
            title.includes('head') ||
            title.includes('director') ||
            title.includes('principal')) {
            return false
        } 
        return true
    })
    console.log('filtered down to - ', juniorJobs.length)
    const jobsWithStandartNames = countriesParser(juniorJobs);
    const success = await setAsync('github', JSON.stringify(jobsWithStandartNames))
    console.log({success})
}

fetchGithub()

module.exports = fetchGithub