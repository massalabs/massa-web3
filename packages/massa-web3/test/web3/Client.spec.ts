import { Client } from '../../src/web3/Client';
import { IClientConfig } from '../../src/interfaces/IClientConfig';
import { IProvider } from '../../src/interfaces/IProvider';
import { ProviderType } from '../../src/interfaces/IProvider';
import { DefaultProviderUrls } from '@massalabs/web3-utils';

describe('Client Class', () => {
  let clientConfig: IClientConfig;
  let client: Client;

  beforeEach(() => {
    clientConfig = {
      providers: [
        { url: 'https://mock-public-api', type: ProviderType.PUBLIC },
        { url: 'https://mock-private-api', type: ProviderType.PRIVATE },
      ],
      periodOffset: 0,
    };
    client = new Client(clientConfig);
  });

  test('should return the wallet client', () => {
    const walletClient = client.wallet();
    expect(walletClient).toBeTruthy();
  });

  test('should return the smart contracts client', () => {
    const smartContractsClient = client.smartContracts();
    expect(smartContractsClient).toBeTruthy();
  });

  test('should set custom providers', () => {
    const newProviders: Array<IProvider> = [
      { url: 'https://mock-public-api', type: ProviderType.PUBLIC },
      { url: 'https://mock-private-api', type: ProviderType.PRIVATE },
    ];
    client.setCustomProviders(newProviders);

    const currentProviders = client.getProviders();
    expect(currentProviders).toEqual(newProviders);
  });

  test('should return public providers', () => {
    const publicProviders = client.getPublicProviders();
    expect(publicProviders).toHaveLength(1);
    expect(publicProviders[0].type).toEqual(ProviderType.PUBLIC);
  });

  test('should return private providers', () => {
    const privateProviders = client.getPrivateProviders();
    expect(privateProviders).toHaveLength(1);
    expect(privateProviders[0].type).toEqual(ProviderType.PRIVATE);
  });

  test('should set new default provider', () => {
    const newDefaultProvider =
      'https://new-default-provider.com' as DefaultProviderUrls;
    client.setNewDefaultProvider(newDefaultProvider);

    const currentProviders = client.getProviders();
    expect(currentProviders).toHaveLength(2);
    expect(currentProviders[0].url).toBe(newDefaultProvider);
    expect(currentProviders[1].url).toBe(newDefaultProvider);
  });

  test('should return the private api client', () => {
    const privateApiClient = client.privateApi();
    expect(privateApiClient).toBeTruthy();
  });

  test('should return the public api client', () => {
    const publicApiClient = client.publicApi();
    expect(publicApiClient).toBeTruthy();
  });
});
