import mongoose, { mongo } from 'mongoose';
import Form from '../models/form.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const createForm = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
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

const deleteForm = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const isAdmin = req.user.isAdmin;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(new ApiResponse(404, 'Form not found'));
  }

  const form = await Form.findById(id);
  if (!form) {
    return res.status(404).json(new ApiResponse(404, 'Form not found'));
  }

  if (form.createdBy.toString() !== req.user._id.toString() && !isAdmin) {
    return res
      .status(403)
      .json(new ApiResponse(403, 'You are not authorized to delete this form'));
  }

  await Form.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, 'Form deleted successfully'));
});

export { createForm, getAllForms, getUserForms, deleteForm };
