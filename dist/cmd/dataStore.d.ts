type DatastoreContract = {
    data: Uint8Array;
    args: Uint8Array;
    coins: bigint;
};
/**
 * Populates the datastore with the contracts.
 *
 * @remarks
 * This function is to be used in conjunction with the deployer smart contract.
 * The deployer smart contract expects to have an execution datastore in a specific state.
 * This function populates the datastore according to that expectation.
 *
 * @param contracts - The contracts to populate the datastore with.
 *
 * @returns The populated datastore.
 */
export declare function populateDatastore(contracts: DatastoreContract[]): Map<Uint8Array, Uint8Array>;
export {};
