import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialModule } from 'src/material/material.module';
import { MeasurementModule } from 'src/measurement/measurement.module';
import { ProjectSchema } from 'src/models/project.model';
import { PhaseModule } from 'src/phase/phase.module';
import { TaskModule } from 'src/task/task.module';
import { UsersModule } from 'src/users/users.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    UsersModule,
    forwardRef(() => PhaseModule),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
