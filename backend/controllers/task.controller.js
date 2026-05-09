// controllers/todo.controller.js
import { getSuccessResponse } from "../utils/getResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { createTaskService, deleteAdminTaskService, deleteTaskService, getAllTasksService, getUserTaskService, updateTaskService } from "../services/task.service.js";

export const createTask = asyncHandler(async (req, res) => {
    const task = await createTaskService(
      { title: req.body.title, description: req.body.description, userId: req.user._id }
    );

    res.status(201).json(getSuccessResponse({
      message: "Task created successfully",
      data:{task},
    }));
});

export const updateTask = asyncHandler(async (req, res) => {
  // console.log(req.body);
  // console.log(req.user);
    const task = await updateTaskService({
        taskId: req.body.taskId,
        title: req.body.title,
        description: req.body.description,
        userId: req.user._id
    });

    res.status(200).json(getSuccessResponse({
      message: "Task updated successfully",
      data: { task },
    }));
});

export const getUserTask = asyncHandler(async (req, res) => {
    const tasks = await getUserTaskService(req.user._id);

    res.status(200).json(getSuccessResponse({
      message: "Tasks retrieved successfully",
      data: { tasks },
    }));
});

export const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await getAllTasksService();

    res.status(200).json(getSuccessResponse({
      message: "All tasks retrieved successfully",
      data: { tasks },
    }));
});

// DELETE TASK
export const deleteTask = asyncHandler(async (req, res) => {
    const task = await deleteTaskService({ taskId: req.body.taskId, userId: req.user._id });

    res.status(200).json(getSuccessResponse({
      message: "Task deleted successfully",
      data: { task },
    }));
});

export const deleteAdminTask = asyncHandler( async (req, res) => {
    const task = await deleteAdminTaskService({ taskId: req.body.taskId });

    res.status(200).json(getSuccessResponse({
      message: "Task deleted successfully",
      data: { task },
    }));

});