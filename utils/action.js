"use server";

import fs from 'fs/promises';
import path from 'path';
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

export async function createUser(formData) {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const schema = z.object({
        name: z.string().min(1).max(25).nonempty(),
        email: z.string().email().nonempty('Enter a valid email'),
        role: z.string().nonempty('Select a role'),
        status: z.string().nonempty('Select status'),
    });

    const data = schema.parse({
        name: formData.get('name'),
        email: formData.get('email'),
        role: formData.get('role'),
        status: formData.get('status'),
    });

    const photoFile = formData.get('photo'); // Access the file from FormData
    const userEmail = formData.get('email');
    
    let photoPath = null;
    if (photoFile && photoFile.name) {
        const photoName = `${uuidv4()}-${photoFile.name}`;
        photoPath = path.join('/uploads', photoName); // Path to store in JSON
        const fullPhotoPath = path.join(uploadDir, photoName);

        // Write the file to the uploads directory
        const buffer = Buffer.from(await photoFile.arrayBuffer());
        await fs.writeFile(fullPhotoPath, buffer);
    }

    try {
        // Read the existing users from the file
        const fileData = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(fileData);        

        const checkUserEmail = users.find((user) => userEmail == user.email);
        console.log(checkUserEmail)
        if(!checkUserEmail){
    
            // Add the new user with the photo path
            const newUser = { id: users.length + 1, ...data, photo: photoPath };
            users.push(newUser);
        
            // Write the updated users array back to the file
            await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
        
            return { successMsg: `Created user ${data.name}` };
        } 
        return { errorMsg: `user already exist`}
    
    } catch (error) {
        console.error(`The error successMsg: ${error.message}`);
        return { errorMsg: `Failed to create user` };
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

    const data = schema.parse({
        id: formData.id, 
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
            return { errorMsg: `User not found` };
        }

        // Update the user’s information
        users[userIndex] = { ...users[userIndex], ...data };

        // Write the updated users array back to the file
        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
        return { successMsg: `Updated user ${data.name}` };
    
    } catch (error) {
        console.error(`Error while updating user: ${error.message}`);
        return { errorMsg: `Failed to update user` };
    }
}
