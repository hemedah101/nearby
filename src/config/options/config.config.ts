import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { ConfigModuleOptions } from '../interfaces/config-options.interface';

export class ConfigModuleConfig
  implements ModuleConfigFactory<ConfigModuleOptions> {
  createModuleConfig(): ConfigModuleOptions {
    return {
      filename: '.env',
      useProcess: false,
    };
  }
}
