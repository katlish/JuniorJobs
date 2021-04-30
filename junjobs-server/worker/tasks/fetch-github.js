const axios = require('axios').default;

const githubUrl = 'https://jobs.github.com/positions.json';
const jobsUrl = 'http://localhost:4000/jobs';


const insertIntoDB = async (jobsToInsert) => {
    try{
        addMissingProps(jobsToInsert);

        jobsToInsert.forEach(async (job,i) => {
            await axios.post(jobsUrl, job);
        });
    }catch(e){
        console.log("error-", e.message);
    }
}

const filterByWordInTitle = (jobs, wordsToCheck) => {
    const juniorJobs = jobs.filter(job => {
        const title = job.title.toLowerCase()
        return !wordsToCheck.some(word => title.includes(word));
    });
    return juniorJobs;
}

const isRemote = (job) => {
    const title = job.title.toLowerCase();
    const location = job.location.toLowerCase();
    return title.includes("remote") || location.includes("remote");
}

const checkJobType = (job) => {
    const types = [];
    const title = job.title.toLowerCase();

    if (["fullstack","full stack"].some(type => title.includes(type))){
        types.push("fullstack");
    }
    if (["frontend","react", "front-end", "ui"].some(type => title.includes(type))){
        types.push("frontend");
    }
    if (["backend","software"].some(type => title.includes(type))){
        types.push("backend");
    }

    return types;
}

const addMissingProps = (jobs) => {
    jobs.forEach((job,i) => {
        job.externalId = job.id;
        job.isremote = isRemote(job);
        job.jobs = checkJobType(job);
    });
}

const fetchGithub = async () => {
    console.log("fetch started");
    let jobsCount = 1
    let onPage = 0
    const allJobs =[]

    try {
        while (jobsCount > 0) {
            const { data } = await axios.get(`${githubUrl}?page=${onPage}`);
            jobsCount = data.length;
            if (jobsCount) {
                allJobs.push(...data);
            }
            console.log('got', jobsCount);
            onPage++;
        }
    }catch(e){
        console.log('error in github server - ', e.message);
    }
    
    console.log('got BEFORE filter - ', allJobs.length, 'jobs')
    const wordsToCheck = ['senior','manager','sr.','architect','devops','lead','dev ops','dev/ops','expert','experienced','head','director','principal'];
    const juniorJobs = filterByWordInTitle(allJobs, wordsToCheck);
    console.log('got AFTER filter - ', juniorJobs.length);
    
    await insertIntoDB(juniorJobs);
}

module.exports = fetchGithub;