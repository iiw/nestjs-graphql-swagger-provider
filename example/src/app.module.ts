import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Api, HttpClient } from './generated-provider/api-client';
import { AddressesModule } from './generated-provider/addresses/addresses.module';
import { ByronAddressesModule } from './generated-provider/byron-addresses/byron-addresses.module';
import { ByronCoinSelectionsModule } from './generated-provider/byron-coin-selections/byron-coin-selections.module';
import { ByronMigrationsModule } from './generated-provider/byron-migrations/byron-migrations.module';
import { ByronTransactionsModule } from './generated-provider/byron-transactions/byron-transactions.module';
import { ByronWalletsModule } from './generated-provider/byron-wallets/byron-wallets.module';
import { CoinSelectionsModule } from './generated-provider/coin-selections/coin-selections.module';
import { ExperimentalModule } from './generated-provider/experimental/experimental.module';
import { KeysModule } from './generated-provider/keys/keys.module';
import { MigrationsModule } from './generated-provider/migrations/migrations.module';
import { NetworkModule } from './generated-provider/network/network.module';
import { ProxyModule } from './generated-provider/proxy/proxy.module';
import { SettingsModule } from './generated-provider/settings/settings.module';
import { StakePoolsModule } from './generated-provider/stake-pools/stake-pools.module';
import { TransactionsModule } from './generated-provider/transactions/transactions.module';
import { UtilsModule } from './generated-provider/utils/utils.module';
import { WalletsModule } from './generated-provider/wallets/wallets.module';

const apiClient = new Api(
  new HttpClient({
    baseURL: process.env.API_BASE_URL || 'http://localhost:8090/v2',
  }),
);

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    AddressesModule.register(apiClient),
    ByronAddressesModule.register(apiClient),
    ByronCoinSelectionsModule.register(apiClient),
    ByronMigrationsModule.register(apiClient),
    ByronTransactionsModule.register(apiClient),
    ByronWalletsModule.register(apiClient),
    CoinSelectionsModule.register(apiClient),
    ExperimentalModule.register(apiClient),
    KeysModule.register(apiClient),
    MigrationsModule.register(apiClient),
    NetworkModule.register(apiClient),
    ProxyModule.register(apiClient),
    SettingsModule.register(apiClient),
    StakePoolsModule.register(apiClient),
    TransactionsModule.register(apiClient),
    UtilsModule.register(apiClient),
    WalletsModule.register(apiClient),
  ],
})
export class AppModule {}
