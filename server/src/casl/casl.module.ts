import { Module } from '@nestjs/common';

import { CaslAbilityFactory } from './casl-ability.factory';

import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
