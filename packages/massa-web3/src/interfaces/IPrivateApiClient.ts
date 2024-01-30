import { ISignedMessage } from './ISignedMessage'

/**
 * Private API client interface for creating an API to interact with a Massa Node.
 */
export interface IPrivateApiClient {
  /**
   * Method to ban a node by its ID.
   *
   * @param id - The ID of the node to ban.
   *
   * @returns - A promise so that the call can be asynchronous.
   */
  nodeBanById(id: string): Promise<void>

  /**
   * Method to ban a node by its IP address.
   *
   * @param ipAddress - The IP address of the node to ban.
   *
   * @returns - A promise so that the call can be asynchronous.
   */
  nodeBanByIpAddress(ipAddress: string): Promise<void>

  /**
   * Method to unban a node by its ID.
   *
   * @param nodeId - The ID of the node to unban.
   *
   * @returns - A promise so that the call can be asynchronous.
   */
  nodeUnbanById(nodeId: string): Promise<void>

  /**
   * Method to unban a node by its IP address.
   *
   * @param ipAddress - The IP address of the node to unban.
   *
   * @returns - A promise so that the call can be asynchronous.
   */
  nodeUnbanByIpAddress(ipAddress: string): Promise<void>

  /**
   * Method to remove a node from the whitelist.
   *
   * @param ipAddress - The IP address of the node to remove from the whitelist.
   *
   * @returns - A promise so that the call can be asynchronous.
   */
  nodeRemoveFromWhitelist(ipAddress: string): Promise<void>

  /**
   * Method to add a node to the whitelist.
   *
   * @param ipAddress - The IP address of the node to add to the whitelist.
   *
   * @returns - A promise so that the call can be asynchronous.
   */
  nodeAddToPeersWhitelist(ipAddress: string): Promise<void>

  /**
   * Method to stop the node.
   *
   * @returns - A promise so that the call can be asynchronous.
   */
  nodeStop(): Promise<void>

  /**
   * Method to sign a message from the node sign feature.
   *
   * @param message - The message to sign as a byte array.
   *
   * @returns - The signed message.
   */
  nodeSignMessage(message: Uint8Array): Promise<ISignedMessage>

  /**
   * Method to get the staking addresses of the node.
   *
   * @returns - Return an array of addresses that are stacking on the node.
   */
  nodeGetStakingAddresses(): Promise<Array<string>>

  /**
   * Method to remove staking addresses from the node.
   *
   * @param addresses - The array of addresses to remove from the node.
   *
   * @returns - A promise so that the call can be asynchronous.
   */
  nodeRemoveStakingAddresses(addresses: Array<string>): Promise<void>

  /**
   * Method to add staking addresses to the node.
   *
   * @param secretKeys - The array of the secret keys of addresses to add to the node.
   *
   * @returns - A promise so that the call can be asynchronous.
   */
  nodeAddStakingSecretKeys(secretKeys: Array<string>): Promise<void>
}
