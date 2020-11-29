import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/models/task.model';
import { PhaseModule } from 'src/phase/phase.module';
import { MaterialModule } from 'src/material/material.module';
import { MeasurementModule } from 'src/measurement/measurement.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TaskSchema }
    ]),
    PhaseModule,
    forwardRef(() => MaterialModule),
    forwardRef(() => MeasurementModule),
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService]
})
export class TaskModule {}
