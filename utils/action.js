"use server";

import fs from 'fs/promises';
import path from 'path';
import { z } from "zod";

export async function createUser(prevState, formData) {
    const filePath = path.join(process.cwd(), 'data', 'users.json');

    const schema = z.object({
        name: z.string().min(1).max(25).nonempty(),
        email: z.string().email().nonempty('enter a valid email'),
        role: z.string().nonempty('select a role'),
        status: z.string().nonempty('select status'),
    });

    const data = schema.parse({
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
        status: formData.get('status'),
    });

    try {
        // Read the existing users from the file
        const fileData = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(fileData);
    
        // Add the new user to the array
        const newUser = { id: users.length + 1, ...data };
        users.push(newUser);
    
        // Write the updated users array back to the file
        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
    
        return { message: `Created user ${data.name}` };
    
    } catch (error) {
        console.error(`The error message: ${error.message}`);
        return { message: `Failed to create user` };
    }
}

export async function editUser(formData) {
    const filePath = path.join(process.cwd(), 'data', 'users.json');

    // Define the validation schema
    const schema = z.object({
        id: z.number().int().positive(),
        name: z.string().min(1).max(25).nonempty(),
        email: z.string().email().nonempty('Enter a valid email'),
        status: z.string().nonempty('Select status'),
    });

    // Parse and validate the data directly from formData (assuming formData is a plain object)
    const data = schema.parse({
        id: formData.id, // Parse ID as integer
        name: formData.name,
        email: formData.email,
        status: formData.status,
    });

    try {
        // Read the existing users from the file
        const fileData = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(fileData);

        // Find the index of the user to edit
        const userIndex = users.findIndex((user) => user.id === data.id);
        if (userIndex === -1) {
            console.log(`User with ID ${data.id} not found`);
            return { message: `User not found` };
        }

        // Update the user’s information
        users[userIndex] = { ...users[userIndex], ...data };

        // Write the updated users array back to the file
        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
        return { message: `Updated user ${data.name}` };
    
    } catch (error) {
        console.error(`Error while updating user: ${error.message}`);
        return { message: `Failed to update user` };
    }
}
