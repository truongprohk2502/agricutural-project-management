import * as mongoose from 'mongoose'

export const ProjectSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: { type: String, trim: true },
    description: { type: String, default: null, trim: true },
    images: { type: [String], default: null, trim: true },
    minimalScale: { type: Number, default: null },
    standardUnit: { type: String, default: null, trim: true },
    address: { type: String, trim: true },
    standardGap: { type: [String], trim: true },
    investmentCost: Number,
    planStartDate: Number,
    planEndDate: Number,
    estimatedCost: { type: Number, default: 0 },
    estimatedTime: { type: Number, default: 0 },
    estimatedTimeUnit: { type: String, default: 'DAY' },
    estimatedQuantity: { type: Number, default: 0 },
    unitPrice: { type: Number, default: 0 },
    projectType: { type: String, default: 'SAMPLE' },
    phases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phase' }],
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null },
    isFinished: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
})
