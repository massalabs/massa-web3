/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
import { IAccount } from '../../src/interfaces/IAccount'
import { ClientFactory } from '../../src/web3/ClientFactory'
import { WalletClient } from '../../src/web3/WalletClient'
import { Client } from '../../src/web3/Client'
import { ICallData } from '../../src/interfaces/ICallData'
import * as dotenv from 'dotenv'
import { IProvider, ProviderType } from '../../src/interfaces/IProvider'
import {
  Args,
  CHAIN_ID,
  EOperationStatus,
  ITransactionData,
  fromMAS,
} from '../../src'
import { getEnvVariable } from '../utils'

const path = require('path')
const chalk = require('chalk')
const ora = require('ora')

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
})

const publicApi = getEnvVariable('JSON_RPC_URL_PUBLIC')
const privateApi = getEnvVariable('JSON_RPC_URL_PRIVATE')
const chainId = CHAIN_ID.BuildNet
const privateKey = getEnvVariable('DEPLOYER_PRIVATE_KEY')

;(async () => {
  const header = '='.repeat(process.stdout.columns - 1)
  console.log(header)
  console.log(`${chalk.green.bold('Massa Name Service Resolver Example')}`)
  console.log(header)

  let spinner
  try {
    // init client
    const deployerAccount: IAccount =
      await WalletClient.getAccountFromSecretKey(privateKey)
    const web3Client: Client = await ClientFactory.createCustomClient(
      [
        { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
        { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
      ],
      chainId,
      true,
      deployerAccount
    )

    // Try to register a domain
    const domain = 'example'
    const address = deployerAccount.address as string

    spinner = ora('Trying to create the domain').start()
    try {
      const domainCreationOpId = await web3Client
        .smartContracts()
        .callSmartContract({
          fee: fromMAS(0.01),
          coins: fromMAS(2),
          targetAddress: web3Client.mnsResolver().getMnsResolverAddress(),
          targetFunction: 'dnsAlloc',
          parameter: new Args()
            .addString(domain)
            .addString(address)
            .serialize(),
        } as ICallData)
      await web3Client
        .smartContracts()
        .awaitMultipleRequiredOperationStatus(domainCreationOpId, [
          EOperationStatus.SPECULATIVE_SUCCESS,
          EOperationStatus.SPECULATIVE_ERROR,
        ])
      spinner.succeed('Domain created successfully')
    } catch (ex) {
      spinner.succeed('Domain already exists')
    }

    // Try to resolve the domain
    spinner = ora('Trying to resolve the domain').start()
    const resolvedAddress = await web3Client
      .mnsResolver()
      .resolve(domain + '.massa')
    spinner.succeed(`Domain resolved to address ${resolvedAddress}`)

    // Try to send a transaction to the resolved address
    spinner = ora(
      'Trying to send a transaction to the resolved address'
    ).start()
    const txData = {
      amount: fromMAS(1),
      recipientAddress: resolvedAddress,
      fee: fromMAS(0.01),
    } as ITransactionData
    const txOpId = await web3Client.wallet().sendTransaction(txData)
    await web3Client
      .smartContracts()
      .awaitMultipleRequiredOperationStatus(txOpId[0], [
        EOperationStatus.SPECULATIVE_SUCCESS,
      ])
    spinner.succeed('Transaction sent successfully')
    // Try to call a function on the resolved address
    spinner = ora('Trying to call a function on the resolved address').start()
    const callData = {
      fee: fromMAS(0.01),
      coins: fromMAS(1),
      targetAddress: resolvedAddress,
      targetFunction: 'getBalance',
      parameter: new Args().serialize(),
    }

    try {
      await web3Client.smartContracts().callSmartContract(callData)
    } catch (ex) {
      if (
        ex.message.endsWith(
          `The called address ${resolvedAddress} is not a smart contract address`
        )
      ) {
        spinner.succeed('Call smart contract resolved address successfully')
      } else {
        spinner.fail('Call smart contract resolved address failed')
        throw ex
      }
    }

    // Try to call a read only function on the resolved address
    spinner = ora(
      'Trying to call a read only function on the resolved address'
    ).start()
    const callReadOnlyData = {
      fee: fromMAS(0.01),
      targetAddress: resolvedAddress,
      targetFunction: 'getBalance',
      parameter: new Args().serialize(),
    }

    try {
      await web3Client.smartContracts().readSmartContract(callReadOnlyData)
    } catch (ex) {
      if (
        ex.message.endsWith(
          `The called address ${resolvedAddress} is not a smart contract address`
        )
      ) {
        spinner.succeed('Read smart contract resolved address successfully')
      } else {
        spinner.fail('Read smart contract resolved address failed')
        throw ex
      }
    }
  } catch (ex) {
    console.error(ex)
    const msg = chalk.red(`Error = ${ex}`)
    if (spinner) spinner.fail(msg)
    process.exit(-1)
  }
})()
