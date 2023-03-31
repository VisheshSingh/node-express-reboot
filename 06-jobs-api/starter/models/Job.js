const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide job title'],
      maxlength: 30,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      maxlength: 30,
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'interview', 'declined'],
        message: '{VALUE} is not supported',
      },
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
