import * as mongoose from 'mongoose'

export const MaterialSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    name: { type: String, trim: true },
    quantity: { type: Number, default: 0 },
    unitPrice: { type: Number, default: 0 },
    actualQuantity: Number,
    actualUnitPrice: Number,
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: null },
    deletedAt: { type: Number, default: null },
})