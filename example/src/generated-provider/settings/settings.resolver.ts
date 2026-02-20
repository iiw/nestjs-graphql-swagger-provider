/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SettingsService } from './settings.service';
import { PutSettingsInput } from './settings.dto';
import { GetSettingsResponse } from './settings.models';

@Resolver()
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {
  }

  @Query(() => GetSettingsResponse)
  async getSettings(): Promise<any> {
        return this.settingsService.getSettings();
  }

  @Mutation(() => Boolean)
  async putSettings(@Args('input') input: PutSettingsInput): Promise<any> {
        return this.settingsService.putSettings(input);
  }
}
