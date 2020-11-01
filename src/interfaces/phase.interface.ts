import { Document } from 'mongoose';
import { Project } from './project.interface';
import { Task } from './task.interface';

export interface Phase extends Document {
    project: Project,
    name: string,
    planStartDate: number,
    planEndDate: number,
    estimatedTime: number,
    estimatedTimeUnit: string,
    tasks: [Task],
    createdAt: number,
    updatedAt: number,
    deletedAt: number,
}