import userRoutes from "./user.route.js";
import taskRoutes from "./task.route.js";

export const allRoutes = (app) => {
    app.use("/api/v1/auth", userRoutes); // prefix route

    app.use("/api/v1/task", taskRoutes);
};