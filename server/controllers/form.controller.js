import mongoose, { mongo } from 'mongoose';
import Form from '../models/form.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { CustomError } from '../utils/customError.js';

const createForm = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json(new CustomError('All fields are required', 400));
  }
  const user = req.user;
  const form = await Form.create({
    title,
    description,
    createdBy: user._id,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, 'Form created successfully', form));
});

const getAllForms = asyncHandler(async (req, res, next) => {
  const forms = await Form.find();
  return res
    .status(200)
    .json(new ApiResponse(200, 'Forms fetched successfully', forms));
});

const getUserForms = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const forms = await Form.find({ createdBy: user._id });
  return res
    .status(200)
    .json(new ApiResponse(200, 'Forms fetched successfully', forms));
});

const getFormById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(new CustomError('Invalid form id', 404));
  }
  const form = await Form.findById(id);
  if (!form) {
    return res.status(404).json(new CustomError('Form not found', 404));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, 'Form fetched successfully', form));
});

const updateForm = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(new CustomError('Invalid form id', 404));
  }

  const form = await Form.findById(id);
  if (!form) {
    return res.status(404).json(new CustomError('Form not found', 404));
  }

  if (form.createdBy.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json(new CustomError('You are not authorized to update this form', 403));
  }

  form.title = title;
  form.description = description;
  await form.save();
  return res
    .status(200)
    .json(new ApiResponse(200, 'Form updated successfully', form));
});

const deleteForm = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const isAdmin = req.user.isAdmin;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(new CustomError('Invalid form id', 404));
  }

  const form = await Form.findById(id);
  if (!form) {
    return res.status(404).json(new CustomError('Form not found', 404));
  }

  if (form.createdBy.toString() !== req.user._id.toString() && !isAdmin) {
    return res
      .status(403)
      .json(new CustomError('You are not authorized to delete this form', 403));
  }

  await Form.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, 'Form deleted successfully'));
});

export {
  createForm,
  getAllForms,
  getUserForms,
  deleteForm,
  getFormById,
  updateForm,
};
