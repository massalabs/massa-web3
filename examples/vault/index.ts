import { ClientFactory, DefaultJsonRpcProviderUrls } from "../../src/web3/ClientFactory";
const chalk = require("chalk");
const ora = require("ora");

(async () => {

    const header = "=".repeat(process.stdout.columns - 1);
    console.log(header);
    console.log(`${chalk.green.bold("Vault Interaction Example")}`);
    console.log(header);

    let spinner;

    try {
        // init client
        const web3Client = await ClientFactory.createDefaultJsonRpcClient(DefaultJsonRpcProviderUrls.LABNET, true);

        // init vault
        spinner = ora(`Initializing vault....`).start();
        await web3Client.vault().init();
        spinner.succeed(`Vault successfully initialized`);

        // set password to vault
        spinner = ora(`Setting vault password....`).start();
        web3Client.vault().setPassword("supersecret");
        spinner.succeed(`Vault password successfully set`);

        // export vault
        spinner = ora(`Exporting vault....`).start();
        const exportedVault = web3Client.vault().exportVault();
        spinner.succeed(`Vault successfully exported: ${chalk.yellow(JSON.stringify(exportedVault, null, 4))}`);

        // encrypt vault
        spinner = ora(`Encrypting vault....`).start();
        const encryptedVault = await web3Client.vault().encryptVault();
        spinner.succeed(`Vault successfully encrypted: ${chalk.yellow(JSON.stringify(encryptedVault, null, 4))}`);

        // decrypt vault
        spinner = ora(`Decrypting vault....`).start();
        const decryptedVault = await web3Client.vault().decryptVault(encryptedVault);
        spinner.succeed(`Vault successfully decrypted: ${chalk.yellow(JSON.stringify(decryptedVault, null, 4))}`);

        // recover vault
        spinner = ora(`Recovering vault....`).start();
        web3Client.vault().recoverVault(exportedVault.mnemonic);
        spinner.succeed(`Vault successfully recovered!`);

    } catch (ex) {
        const msg = chalk.red(`Error = ${ex.message}`);
        if (spinner) spinner.fail(msg);
    }
})();