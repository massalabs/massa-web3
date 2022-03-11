
export interface ITransactionOpType {
    "Transaction": {
        "amount": string, // represent an Amount in coins
        "recipient_address": string
    }
}

export interface IRollBuyOpType {
    "RollBuy": {
        "roll_count": number
    }
}

export interface IRollSellOpType {
    "RollSell": {
        "roll_count": number
    }
}

export interface IExecSmartContractOpType {
    "ExecuteSC": {
        "data": [number], // vec of bytes to execute
        "max_gas": number, // maximum amount of gas that the execution of the contract is allowed to cost.
        "coins": string, // represent an Amount in coins that are spent by consensus and are available in the execution context of the contract.
        "gas_price": string, // represent an Amount in coins, price per unit of gas that the caller is willing to pay for the execution.
    }
}

export type OpType = ITransactionOpType | ITransactionOpType | IRollSellOpType | IExecSmartContractOpType;


export interface IBlockInfo {
    "id": string // BlockId,
    "content": null | {
        "is_final": boolean,
        "is_stale": boolean,
        "is_in_blockclique": boolean,
        "block": {
            "header": {
                "content": {
                  "endorsed_block": string, // Block id
                  "index": number,
                  "sender_public_key": string,
                  "slot": { // endorsed block slot: deifferent from block's slot
                    "period": number,
                    "thread": number
                  }
                },
                "signature": string
            },
            "operation_merkle_root": string, // Hash of all operations
            "parents": [string], // Block ids, as many as thread count
            "slot": {
              "period": number,
              "thread": number
            }
        },
        "signature": string,
        "operations": [
          {
            "content": {
              "expire_period": number,
              "fee": string, // represent an Amount in coins
              "op": OpType,
              "sender_public_key": string
            },
            "signature": string
          }
        ]
      },
      "is_final": boolean,
      "is_in_blockclique": boolean,
      "is_stale": boolean
  }
