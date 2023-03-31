const { StatusCodes } = require('http-status-codes');
const Job = require('../models/Job');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort(
    '-createdAt'
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;

  const job = await Job.find({
    createdBy: userId,
    _id: jobId,
  });

  if (!job) {
    throw new NotFoundError('Job not found!');
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const user = req.user.userId;
  const { title, company } = req.body;
  const job = await Job.create({ title, company, createdBy: user });
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, title },
    params: { id: jobId },
    user: { userId },
  } = req;

  if (company === '' || title === '') {
    throw new BadRequestError('Job title and Company is required for update');
  }

  const job = await Job.findByIdAndUpdate(
    {
      createdBy: userId,
      _id: jobId,
    },
    { company, title },
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError('Job not found!');
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;

  const job = await Job.findByIdAndRemove({
    createdBy: userId,
    _id: jobId,
  });

  if (!job) {
    throw new NotFoundError('Job not found!');
  }

  res.status(StatusCodes.OK).json({ success: 'true' });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
