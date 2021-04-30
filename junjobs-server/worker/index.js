var CronJob = require('cron').CronJob;
const fetchGithub = require('./tasks/fetch-github');

// will run every hour
new CronJob('0 * * * *', fetchGithub, null, true, 'America/Los_Angeles');
