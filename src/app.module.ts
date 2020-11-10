import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PhaseModule } from './phase/phase.module';
import { TaskModule } from './task/task.module';
import { MaterialModule } from './material/material.module';
import { MeasurementModule } from './measurement/measurement.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(`${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`),
    AuthModule, UsersModule, ProjectModule, PhaseModule, TaskModule, MaterialModule, MeasurementModule]
})
export class AppModule { }
