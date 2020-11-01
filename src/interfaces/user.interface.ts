import { Document } from 'mongoose';

export interface User extends Document {
    fullName: string,
    phone: string,
    address: string,
    role: string,
    local: {
        email: string,
        password: string,
    },
    google: {
        uid: string,
        token: string,
        email: string,
    },
    createdAt: number,
    updatedAt: number,
    deletedAt: number,
    isActive: boolean,
}