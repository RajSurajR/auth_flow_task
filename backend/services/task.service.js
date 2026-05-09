import { Todo } from "../models/Todo.model.js";
import { AppError } from "../utils/AppError.js";

export const createTaskService = async ({ title, description, userId }) => {
    if (!title || !description || !userId) {
        throw new AppError("Title and description are required", 400);
    }
    try {
        const task = await Todo.create({
            title,
            description,
            user:userId,
        });
        return task;
    } catch (error) {
        throw new AppError("Failed to create task", 500);
    }
};


export const updateTaskService = async(data) =>{
    const { taskId, title, description, userId } = data;   
    if(!taskId || !title || !description || !userId){
        throw new AppError("Fields are required", 400);
    }

    const task = await Todo.findOne({ _id: taskId, user: userId });
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    task.title = title;
    task.description = description;
    await task.save();

    return task;
}


export const getUserTaskService = async (userId) => {
  const tasks = await Todo.find({ user: userId }).sort({ createdAt: -1, });
  return tasks;
};

export const deleteTaskService = async ({ taskId, userId }) => {
    const task = await Todo.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
        throw new AppError("Task not found", 404);
    }

    return task;
};

export const deleteAdminTaskService = async ({ taskId }) => {
  const task = await Todo.findByIdAndDelete(taskId);
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  return task;
};

export const getAllTasksService = async () => {
  const tasks = await Todo.find().populate("user", "name email").sort({ createdAt: -1 });
  return tasks;
};