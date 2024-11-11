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
