import { Document } from 'mongoose';
import { Phase } from './phase.interface';
import { User } from './user.interface';

export interface Project extends Document {
    author: User,
    name: string,
    description: string,
    images: [string],
    minimalScale: number,
    standardUnit: string,
    investmentCost: number,
    planStartDate: number,
    planEndDate: number,
    estimatedTime: number,
    estimatedTimeUnit: string,
    estimatedQuantity: number,
    unitPrice: number,
    projectType: string,
    phases: [Phase],
    createdAt: number,
    updatedAt: number,
    deletedAt: number,
    isActive: boolean,
}