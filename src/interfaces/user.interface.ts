import { Document } from 'mongoose';

export interface User extends Document {
    readonly fullName: string,
    readonly phone: string,
    readonly address: string,
    readonly role: string,
    readonly local: {
        readonly email: string,
        readonly password: string,
    },
    readonly google: {
        readonly uid: string,
        readonly token: string,
        readonly email: string,
    },
    readonly createdAt: number,
    readonly updatedAt: number,
    readonly deletedAt: number,
    readonly isActive: boolean,
}