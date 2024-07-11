import Form from "../models/form.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createForm = asyncHandler(async (req, res, next) => {

    const { title, description } = req.body;
    const { userId } = req.user;
    const form = await Form.create({
        title,
        description,
        createdBy: userId
    });
    return res.status(201).json(new ApiResponse(201, "Form created successfully", form));
})


export { createForm };