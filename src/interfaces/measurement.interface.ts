import { Document } from 'mongoose';
import { Task } from './task.interface';

export interface Measurement extends Document {
    task: Task,
    name: string,
    standardNum: number,
    realityNum: number,
    unit: string,
    createdAt: number,
    updatedAt: number,
    deletedAt: number,
}