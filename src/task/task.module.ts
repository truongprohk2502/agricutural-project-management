import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/models/task.model';
import { PhaseModule } from 'src/phase/phase.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema }
    ]),
    PhaseModule
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule {}
