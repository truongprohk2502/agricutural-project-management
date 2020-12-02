import { Document } from 'mongoose';
import { Material } from './material.interface';
import { Measurement } from './measurement.interface';
import { Phase } from './phase.interface';

export interface Task extends Document {
    phase: Phase,
    name: string,
    description: string,
    note: string,
    images: [string],
    planStartDate: number,
    planEndDate: number,
    estimatedTime: number,
    estimatedTimeUnit: string,
    workerNum: number,
    workerUnitFee: number,
    isDailyTask: boolean,
    status: string,
    measurements: [Measurement],
    materials: [Material],
    createdAt: number,
    updatedAt: number,
    deletedAt: number,
}