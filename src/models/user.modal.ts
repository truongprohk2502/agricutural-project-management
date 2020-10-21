import * as mongoose from 'mongoose'
import { config } from 'dotenv';

config()

export const UserSchema = new mongoose.Schema({
    fullName: { type: String, trim: true },
    phone: { type: String, default: null, trim: true },
    address: { type: String, default: null, trim: true },
    role: { type: String, default: 'user' },
    local: {
        email: { type: String, trim: true },
        password: { type: String, trim: true },
    },
    google: {
        uid: { type: String, trim: true },
        email: { type: String, trim: true },
    },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null },
    isActive: { type: Boolean, default: true },
})