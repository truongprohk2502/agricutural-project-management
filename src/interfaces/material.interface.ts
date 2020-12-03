import { Document } from 'mongoose';
import { Task } from './task.interface';

export interface Material extends Document {
    task: Task,
    name: string,
    quantity: number,
    unit: string,
    unitPrice: number,
    createdAt: number,
    updatedAt: number,
    deletedAt: number,
}