import * as mongoose from 'mongoose'

export const MeasurementSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    name: { type: String, trim: true },
    standardNum: { type: Number, default: 0 },
    realityNum: { type: Number, default: 0 },
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null },
})