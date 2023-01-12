/**
 * Enum for representing operation state transitions
 */
export enum EOperationStatus {
	/**
     * Operation has been included 
	 * in the transaction pool and is pending
     */
	INCLUDED_PENDING = 0,
	/**
     * Operation is awaiting inclusion
	 * in the transaction pool
     */
	AWAITING_INCLUSION = 1,
	/**
     * Operation is has been finalized
     */
	FINAL = 2,
	/**
     * Operation state is inconsistent
     */
	INCONSISTENT = 3,
	/**
     * Operation has not been found
     */
	NOT_FOUND = 4
}
