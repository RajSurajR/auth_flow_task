import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";


const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "MERNAuthentication",
        });
        console.log(" MongoDB connected successfully");

        // Check if admin user already exists
        const existingAdmin = await User.findOne({ role: "admin" });
        if (existingAdmin) {
            console.log(" Admin user already exists:");
            console.log(`Name: ${existingAdmin.name}`);
            console.log(`Email: ${existingAdmin.email}`);
            console.log(" Skipping creation...");
            return;
        }

        // Admin user details
        const adminData = {
            name: "Super Admin",
            email: "admin@primetrade.com",
            password: "Admin@1234", // Plain password
            role: "admin",
            is2fa: false
        };

        // Hash the password
        const hashedPassword = await bcrypt.hash(adminData.password, 10);

        // Create admin user
        const adminUser = await User.create({
            name: adminData.name,
            email: adminData.email,
            password: hashedPassword,
            role: adminData.role,
            is2fa: adminData.is2fa
        });

        console.log("Admin user created successfully!");
        console.log(`Name: ${adminUser.name}`);
        console.log(`Email: ${adminUser.email}`);
        console.log(`Role: ${adminUser.role}`);
        console.log(`Password: ${adminData.password} (Remember to change this!)`);
        console.log("\n Use these credentials to login as admin");

    } catch (error) {
        console.error("❌ Error creating admin user:", error.message);
        process.exit(1);
    } finally {
        // Close database connection
        await mongoose.connection.close();
        console.log("Database connection closed");
    }
};

// Run the script
createAdminUser().then(() => {
    console.log(" Script completed successfully!");
    process.exit(0);
}).catch((error) => {
    console.error(" Script failed:", error);
    process.exit(1);
});