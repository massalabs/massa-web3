import { IAccount, IEventFilter, ClientFactory, DefaultProviderUrls, IEvent, IReadData, WalletClient, Args, ICallData  } from "./src/index";

const DEPLOYER_SECRET_KEY = "S1LoQ2cyq273f2TTi1qMYH6qgntAtpn85PbMd9qr2tS7S6A64cC";
const scAddress = "A12RcFXWqqn664L9wsJpqPeWo6yA2MuRGUYYiFigGZng4LJMhBhj";

(async () => {

  const header = "=".repeat(process.stdout.columns - 1);
  console.log(header);
  console.log(`${("Massa Smart Contract Interaction Example")}`);
  console.log(header);

  try {
    // init client
    const deployerAccount: IAccount = await WalletClient.getAccountFromSecretKey(DEPLOYER_SECRET_KEY);
    const web3Client = await ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, false, deployerAccount);

    /*
        // poll smart contract events for the opId
        console.log('Filtering for sc events....');
        const eventsFilter = {
            start: null,
            end: null,
            original_caller_address: null,
            original_operation_id: deploymentOperationId,
            emitter_address: null,
        } as IEventFilter;

        const events: Array<IEvent> = await web3Client.smartContracts().getFilteredScOutputEvents(eventsFilter);
        console.info(`Sc events received: ${(JSON.stringify(events, null, 4))}`);

        // find an event that contains the emitted sc address
        console.info('Extracting deployed sc address from events....');
        const addressEvent: IEvent | undefined = events.find(event => event.data.includes('SC created at:'));
        if (!addressEvent) {
            throw new Error('No events were emitted from contract containing a message `SC created at:...`. Please make sure to include such a message in order to fetch the sc address');
        }
        const scAddress: string = addressEvent.data.split(':')[1];
        console.info(`Smart Contract Address: ${(scAddress)}`);
        */


        
    // call contract
    /*
        console.log('Calling a smart contract state...');
        const args = new Args();
        const callTxId = await web3Client.smartContracts().callSmartContract({
            fee: 0,
            maxGas: 200000,
            coins: 0,
            targetAddress: scAddress,
            functionName: 'initialize',
            parameter:  args.serialize()        //Array.from(Buffer.from('gameState', 'utf16le')),
        } as ICallData);
        console.info(`Called read contract with operation ID ${(JSON.stringify(callTxId, null, 4))}`);
        */

    /*
        console.log('Calling a smart contract state...');
        const args = new Args();
        args.addString('alice').addI32(BigInt(22));
        const callTxId = await web3Client.smartContracts().callSmartContract({
            fee: 0,
            maxGas: 200000,
            coins: 0,
            targetAddress: scAddress,
            functionName: 'changeAge',
            parameter:  args.serialize()        //Array.from(Buffer.from('gameState', 'utf16le')),
        } as ICallData);
        console.info(`Called contract with operation ID ${(JSON.stringify(callTxId, null, 4))}`);
        */

    // getAgeNoArgs
    /*
        const args = new Args();
        const readTxId = await web3Client.smartContracts().readSmartContract({
            fee: 0,
            maxGas: 200000,
            targetAddress: scAddress,
            targetFunction: 'getAgeNoArgs',
            parameter: [], //Array.from(Buffer.from('gameState', 'utf16le')),
        } as IReadData);
        console.info(`Called read contract with operation ID ${(JSON.stringify(readTxId, null, 4))}`);
        const data = readTxId[0].result.Ok as Uint8Array;
        if (data) {
            console.info("RESULT ===> ", Buffer.from(data).toString("utf16le"));
        }
        */

    // getAgeString
    /*
        const args = new Args();
        const readTxId = await web3Client.smartContracts().readSmartContract({
            fee: 0,
            maxGas: 200000,
            targetAddress: scAddress,
            targetFunction: 'getAgeString',
            parameter: args.serialize(),
        } as IReadData);
        console.info(`Called read contract with operation ID ${(JSON.stringify(readTxId, null, 4))}`);
        const data = readTxId[0].result.Ok as Uint8Array;
        if (data) {
            console.info("RESULT ===> ", Buffer.from(data).toString("utf16le"));
        }
        */



    // getAgeBool
    /*
        const args = new Args();
        const readTxId = await web3Client.smartContracts().readSmartContract({
            fee: 0,
            maxGas: 200000,
            targetAddress: scAddress,
            targetFunction: 'getAgeBool',
            parameter: args.serialize(),
        } as IReadData);
        console.info(`Called read contract with operation ID ${(JSON.stringify(readTxId, null, 4))}`);
        const data = readTxId[0].result.Ok as Uint8Array;
        if (data) {
            console.info("RESULT ===> ", Buffer.from(data).toString("utf16le"));
        }
        */

    // getAgeBool
    /*
        const args = new Args();
        const readTxId = await web3Client.smartContracts().readSmartContract({
            fee: 0,
            maxGas: 200000,
            targetAddress: scAddress,
            targetFunction: 'getAgeNum',
            parameter: args.serialize(),
        } as IReadData);
        console.info(`Called read contract with operation ID ${(JSON.stringify(readTxId, null, 4))}`);
        const data = readTxId[0].result.Ok as Uint8Array;
        if (data) {
            console.info("RESULT ===> ", Buffer.from(data).toString("utf16le"));
        }
        */


    // getAgeArgs
    /*
        const args = new Args();
        const readTxId = await web3Client.smartContracts().readSmartContract({
            fee: 0,
            maxGas: 200000,
            targetAddress: scAddress,
            targetFunction: 'getAgeArgs',
            parameter: args.serialize(),
        } as IReadData);
        console.info(`Called read contract with operation ID ${(JSON.stringify(readTxId, null, 4))}`);
        const data = readTxId[0].result.Ok as Uint8Array;
        if (data) {
            const decodedArgs = new Args(data);
            console.info("RESULT ===> ", decodedArgs.nextString(), decodedArgs.nextU32());
        }
        */


    // event
    const args = new Args();
    const readTxId = await web3Client.smartContracts().readSmartContract({
      fee: 0,
      maxGas: 800000,
      targetAddress: scAddress,
      targetFunction: "event",
      parameter: args.serialize(),
    } as IReadData);
    console.info(`Called read contract with operation ID ${(JSON.stringify(readTxId, null, 4))}`);
    console.info("VALUE ===> ", Buffer.from(readTxId.returnValue).toString("utf16le"));
        





  } catch (ex) {
    console.error(ex);
  }
})();