import * as mongoose from 'mongoose'

export const PhaseSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    name: { type: String, trim: true },
    planStartDate: Number,
    planEndDate: Number,
    estimatedTime: Number,
    estimatedTimeUnit: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null },
})