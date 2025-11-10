import { Module } from '@nestjs/common';
import { ClientModule } from 'src/clients/infraestructure/client.module';
import { OperatorModule } from 'src/operators/infraestructure/operator.module';

@Module({
  imports: [ClientModule, OperatorModule],
})
export class LaunchModule {}
