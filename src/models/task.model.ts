import * as mongoose from 'mongoose'

export const TaskSchema = new mongoose.Schema({
    phase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phase'
    },
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    planStartDate: Number,
    planEndDate: Number,
    estimatedTime: Number,
    estimatedTimeUnit: String,
    measurements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' }],
    materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null },
})