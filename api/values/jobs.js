const jobValue = (job) => {
    const {data} = job
    return {
        id: job._id,
        name: job.name,
        interval: job.repeatInterval,
        nextRunAt: job.nextRunAt,
        lastRunAt: job.lastRunAt,
        failReason: job.failReason,
        failedAt: job.failedAt,
        ...data
    }

}

const jobValues = (jobs) => jobs.map(jobValue)

module.exports = {
    JobValue: jobValue,
    JobValues: jobValues
}