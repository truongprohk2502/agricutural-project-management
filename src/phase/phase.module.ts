import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhaseSchema } from 'src/models/phase.model';
import { ProjectModule } from 'src/project/project.module';
import { PhaseController } from './phase.controller';
import { PhaseService } from './phase.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Phase', schema: PhaseSchema }
    ]),
    forwardRef(() => ProjectModule)
  ],
  controllers: [PhaseController],
  providers: [PhaseService],
  exports: [PhaseService]
})
export class PhaseModule { }
