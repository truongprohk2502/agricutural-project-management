import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementSchema } from 'src/models/measurement.model';
import { TaskModule } from 'src/task/task.module';
import { MeasurementController } from './measurement.controller';
import { MeasurementService } from './measurement.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Measurement', schema: MeasurementSchema }
    ]),
    TaskModule
  ],
  controllers: [MeasurementController],
  providers: [MeasurementService]
})
export class MeasurementModule {}
