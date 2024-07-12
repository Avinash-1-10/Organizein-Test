import Form from "../models/form.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createForm = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;
    const user = req.user;
    const form = await Form.create({
        title,
        description,
        createdBy: user._id
    });
    return res.status(201).json(new ApiResponse(201, "Form created successfully", form));
})

const getAllForms = asyncHandler(async (req, res, next) => {
    const forms = await Form.find();
    return res.status(200).json(new ApiResponse(200, "Forms fetched successfully", forms));
})

const getUserForms = asyncHandler(async (req, res, next) => {
    const user = req.user;
    const forms = await Form.find({ createdBy: user._id });
    return res.status(200).json(new ApiResponse(200, "Forms fetched successfully", forms));
})


export { createForm, getAllForms, getUserForms };