/* eslint-disable */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApiAddress {
  /**
   * @format base58|bech32
   * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
   */
  id: string;
  state: ApiAddressStateEnum;
}

export interface ApiAddressInspect {
  address_style: ApiAddressInspectAddressStyleEnum;
  stake_reference: ApiAddressInspectStakeReferenceEnum;
  /**
   * Can be null for 'Icarus' and 'Byron' styles.
   * @min 0
   */
  network_tag?: number;
  /**
   * @format base16
   * @minLength 56
   * @maxLength 56
   */
  spending_key_hash?: string;
  /**
   * @format base16
   * @minLength 56
   * @maxLength 56
   */
  stake_key_hash?: string;
  /**
   * @format base16
   * @minLength 64
   * @maxLength 64
   */
  script_hash?: string;
  pointer?: {
    /** @min 0 */
    slot_num: number;
    /** @min 0 */
    transaction_index: number;
    /** @min 0 */
    output_index: number;
  };
  /**
   * Only for 'Icarus' and 'Byron' styles.
   * @format base16
   */
  address_root?: string;
  /**
   * Only for 'Byron' style.
   * @format base16
   */
  derivation_path?: string;
}

/** The time slot corresponding the network tip. */
export interface ApiNetworkTip {
  /**
   * The 0-based slot index starting from genesis of the blockchain.
   * @min 0
   * @example 8086
   */
  absolute_slot_number: number;
  /**
   * An epoch is a time period which is divided into slots.
   * @min 0
   * @example 14
   */
  epoch_number: number;
  /**
   * The zero-based slot index within an epoch.
   * @min 0
   * @example 1337
   */
  slot_number: number;
  /**
   * @format iso-8601-date-and-time
   * @example "2019-02-27T14:46:45Z"
   */
  time: string;
}

export interface ApiNetworkInformation {
  /**
   * Estimated synchronization progress of the node with the underlying network. Note that this may
   * change quite arbitrarily as the node may switch to shorter or longer chain forks.
   * @example {"status":"ready"}
   */
  sync_progress: {
    status: ApiNetworkInformationStatusEnum;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: ApiNetworkInformationUnitEnum;
    };
  };
  /** Underlying node's tip */
  node_tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ApiNetworkInformationUnitEnum1;
    };
  };
  /** The time slot corresponding the network tip. */
  network_tip?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  next_epoch?: {
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    epoch_start_time: string;
  };
}

/**
 * [Network Time Protocol](https://en.wikipedia.org/wiki/Network_Time_Protocol) information of the server.
 *
 * **Important:** This piece of information only makes sense when the server runs on the same host machine as the node.
 */
export interface ApiNetworkClock {
  status: ApiNetworkClockStatusEnum;
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == available
   * </span><br/>
   * Drift offset of the local clock.
   */
  offset?: {
    /** @example 14 */
    quantity: number;
    unit: ApiNetworkClockUnitEnum;
  };
}

export interface ApiNetworkParameters {
  /**
   * The hash of genesis block
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "3c07030e36bfffe67e2e2ec09e5293d384637cd2f004356ef320f3fe6c52041a"
   */
  genesis_block_hash: string;
  /**
   * @format iso-8601-date-and-time
   * @example "2019-02-27T14:46:45Z"
   */
  blockchain_start_time: string;
  slot_length: {
    /**
     * @min 0
     * @example 10
     */
    quantity: number;
    unit: ApiNetworkParametersUnitEnum;
  };
  epoch_length: {
    /**
     * @min 0
     * @example 42000
     */
    quantity: number;
    unit: ApiNetworkParametersUnitEnum1;
  };
  epoch_stability: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: ApiNetworkParametersUnitEnum2;
  };
  active_slot_coefficient: {
    /**
     * @min 0
     * @max 100
     * @example 42
     */
    quantity: number;
    unit: ApiNetworkParametersUnitEnum3;
  };
  decentralization_level: {
    /**
     * @min 0
     * @max 100
     * @example 42
     */
    quantity: number;
    unit: ApiNetworkParametersUnitEnum4;
  };
  /**
   * @min 0
   * @example 100
   */
  desired_pool_number: number;
  /** Coins, in Lovelace */
  minimum_utxo_value: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ApiNetworkParametersUnitEnum5;
  };
  hardfork_at?: {
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    epoch_start_time: string;
  };
}

export interface ApiSelectCoinsPayments {
  /**
   * A list of target outputs
   * @minItems 0
   */
  payments: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiSelectCoinsPaymentsUnitEnum;
    };
  }[];
}

export interface ApiSelectCoinsAction {
  /**
   * A delegation action.
   *
   * Pool id is only required for "join".
   */
  delegation_action: {
    action: ApiSelectCoinsActionActionEnum;
    /**
     * A unique identifier for the pool.
     * @format hex|bech32
     * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
     */
    pool?: string;
  };
}

export type ApiSelectCoinsData =
  | {
      /**
       * A list of target outputs
       * @minItems 0
       */
      payments: {
        /**
         * @format base58|bech32
         * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
         */
        address: string;
        /** Coins, in Lovelace */
        amount: {
          /**
           * @min 0
           * @example 42000000
           */
          quantity: number;
          unit: ApiSelectCoinsDataUnitEnum;
        };
      }[];
    }
  | {
      /**
       * A delegation action.
       *
       * Pool id is only required for "join".
       */
      delegation_action: {
        action: ApiSelectCoinsDataActionEnum;
        /**
         * A unique identifier for the pool.
         * @format hex|bech32
         * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
         */
        pool?: string;
      };
    };

export interface ApiByronSelectCoinsData {
  /**
   * A list of target outputs
   * @minItems 0
   */
  payments: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiByronSelectCoinsDataUnitEnum;
    };
  }[];
}

export interface ApiCoinSelection {
  /**
   * A list of transaction inputs
   * @minItems 1
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiCoinSelectionUnitEnum;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /**
     * A path for deriving a child key from a parent key.
     * @minItems 1
     */
    derivation_path: string[];
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiCoinSelectionUnitEnum1;
    };
  }[];
  /**
   * A list of transaction change outputs.
   * @minItems 0
   */
  change: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiCoinSelectionUnitEnum2;
    };
    /**
     * A path for deriving a child key from a parent key.
     * @minItems 1
     */
    derivation_path: string[];
  }[];
  certificates?: {
    certificate_type: ApiCoinSelectionCertificateTypeEnum;
    /**
     * A unique identifier for the pool.
     * @format hex|bech32
     * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
     */
    pool?: string;
    /**
     * @maxItems 5
     * @minItems 5
     */
    reward_account_path: string[];
  }[];
}

/**
 * Gives an indication if metadata GC checking for delisted pools
 * has run and if so, when.
 *
 * Possible values are:
 *   - not_applicable -> we're currently not querying a SMASH server for metadata
 *   - not_started -> the GC hasn't started yet, try again in a short while
 *   - restarting -> the GC thread is currently restarting, try again in short while
 *   - has_run -> the GC has run successfully
 *
 * When 'status' is 'restarting' or 'has_run' then the field 'last_run'
 * is set to the last GC time in UTC.
 */
export interface ApiGCStatus {
  status: ApiGcStatusStatusEnum;
  /**
   * @format iso-8601-date-and-time
   * @example "2019-02-27T14:46:45Z"
   */
  last_run?: string;
}

/**
 * The maintenance action to carry out, current values are
 *   - gc_stake_pools -> trigger looking up delisted pools from the remote SMASH server
 */
export interface ApiMaintenanceActionPostData {
  maintenance_action: ApiMaintenanceActionPostDataMaintenanceActionEnum;
}

export interface ApiMaintenanceAction {
  /**
   * Gives an indication if metadata GC checking for delisted pools
   * has run and if so, when.
   *
   * Possible values are:
   *   - not_applicable -> we're currently not querying a SMASH server for metadata
   *   - not_started -> the GC hasn't started yet, try again in a short while
   *   - restarting -> the GC thread is currently restarting, try again in short while
   *   - has_run -> the GC has run successfully
   *
   * When 'status' is 'restarting' or 'has_run' then the field 'last_run'
   * is set to the last GC time in UTC.
   */
  gc_stake_pools: {
    status: ApiMaintenanceActionStatusEnum;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_run?: string;
  };
}

export interface ApiStakePool {
  /**
   * A unique identifier for the pool.
   * @format hex|bech32
   * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
   */
  id: string;
  metrics: {
    /**
     * The rewards the wallet can expect to receive at the end of an epoch, in the long term, if delegating to
     * this pool.
     *
     * For more details, see the
     * [Design Specification for Delegation and Incentives in Cardano](https://hydra.iohk.io/job/Cardano/cardano-ledger-specs/delegationDesignSpec/latest/download-by-type/doc-pdf/delegation_design_spec)
     * document.
     */
    non_myopic_member_rewards: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiStakePoolUnitEnum;
    };
    /**
     * The live pool stake relative to the *total* stake.
     *
     * For more details, see the section "Relative Stake: Active vs Total" in
     * [Design Specification for Delegation and Incentives in Cardano](https://hydra.iohk.io/job/Cardano/cardano-ledger-specs/delegationDesignSpec/latest/download-by-type/doc-pdf/delegation_design_spec).
     */
    relative_stake: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: ApiStakePoolUnitEnum1;
    };
    /**
     * Saturation-level of the pool based on the desired number of pools aimed by the network.
     * A value above `1` indicates that the pool is saturated.
     *
     * The `non_myopic_member_rewards` take oversaturation into account, as specified by the [specs](https://hydra.iohk.io/job/Cardano/cardano-ledger-specs/delegationDesignSpec/latest/download-by-type/doc-pdf/delegation_design_spec).
     *
     * The saturation is based on the live `relative_stake`. The saturation at the end of epoch e,
     * will affect the rewards paid out at the end of epoch e+3.
     * @min 0
     * @example 0.74
     */
    saturation: number;
    /** Number of blocks produced by a given stake pool in its lifetime. */
    produced_blocks: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ApiStakePoolUnitEnum2;
    };
  };
  /**
   * Estimated cost set by the pool operator when registering his pool.
   * This fixed cost is taken from each reward earned by the pool before splitting rewards between stakeholders.
   *
   * May be omitted if the wallet hasn't found the pool's registration cerificate yet.
   */
  cost: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ApiStakePoolUnitEnum3;
  };
  /**
   * Variable margin on the total reward given to an operator before splitting rewards between stakeholders.
   *
   * May be omitted if the wallet hasn't found the pool's registration cerificate yet.
   */
  margin: {
    /**
     * @min 0
     * @max 100
     * @example 42
     */
    quantity: number;
    unit: ApiStakePoolUnitEnum4;
  };
  /**
   * Minimal stake amount that a stake pool is willing to honor.
   *
   * May be omitted if the wallet hasn't found the pool's registration cerificate yet.
   */
  pledge: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ApiStakePoolUnitEnum5;
  };
  /** Information about the stake pool. */
  metadata?: {
    /**
     * @minLength 3
     * @maxLength 5
     * @example "IOHK"
     */
    ticker: string;
    /**
     * @minLength 1
     * @maxLength 50
     */
    name: string;
    /** @maxLength 255 */
    description?: string;
    /**
     * @format uri
     * @example "https://iohk.io"
     */
    homepage: string;
  };
  /**
   * The epoch in which a stake pool retires.
   *
   * May be omitted if the wallet hasn't yet found a retirement certificate
   * for this stake pool.
   */
  retirement?: {
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    epoch_start_time: string;
  };
  /**
   * Various flags applicable to stake pools. Possible flags:
   *
   * | flag     | description                                                                                                      |
   * | ---      | ---                                                                                                              |
   * | delisted | The pool is marked as delisted on a configured SMASH server; metadata for this pool have therefore been dropped. |
   */
  flags: ApiStakePoolFlagsEnum[];
}

export interface ApiFee {
  /** Coins, in Lovelace */
  estimated_min: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ApiFeeUnitEnum;
  };
  /** Coins, in Lovelace */
  estimated_max: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ApiFeeUnitEnum1;
  };
}

export interface ApiPutAddressesData {
  /**
   * The imported addresses.
   * @minItems 1
   */
  addresses: string[];
}

/**
 * @format bech32
 * @pattern ^((addr_vk)|(stake_vk)|(script_vk))1[0-9a-z]*$
 */
export type ApiVerificationKey = string;

export interface ApiTxId {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
}

export interface ApiTransaction {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
  /** Coins, in Lovelace */
  amount: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ApiTransactionUnitEnum;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Absolute time at which the transaction was inserted in a block.
   */
  inserted_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ApiTransactionUnitEnum1;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending OR status == expired
   * </span><br/>
   * Absolute time and slot at which the pending transaction TTL (time to live) will lapse.
   */
  expires_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending
   * </span><br/>
   * The point in time at which a transaction became pending.
   */
  pending_since?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ApiTransactionUnitEnum2;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Current depth of the transaction in the local chain
   */
  depth?: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: ApiTransactionUnitEnum3;
  };
  direction: ApiTransactionDirectionEnum;
  /**
   * A list of transaction inputs
   * @minItems 0
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address?: string;
    /** Coins, in Lovelace */
    amount?: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiTransactionUnitEnum4;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiTransactionUnitEnum5;
    };
  }[];
  /**
   * A list of withdrawals from stake addresses.
   * @minItems 0
   */
  withdrawals: {
    /**
     * @format bech32
     * @example "stake1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2x"
     */
    stake_address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiTransactionUnitEnum6;
    };
  }[];
  /**
   * Current transaction status.
   *
   *   ```
   *          *---------*          *-----------*
   *          |         |---------->  EXPIRED  |
   *          |         |  (ttl)   *-----------*
   *   -------> PENDING |
   *          |         <----------------*
   *          |         |                |
   *          *---------*            (rollback)
   *               |                     |
   *          (in ledger)          *-----------*
   *               |               |           |
   *               *---------------> IN_LEDGER |
   *                               |           |
   *                               *-----------*
   *   ```
   */
  status: ApiTransactionStatusEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
}

/**
 * Next delegation status becomes active at the start of the second epoch after the corresponding delegation certificate was discovered. The exact moment is specified by changes_at
 * @example {"status":"not_delegating","changes_at":{"epoch_number":14,"epoch_start_time":"2020-01-22T10:06:39.037Z"}}
 */
export interface ApiWalletDelegationNext {
  status: ApiWalletDelegationNextStatusEnum;
  /**
   * A unique Stake-Pool identifier (present only if status = `delegating`)
   * @format hex|bech32
   * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
   */
  target?: string;
  changes_at: {
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    epoch_start_time: string;
  };
}

/** Delegation settings */
export interface ApiWalletDelegation {
  /**
   * Currently active delegation status.
   * @example {"status":"delegating","target":"1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"}
   */
  active: {
    status: ApiWalletDelegationStatusEnum;
    /**
     * A unique Stake-Pool identifier (present only if status = `delegating`)
     * @format hex|bech32
     * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
     */
    target?: string;
  };
  next: {
    status: ApiWalletDelegationStatusEnum1;
    /**
     * A unique Stake-Pool identifier (present only if status = `delegating`)
     * @format hex|bech32
     * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
     */
    target?: string;
    changes_at: {
      /**
       * An epoch is a time period which is divided into slots.
       * @min 0
       * @example 14
       */
      epoch_number: number;
      /**
       * @format iso-8601-date-and-time
       * @example "2019-02-27T14:46:45Z"
       */
      epoch_start_time: string;
    };
  }[];
}

export interface ApiWallet {
  /**
   * A unique identifier for the wallet
   * @format hex
   * @minLength 40
   * @maxLength 40
   * @example "2512a00e9653fe49a44a5886202e24d77eeb998f"
   */
  id: string;
  /**
   * Number of consecutive unused addresses allowed.
   *
   * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
   * your wallet in a different software which is strictly following BIP-44.
   *
   * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
   * @min 10
   * @max 100000
   * @default 20
   * @example 20
   */
  address_pool_gap: number;
  /** Wallet current balance(s) */
  balance: {
    /** Available UTxO balance (funds that can be spent without condition). */
    available: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiWalletUnitEnum;
    };
    /** The balance of the reward account for this wallet. */
    reward: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiWalletUnitEnum1;
    };
    /** Total balance (available balance plus pending change and reward balance). */
    total: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiWalletUnitEnum2;
    };
  };
  /** Delegation settings */
  delegation: {
    /**
     * Currently active delegation status.
     * @example {"status":"delegating","target":"1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"}
     */
    active: {
      status: ApiWalletStatusEnum;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
    };
    next: {
      status: ApiWalletStatusEnum1;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
      changes_at: {
        /**
         * An epoch is a time period which is divided into slots.
         * @min 0
         * @example 14
         */
        epoch_number: number;
        /**
         * @format iso-8601-date-and-time
         * @example "2019-02-27T14:46:45Z"
         */
        epoch_start_time: string;
      };
    }[];
  };
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /** Information about the wallet's passphrase */
  passphrase?: {
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_updated_at: string;
  };
  /**
   * Whether a wallet is ready to use or still syncing
   * @example {"status":"ready"}
   */
  state: {
    status: ApiWalletStatusEnum2;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: ApiWalletUnitEnum3;
    };
  };
  /** A reference to a particular time slot, and the block height at that point. */
  tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ApiWalletUnitEnum4;
    };
  };
}

export interface ApiByronWallet {
  /**
   * A unique identifier for the wallet
   * @format hex
   * @minLength 40
   * @maxLength 40
   * @example "2512a00e9653fe49a44a5886202e24d77eeb998f"
   */
  id: string;
  /** Byron wallet's current balance(s) */
  balance: {
    /** Available balance (funds that can be spent) */
    available: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiByronWalletUnitEnum;
    };
    /** Total balance (available balance plus pending change) */
    total: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiByronWalletUnitEnum1;
    };
  };
  /**
   * Mechanism used for discovering addresses.
   * @example "sequential"
   */
  discovery: ApiByronWalletDiscoveryEnum;
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /** Information about the wallet's passphrase */
  passphrase?: {
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_updated_at: string;
  };
  /**
   * Whether a wallet is ready to use or still syncing
   * @example {"status":"ready"}
   */
  state: {
    status: ApiByronWalletStatusEnum;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: ApiByronWalletUnitEnum2;
    };
  };
  /** A reference to a particular time slot, and the block height at that point. */
  tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ApiByronWalletUnitEnum3;
    };
  };
}

export interface ApiWalletMigrationInfo {
  /** Total amount which will be paid as fees for the migration. */
  migration_cost: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ApiWalletMigrationInfoUnitEnum;
  };
  /** Leftovers dust coins which won't be migrated nor spent as fees. */
  leftovers: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ApiWalletMigrationInfoUnitEnum1;
  };
}

export interface ApiWalletPassphrase {
  /**
   * The source Byron wallet's master passphrase.
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
}

export interface ApiByronWalletMigrationPostData {
  /**
   * The wallet's master passphrase.
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * The recipient addresses.
   * @minItems 1
   */
  addresses: string[];
}

export interface ApiShelleyWalletMigrationPostData {
  /**
   * The wallet's master passphrase.
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * The recipient addresses.
   * @minItems 1
   */
  addresses: string[];
}

/** @example {"total":{"quantity":42000000,"unit":"lovelace"},"scale":"log10","distribution":{"10":1,"100":0,"1000":8,"10000":14,"100000":32,"1000000":3,"10000000":0,"100000000":12,"1000000000":0,"10000000000":0,"100000000000":0,"1000000000000":0,"10000000000000":0,"100000000000000":0,"1000000000000000":0,"10000000000000000":0,"45000000000000000":0}} */
export interface ApiWalletUTxOsStatistics {
  /** Coins, in Lovelace */
  total: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ApiWalletUTxOsStatisticsUnitEnum;
  };
  scale: ApiWalletUTxOsStatisticsScaleEnum;
  distribution: Record<string, number>;
}

/** Restore from root private key */
export interface ApiWalletPostData {
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /**
   * A list of mnemonic words
   * @maxItems 24
   * @minItems 15
   * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
   */
  mnemonic_sentence: string[];
  /**
   * An optional passphrase used to encrypt the mnemonic sentence.
   * @maxItems 12
   * @minItems 9
   * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become"]
   */
  mnemonic_second_factor?: string[];
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * Number of consecutive unused addresses allowed.
   *
   * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
   * your wallet in a different software which is strictly following BIP-44.
   *
   * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
   * @min 10
   * @max 100000
   * @default 20
   * @example 20
   */
  address_pool_gap?: number;
}

/** Restore from account public key */
export interface ApiAccountPostData {
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /**
   * An extended account public key (public key + chain code)
   * @format hex
   * @minLength 128
   * @maxLength 128
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db11423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  account_public_key: string;
  /**
   * Number of consecutive unused addresses allowed.
   *
   * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
   * your wallet in a different software which is strictly following BIP-44.
   *
   * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
   * @min 10
   * @max 100000
   * @default 20
   * @example 20
   */
  address_pool_gap?: number;
}

/** Restore from root private key */
export type ApiWalletOrAccountPostData =
  | {
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A list of mnemonic words
       * @maxItems 24
       * @minItems 15
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      mnemonic_sentence: string[];
      /**
       * An optional passphrase used to encrypt the mnemonic sentence.
       * @maxItems 12
       * @minItems 9
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become"]
       */
      mnemonic_second_factor?: string[];
      /**
       * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
       * @minLength 10
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * Number of consecutive unused addresses allowed.
       *
       * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
       * your wallet in a different software which is strictly following BIP-44.
       *
       * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
       * @min 10
       * @max 100000
       * @default 20
       * @example 20
       */
      address_pool_gap?: number;
    }
  | {
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * An extended account public key (public key + chain code)
       * @format hex
       * @minLength 128
       * @maxLength 128
       * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db11423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
       */
      account_public_key: string;
      /**
       * Number of consecutive unused addresses allowed.
       *
       * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
       * your wallet in a different software which is strictly following BIP-44.
       *
       * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
       * @min 10
       * @max 100000
       * @default 20
       * @example 20
       */
      address_pool_gap?: number;
    };

export interface ApiWalletSignData {
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata: Record<string, TransactionMetadataValue>;
}

/** Leaf value for a script designating a required verification key hash. */
export type ApiScript =
  | string
  | {
      /**
       * Script primitive for which all signing keys corresponding to all list elements' verification keys are expected to make the script valid.
       * @minItems 1
       */
      all: ScriptValue[];
    }
  | {
      /**
       * Script primitive for which a signing key corresponding to any of the list elements' verification keys is expected to make the script valid. It is equivalent to `some` with `"at_least"=1`.
       * @minItems 1
       */
      any: ScriptValue[];
    }
  | {
      /** Script primitive for which at least a given number of signing keys corresponding to the list elements' verification keys are expected to make the script valid. */
      some: {
        /** @min 1 */
        at_least: number;
        /** @minItems 1 */
        from: ScriptValue[];
      };
    };

/**
 * A public key (public key without chain code) for credential - 32 bytes
 * @format bech32
 * @pattern ^((addr_vk)|(stake_vk))1[0-9a-z]*$
 * @example ["stake_vk16apaenn9ut6s40lcw3l8v68xawlrlq20z2966uzcx8jmv2q9uy7qau558d","addr_vk16apaenn9ut6s40lcw3l8v68xawlrlq20z2966uzcx8jmv2q9uy7q3yvuv2"]
 */
export type ApiPubKey = string;

export interface AnyAddress {
  /**
   * A Shelley address representing either enterprise, reward account or delegating address
   * @format bech32
   * @pattern ^((addr)|(stake)|(addr_test)|(stake_test))1[0-9a-z]*$
   * @example ["stake17xt2z3pa7etaxp7jurdg0m8jhsmtp4r2z56pd3a5q3jhxycdxzmx9","addr1wy5np0m5x03tax3kcdh6e2cet98qcfs80wtv4cyvl5taclc6dnd8e","addr1xy5np0m5x03tax3kcdh6e2cet98qcfs80wtv4cyvl5tacluk59zrmajh6vra9cx6slk090pkkr2x59f5zmrmgpr9wvfs37hjk4"]
   */
  address: string;
}

/**
 * A public key (public key without chain code) for credential - 32 bytes
 * @example {"any":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms",{"all":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms"]},{"any":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms",{"all":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms"]}]},{"some":{"at_least":2,"from":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt38ms"]}}]}
 */
export type ApiCredential =
  | string
  | (
      | string
      | {
          /**
           * Script primitive for which all signing keys corresponding to all list elements' verification keys are expected to make the script valid.
           * @minItems 1
           */
          all: ScriptValue[];
        }
      | {
          /**
           * Script primitive for which a signing key corresponding to any of the list elements' verification keys is expected to make the script valid. It is equivalent to `some` with `"at_least"=1`.
           * @minItems 1
           */
          any: ScriptValue[];
        }
      | {
          /** Script primitive for which at least a given number of signing keys corresponding to the list elements' verification keys are expected to make the script valid. */
          some: {
            /** @min 1 */
            at_least: number;
            /** @minItems 1 */
            from: ScriptValue[];
          };
        }
    );

export interface ApiAddressData {
  /**
   * A public key (public key without chain code) for credential - 32 bytes
   * @example {"any":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms",{"all":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms"]},{"any":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms",{"all":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms"]}]},{"some":{"at_least":2,"from":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt38ms"]}}]}
   */
  payment?:
    | string
    | (
        | string
        | {
            /**
             * Script primitive for which all signing keys corresponding to all list elements' verification keys are expected to make the script valid.
             * @minItems 1
             */
            all: ScriptValue[];
          }
        | {
            /**
             * Script primitive for which a signing key corresponding to any of the list elements' verification keys is expected to make the script valid. It is equivalent to `some` with `"at_least"=1`.
             * @minItems 1
             */
            any: ScriptValue[];
          }
        | {
            /** Script primitive for which at least a given number of signing keys corresponding to the list elements' verification keys are expected to make the script valid. */
            some: {
              /** @min 1 */
              at_least: number;
              /** @minItems 1 */
              from: ScriptValue[];
            };
          }
      );
  /**
   * A public key (public key without chain code) for credential - 32 bytes
   * @example "stake_vk16apaenn9ut6s40lcw3l8v68xawlrlq20z2966uzcx8jmv2q9uy7qau558d"
   */
  stake?:
    | string
    | (
        | string
        | {
            /**
             * Script primitive for which all signing keys corresponding to all list elements' verification keys are expected to make the script valid.
             * @minItems 1
             */
            all: ScriptValue[];
          }
        | {
            /**
             * Script primitive for which a signing key corresponding to any of the list elements' verification keys is expected to make the script valid. It is equivalent to `some` with `"at_least"=1`.
             * @minItems 1
             */
            any: ScriptValue[];
          }
        | {
            /** Script primitive for which at least a given number of signing keys corresponding to the list elements' verification keys are expected to make the script valid. */
            some: {
              /** @min 1 */
              at_least: number;
              /** @minItems 1 */
              from: ScriptValue[];
            };
          }
      );
}

export interface ApiByronWalletRandomPostData {
  style?: ApiByronWalletRandomPostDataStyleEnum;
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * A list of mnemonic words
   * @maxItems 24
   * @minItems 12
   * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
   */
  mnemonic_sentence: string[];
}

/** patate */
export interface ApiByronWalletRandomXPrvPostData {
  style?: ApiByronWalletRandomXPrvPostDataStyleEnum;
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /**
   * A root private key, encrypted using a given passphrase. The underlying key should contain:
   * - A private key
   * - A chain code
   * - A public key
   * @deprecated
   * @format hex
   * @minLength 256
   * @maxLength 256
   */
  encrypted_root_private_key: string;
  /**
   * A hash of master passphrase. The hash should be an output of a Scrypt function with the following parameters:
   * - logN = 14
   * - r = 8
   * - p = 1
   * @deprecated
   * @format hex
   * @example "31347c387c317c574342652b796362417576356c2b4258676a344a314c6343675375414c2f5653393661364e576a2b7550766655513d3d7c2f376738486c59723174734e394f6e4e753253302b6a65515a6b5437316b45414941366a515867386539493d"
   */
  passphrase_hash: string;
}

export interface ApiByronWalletIcarusPostData {
  style?: ApiByronWalletIcarusPostDataStyleEnum;
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * A list of mnemonic words
   * @maxItems 24
   * @minItems 12
   * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
   */
  mnemonic_sentence: string[];
}

export interface ApiByronWalletTrezorPostData {
  style?: ApiByronWalletTrezorPostDataStyleEnum;
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * A list of mnemonic words
   * @maxItems 24
   * @minItems 12
   * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
   */
  mnemonic_sentence: string[];
}

export interface ApiByronWalletLedgerPostData {
  style?: ApiByronWalletLedgerPostDataStyleEnum;
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * A list of mnemonic words
   * @maxItems 24
   * @minItems 12
   * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
   */
  mnemonic_sentence: string[];
}

export interface ApiWalletPutData {
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name?: string;
}

export interface ApiSettingsPutData {
  /** Settings */
  settings?: {
    /**
     * Select stake pool metadata fetching strategy:
     *   - `none` - metadata is not fetched at all,
     *   - `direct` - metadata is fetched directly URLs registered on chain,
     *   - `uri` - metadata is fetched from an external Stake-Pool Metadata Aggregation Server (SMASH)
     *
     * After update existing metadata will be dropped forcing it to re-sync automatically with the new setting.
     * @pattern ^(none|direct|https?:\/\/[a-zA-Z0-9-_~.]+(:[0-9]+)?/?)$
     * @example "https://smash.cardano-mainnet.iohk.io/"
     */
    pool_metadata_source: string;
  };
}

/**
 * A base SMASH uri without endpoint path.
 * @pattern ^https?:\/\/[a-zA-Z0-9-_~.]+(:[0-9]+)?/?$
 * @example "https://smash.cardano-mainnet.iohk.io/"
 */
export type ApiSmashServer = string;

/**
 * The status of the SMASH server. Possible values are:
 *
 * health                  | description
 * ---                     | ---
 * `"available"`           | server is awaiting your requests
 * `"unavailable"`         | server is running, but currently unavailable, try again in a short time
 * `"unreachable"`         | server could not be reached or didn't return a health status
 * `"no_smash_configured"` | SMASH is currently not configured, adjust the Settings first
 */
export interface ApiHealthCheck {
  health: ApiHealthCheckHealthEnum;
}

export interface ApiWalletPutPassphraseData {
  /**
   * The current passphrase.
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  old_passphrase: string;
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds).
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  new_passphrase: string;
}

export interface ApiByronWalletPutPassphraseData {
  /**
   * The current passphrase if present.
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  old_passphrase?: string;
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds).
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  new_passphrase: string;
}

export interface ApiPostTransactionDataByron {
  /**
   * A list of target outputs
   * @minItems 0
   */
  payments: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiPostTransactionDataByronUnitEnum;
    };
  }[];
  /**
   * The wallet's master passphrase.
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
}

export interface ApiPostTransactionData {
  /**
   * The wallet's master passphrase.
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * A list of target outputs
   * @minItems 0
   */
  payments: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiPostTransactionDataUnitEnum;
    };
  }[];
  /**
   * When provided, instruments the server to automatically withdraw rewards from the source wallet when they are deemed
   * sufficient (i.e. they contribute to the balance for at least as much as they cost).
   *
   * As a consequence, the resulting transaction may or may not have a withdrawal object. Summarizing:
   *
   * withdrawal field | reward balance | result
   * ---              | ---            | ---
   * `null`           | too small      | ✓ no withdrawals generated
   * `null`           | big enough     | ✓ no withdrawals generated
   * `"self"`         | too small      | ✓ no withdrawals generated
   * `"self"`         | big enough     | ✓ withdrawal generated
   */
  withdrawal?: ApiPostTransactionDataWithdrawalEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
  /**
   * The TTL (time to live) is the time period in which the transaction
   * will be accepted into node mempools.
   *
   * After the TTL has lapsed, the transaction is considered
   * expired. At this point, nodes will give up on broadcasting the
   * transaction, and the wallet will release the funds allocated to
   * the transaction so they can be used for other payments.
   *
   * The TTL should be long enough that the transaction has time to be
   * propagated through the network and confirmed, but short enough so
   * that - in the event of failures - UTxO are returned to the wallet
   * in a timely manner.
   *
   * The TTL value is given in seconds. It will be converted to a slot
   * number internally.
   *
   * If the TTL is not provided for a payment, a reasonable default
   * value will be used.
   */
  time_to_live?: {
    /**
     * @min 0
     * @example 10
     */
    quantity: number;
    unit: ApiPostTransactionDataUnitEnum1;
  };
}

export interface ApiPostRedemptionData {
  /**
   * The wallet's master passphrase.
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * A list of target outputs
   * @minItems 0
   */
  payments: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiPostRedemptionDataUnitEnum;
    };
  }[];
  /**
   * When provided, attempts to withdraw rewards from the default stake address corresponding to the given mnemonic.
   *
   * Should the rewards be null or too small to be worth withdrawing (i.e. the cost of adding them into the transaction
   * is more than their own intrinsic value), the server will reject the request with a `withdrawal_not_worth` error.
   *
   * withdrawal field    | reward balance | result
   * ---                 | ---            | ---
   * any recovery phrase | too small      | x Error 403 `withdrawal_not_worth`
   * any recovery phrase | big enough     | ✓ withdrawal generated
   * @maxItems 24
   * @minItems 15
   * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
   */
  withdrawal: string[];
}

export interface ApiPostTransactionFeeDataByron {
  /**
   * A list of target outputs
   * @minItems 0
   */
  payments: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiPostTransactionFeeDataByronUnitEnum;
    };
  }[];
}

export interface ApiPostTransactionFeeData {
  /**
   * A list of target outputs
   * @minItems 0
   */
  payments: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiPostTransactionFeeDataUnitEnum;
    };
  }[];
  /**
   * When provided, instruments the server to automatically withdraw rewards from the source wallet when they are deemed
   * sufficient (i.e. they contribute to the balance for at least as much as they cost).
   *
   * As a consequence, the resulting transaction may or may not have a withdrawal object. Summarizing:
   *
   * withdrawal field | reward balance | result
   * ---              | ---            | ---
   * `null`           | too small      | ✓ no withdrawals generated
   * `null`           | big enough     | ✓ no withdrawals generated
   * `"self"`         | too small      | ✓ no withdrawals generated
   * `"self"`         | big enough     | ✓ withdrawal generated
   */
  withdrawal?: ApiPostTransactionFeeDataWithdrawalEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
  /**
   * The TTL (time to live) is the time period in which the transaction
   * will be accepted into node mempools.
   *
   * After the TTL has lapsed, the transaction is considered
   * expired. At this point, nodes will give up on broadcasting the
   * transaction, and the wallet will release the funds allocated to
   * the transaction so they can be used for other payments.
   *
   * The TTL should be long enough that the transaction has time to be
   * propagated through the network and confirmed, but short enough so
   * that - in the event of failures - UTxO are returned to the wallet
   * in a timely manner.
   *
   * The TTL value is given in seconds. It will be converted to a slot
   * number internally.
   *
   * If the TTL is not provided for a payment, a reasonable default
   * value will be used.
   */
  time_to_live?: {
    /**
     * @min 0
     * @example 10
     */
    quantity: number;
    unit: ApiPostTransactionFeeDataUnitEnum1;
  };
}

export interface ApiPostRedemptionFeeData {
  /**
   * A list of target outputs
   * @minItems 0
   */
  payments: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ApiPostRedemptionFeeDataUnitEnum;
    };
  }[];
  /**
   * When provided, attempts to withdraw rewards from the default stake address corresponding to the given mnemonic.
   *
   * Should the rewards be null or too small to be worth withdrawing (i.e. the cost of adding them into the transaction
   * is more than their own intrinsic value), the server will reject the request with a `withdrawal_not_worth` error.
   *
   * withdrawal field    | reward balance | result
   * ---                 | ---            | ---
   * any recovery phrase | too small      | x Error 403 `withdrawal_not_worth`
   * any recovery phrase | big enough     | ✓ withdrawal generated
   * @maxItems 24
   * @minItems 15
   * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
   */
  withdrawal: string[];
}

export interface ApiPostRandomAddressData {
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * An address derivation index.
   * @min 0
   * @max 4294967295
   */
  address_index?: number;
}

/**
 * A public key (public key without chain code) for credential - 32 bytes
 * @example {"any":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms",{"all":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms"]},{"any":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms",{"all":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms"]}]},{"some":{"at_least":2,"from":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt38ms"]}}]}
 */
export type CredentialValue =
  | string
  | (
      | string
      | {
          /**
           * Script primitive for which all signing keys corresponding to all list elements' verification keys are expected to make the script valid.
           * @minItems 1
           */
          all: ScriptValue[];
        }
      | {
          /**
           * Script primitive for which a signing key corresponding to any of the list elements' verification keys is expected to make the script valid. It is equivalent to `some` with `"at_least"=1`.
           * @minItems 1
           */
          any: ScriptValue[];
        }
      | {
          /** Script primitive for which at least a given number of signing keys corresponding to the list elements' verification keys are expected to make the script valid. */
          some: {
            /** @min 1 */
            at_least: number;
            /** @minItems 1 */
            from: ScriptValue[];
          };
        }
    );

/** Leaf value for a script designating a required verification key hash. */
export type ScriptValue =
  | string
  | {
      /**
       * Script primitive for which all signing keys corresponding to all list elements' verification keys are expected to make the script valid.
       * @minItems 1
       */
      all: ScriptValue[];
    }
  | {
      /**
       * Script primitive for which a signing key corresponding to any of the list elements' verification keys is expected to make the script valid. It is equivalent to `some` with `"at_least"=1`.
       * @minItems 1
       */
      any: ScriptValue[];
    }
  | {
      /** Script primitive for which at least a given number of signing keys corresponding to the list elements' verification keys are expected to make the script valid. */
      some: {
        /** @min 1 */
        at_least: number;
        /** @minItems 1 */
        from: ScriptValue[];
      };
    };

export type TransactionMetadataValue =
  | {
      /** @maxLength 64 */
      string: string;
    }
  | {
      int: number;
    }
  | {
      /**
       * @maxLength 128
       * @pattern ^[0-9a-fA-F]*$
       */
      bytes: string;
    }
  | {
      list: TransactionMetadataValue[];
    }
  | {
      map: {
        k?: TransactionMetadataValue;
        v?: TransactionMetadataValue;
      }[];
    };

export interface ApiGetSettings {
  /**
   * Pool metadata source. This sets the metadata fetching strategy.
   *
   * Possible values are
   *   * none -> no fetching
   *   * direct -> direct fetching
   *   * uri -> use SMASH server
   * @pattern ^(none|direct|https?:\/\/[a-zA-Z0-9-_~.]+(:[0-9]+)?/?)$
   * @example "https://smash.cardano-mainnet.iohk.io/"
   */
  pool_metadata_source: string;
}

/** Restore from account public key */
export type SomeByronWalletPostData =
  | {
      style?: SomeByronWalletPostDataStyleEnum;
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
       * @minLength 10
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * A list of mnemonic words
       * @maxItems 24
       * @minItems 12
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      mnemonic_sentence: string[];
    }
  | {
      style?: SomeByronWalletPostDataStyleEnum1;
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
       * @minLength 10
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * A list of mnemonic words
       * @maxItems 24
       * @minItems 12
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      mnemonic_sentence: string[];
    }
  | {
      style?: SomeByronWalletPostDataStyleEnum2;
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
       * @minLength 10
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * A list of mnemonic words
       * @maxItems 24
       * @minItems 12
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      mnemonic_sentence: string[];
    }
  | {
      style?: SomeByronWalletPostDataStyleEnum3;
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
       * @minLength 10
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * A list of mnemonic words
       * @maxItems 24
       * @minItems 12
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      mnemonic_sentence: string[];
    }
  | {
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * An extended account public key (public key + chain code)
       * @format hex
       * @minLength 128
       * @maxLength 128
       * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db11423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
       */
      account_public_key: string;
      /**
       * Number of consecutive unused addresses allowed.
       *
       * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
       * your wallet in a different software which is strictly following BIP-44.
       *
       * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
       * @min 10
       * @max 100000
       * @default 20
       * @example 20
       */
      address_pool_gap?: number;
    }
  | {
      style?: SomeByronWalletPostDataStyleEnum4;
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A root private key, encrypted using a given passphrase. The underlying key should contain:
       * - A private key
       * - A chain code
       * - A public key
       * @deprecated
       * @format hex
       * @minLength 256
       * @maxLength 256
       */
      encrypted_root_private_key: string;
      /**
       * A hash of master passphrase. The hash should be an output of a Scrypt function with the following parameters:
       * - logN = 14
       * - r = 8
       * - p = 1
       * @deprecated
       * @format hex
       * @example "31347c387c317c574342652b796362417576356c2b4258676a344a314c6343675375414c2f5653393661364e576a2b7550766655513d3d7c2f376738486c59723174734e394f6e4e753253302b6a65515a6b5437316b45414941366a515867386539493d"
       */
      passphrase_hash: string;
    };

export enum ApiAddressStateEnum {
  Used = "used",
  Unused = "unused",
}

export enum ApiAddressInspectAddressStyleEnum {
  Shelley = "Shelley",
  Icarus = "Icarus",
  Byron = "Byron",
}

export enum ApiAddressInspectStakeReferenceEnum {
  None = "none",
  ByValue = "by value",
  ByPointer = "by pointer",
}

export enum ApiNetworkInformationStatusEnum {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum ApiNetworkInformationUnitEnum {
  Percent = "percent",
}

/** @example "block" */
export enum ApiNetworkInformationUnitEnum1 {
  Block = "block",
}

export enum ApiNetworkClockStatusEnum {
  Available = "available",
  Unavailable = "unavailable",
  Pending = "pending",
}

export enum ApiNetworkClockUnitEnum {
  Microsecond = "microsecond",
}

export enum ApiNetworkParametersUnitEnum {
  Second = "second",
}

export enum ApiNetworkParametersUnitEnum1 {
  Slot = "slot",
}

/** @example "block" */
export enum ApiNetworkParametersUnitEnum2 {
  Block = "block",
}

export enum ApiNetworkParametersUnitEnum3 {
  Percent = "percent",
}

export enum ApiNetworkParametersUnitEnum4 {
  Percent = "percent",
}

export enum ApiNetworkParametersUnitEnum5 {
  Lovelace = "lovelace",
}

export enum ApiSelectCoinsPaymentsUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiSelectCoinsActionActionEnum {
  Quit = "quit",
  Join = "join",
}

export enum ApiSelectCoinsDataUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiSelectCoinsDataActionEnum {
  Quit = "quit",
  Join = "join",
}

export enum ApiByronSelectCoinsDataUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiCoinSelectionUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiCoinSelectionUnitEnum1 {
  Lovelace = "lovelace",
}

export enum ApiCoinSelectionUnitEnum2 {
  Lovelace = "lovelace",
}

export enum ApiCoinSelectionCertificateTypeEnum {
  JoinPool = "join_pool",
  QuitPool = "quit_pool",
  RegisterRewardAccount = "register_reward_account",
}

export enum ApiGcStatusStatusEnum {
  NotApplicable = "not_applicable",
  NotStarted = "not_started",
  Restarting = "restarting",
  HasRun = "has_run",
}

export enum ApiMaintenanceActionPostDataMaintenanceActionEnum {
  GcStakePools = "gc_stake_pools",
}

export enum ApiMaintenanceActionStatusEnum {
  NotApplicable = "not_applicable",
  NotStarted = "not_started",
  Restarting = "restarting",
  HasRun = "has_run",
}

export enum ApiStakePoolUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiStakePoolUnitEnum1 {
  Percent = "percent",
}

/** @example "block" */
export enum ApiStakePoolUnitEnum2 {
  Block = "block",
}

export enum ApiStakePoolUnitEnum3 {
  Lovelace = "lovelace",
}

export enum ApiStakePoolUnitEnum4 {
  Percent = "percent",
}

export enum ApiStakePoolUnitEnum5 {
  Lovelace = "lovelace",
}

export enum ApiStakePoolFlagsEnum {
  Delisted = "delisted",
}

export enum ApiFeeUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiFeeUnitEnum1 {
  Lovelace = "lovelace",
}

export enum ApiTransactionUnitEnum {
  Lovelace = "lovelace",
}

/** @example "block" */
export enum ApiTransactionUnitEnum1 {
  Block = "block",
}

/** @example "block" */
export enum ApiTransactionUnitEnum2 {
  Block = "block",
}

/** @example "block" */
export enum ApiTransactionUnitEnum3 {
  Block = "block",
}

export enum ApiTransactionDirectionEnum {
  Outgoing = "outgoing",
  Incoming = "incoming",
}

export enum ApiTransactionUnitEnum4 {
  Lovelace = "lovelace",
}

export enum ApiTransactionUnitEnum5 {
  Lovelace = "lovelace",
}

export enum ApiTransactionUnitEnum6 {
  Lovelace = "lovelace",
}

/**
 * Current transaction status.
 *
 *   ```
 *          *---------*          *-----------*
 *          |         |---------->  EXPIRED  |
 *          |         |  (ttl)   *-----------*
 *   -------> PENDING |
 *          |         <----------------*
 *          |         |                |
 *          *---------*            (rollback)
 *               |                     |
 *          (in ledger)          *-----------*
 *               |               |           |
 *               *---------------> IN_LEDGER |
 *                               |           |
 *                               *-----------*
 *   ```
 */
export enum ApiTransactionStatusEnum {
  Pending = "pending",
  InLedger = "in_ledger",
  Expired = "expired",
}

export enum ApiWalletDelegationNextStatusEnum {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum ApiWalletDelegationStatusEnum {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum ApiWalletDelegationStatusEnum1 {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum ApiWalletUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiWalletUnitEnum1 {
  Lovelace = "lovelace",
}

export enum ApiWalletUnitEnum2 {
  Lovelace = "lovelace",
}

export enum ApiWalletStatusEnum {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum ApiWalletStatusEnum1 {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum ApiWalletStatusEnum2 {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum ApiWalletUnitEnum3 {
  Percent = "percent",
}

/** @example "block" */
export enum ApiWalletUnitEnum4 {
  Block = "block",
}

export enum ApiByronWalletUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiByronWalletUnitEnum1 {
  Lovelace = "lovelace",
}

/**
 * Mechanism used for discovering addresses.
 * @example "sequential"
 */
export enum ApiByronWalletDiscoveryEnum {
  Random = "random",
  Sequential = "sequential",
}

export enum ApiByronWalletStatusEnum {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum ApiByronWalletUnitEnum2 {
  Percent = "percent",
}

/** @example "block" */
export enum ApiByronWalletUnitEnum3 {
  Block = "block",
}

export enum ApiWalletMigrationInfoUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiWalletMigrationInfoUnitEnum1 {
  Lovelace = "lovelace",
}

export enum ApiWalletUTxOsStatisticsUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiWalletUTxOsStatisticsScaleEnum {
  Log10 = "log10",
}

export enum ApiByronWalletRandomPostDataStyleEnum {
  Random = "random",
}

export enum ApiByronWalletRandomXPrvPostDataStyleEnum {
  Random = "random",
}

export enum ApiByronWalletIcarusPostDataStyleEnum {
  Icarus = "icarus",
}

export enum ApiByronWalletTrezorPostDataStyleEnum {
  Trezor = "trezor",
}

export enum ApiByronWalletLedgerPostDataStyleEnum {
  Ledger = "ledger",
}

export enum ApiHealthCheckHealthEnum {
  Available = "available",
  Unavailable = "unavailable",
  Unreachable = "unreachable",
  NoSmashConfigured = "no_smash_configured",
}

export enum ApiPostTransactionDataByronUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiPostTransactionDataUnitEnum {
  Lovelace = "lovelace",
}

/**
 * When provided, instruments the server to automatically withdraw rewards from the source wallet when they are deemed
 * sufficient (i.e. they contribute to the balance for at least as much as they cost).
 *
 * As a consequence, the resulting transaction may or may not have a withdrawal object. Summarizing:
 *
 * withdrawal field | reward balance | result
 * ---              | ---            | ---
 * `null`           | too small      | ✓ no withdrawals generated
 * `null`           | big enough     | ✓ no withdrawals generated
 * `"self"`         | too small      | ✓ no withdrawals generated
 * `"self"`         | big enough     | ✓ withdrawal generated
 */
export enum ApiPostTransactionDataWithdrawalEnum {
  Self = "self",
}

export enum ApiPostTransactionDataUnitEnum1 {
  Second = "second",
}

export enum ApiPostRedemptionDataUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiPostTransactionFeeDataByronUnitEnum {
  Lovelace = "lovelace",
}

export enum ApiPostTransactionFeeDataUnitEnum {
  Lovelace = "lovelace",
}

/**
 * When provided, instruments the server to automatically withdraw rewards from the source wallet when they are deemed
 * sufficient (i.e. they contribute to the balance for at least as much as they cost).
 *
 * As a consequence, the resulting transaction may or may not have a withdrawal object. Summarizing:
 *
 * withdrawal field | reward balance | result
 * ---              | ---            | ---
 * `null`           | too small      | ✓ no withdrawals generated
 * `null`           | big enough     | ✓ no withdrawals generated
 * `"self"`         | too small      | ✓ no withdrawals generated
 * `"self"`         | big enough     | ✓ withdrawal generated
 */
export enum ApiPostTransactionFeeDataWithdrawalEnum {
  Self = "self",
}

export enum ApiPostTransactionFeeDataUnitEnum1 {
  Second = "second",
}

export enum ApiPostRedemptionFeeDataUnitEnum {
  Lovelace = "lovelace",
}

export enum SomeByronWalletPostDataStyleEnum {
  Random = "random",
}

export enum SomeByronWalletPostDataStyleEnum1 {
  Icarus = "icarus",
}

export enum SomeByronWalletPostDataStyleEnum2 {
  Trezor = "trezor",
}

export enum SomeByronWalletPostDataStyleEnum3 {
  Ledger = "ledger",
}

export enum SomeByronWalletPostDataStyleEnum4 {
  Random = "random",
}

export enum SignMetadataCodeEnum {
  BadRequest = "bad_request",
}

export enum SignMetadataCodeEnum1 {
  NotAcceptable = "not_acceptable",
}

export interface SignMetadataPayload {
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata: Record<string, TransactionMetadataValue>;
}

export interface SignMetadataParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
  role?: RoleEnum;
  /**
   * An individual segment within a derivation path.
   * Indexes without `H` suffix are called `Soft`.
   * Indexes with `H` suffix are called `Hardened`.
   * @example "1852H"
   */
  index?: string;
}

export enum RoleEnum {
  UtxoExternal = "utxo_external",
  UtxoInternal = "utxo_internal",
  MutableAccount = "mutable_account",
  MultisigScript = "multisig_script",
}

/** @format binary */
export type SignMetadataData = File;

/** bad_request not_acceptable */
export type SignMetadataError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: SignMetadataCodeEnum;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: SignMetadataCodeEnum1;
    }
  | {
      /** A descriptive error message. */
      message: string;
      /**
       * A specific error code for this error, more precise than HTTP ones.
       * @example "an_error_code"
       */
      code: string;
    };

export enum SignMetadataParams1RoleEnum {
  UtxoExternal = "utxo_external",
  UtxoInternal = "utxo_internal",
  MutableAccount = "mutable_account",
  MultisigScript = "multisig_script",
}

export enum SignMetadataParams1Enum {
  UtxoExternal = "utxo_external",
  UtxoInternal = "utxo_internal",
  MutableAccount = "mutable_account",
  MultisigScript = "multisig_script",
}

export enum PostWalletUnitEnum {
  Lovelace = "lovelace",
}

export enum PostWalletUnitEnum1 {
  Lovelace = "lovelace",
}

export enum PostWalletUnitEnum2 {
  Lovelace = "lovelace",
}

export enum PostWalletStatusEnum {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum PostWalletStatusEnum1 {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum PostWalletStatusEnum2 {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum PostWalletUnitEnum3 {
  Percent = "percent",
}

/** @example "block" */
export enum PostWalletUnitEnum4 {
  Block = "block",
}

export enum PostWalletCodeEnum {
  BadRequest = "bad_request",
}

export enum PostWalletCodeEnum1 {
  NotAcceptable = "not_acceptable",
}

export enum PostWalletCodeEnum2 {
  WalletAlreadyExists = "wallet_already_exists",
}

export enum PostWalletCodeEnum3 {
  UnsupportedMediaType = "unsupported_media_type",
}

/** Restore from root private key */
export type PostWalletPayload =
  | {
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A list of mnemonic words
       * @maxItems 24
       * @minItems 15
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      mnemonic_sentence: string[];
      /**
       * An optional passphrase used to encrypt the mnemonic sentence.
       * @maxItems 12
       * @minItems 9
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become"]
       */
      mnemonic_second_factor?: string[];
      /**
       * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
       * @minLength 10
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * Number of consecutive unused addresses allowed.
       *
       * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
       * your wallet in a different software which is strictly following BIP-44.
       *
       * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
       * @min 10
       * @max 100000
       * @default 20
       * @example 20
       */
      address_pool_gap?: number;
    }
  | {
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * An extended account public key (public key + chain code)
       * @format hex
       * @minLength 128
       * @maxLength 128
       * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db11423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
       */
      account_public_key: string;
      /**
       * Number of consecutive unused addresses allowed.
       *
       * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
       * your wallet in a different software which is strictly following BIP-44.
       *
       * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
       * @min 10
       * @max 100000
       * @default 20
       * @example 20
       */
      address_pool_gap?: number;
    };

export interface PostWalletData {
  /**
   * A unique identifier for the wallet
   * @format hex
   * @minLength 40
   * @maxLength 40
   * @example "2512a00e9653fe49a44a5886202e24d77eeb998f"
   */
  id: string;
  /**
   * Number of consecutive unused addresses allowed.
   *
   * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
   * your wallet in a different software which is strictly following BIP-44.
   *
   * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
   * @min 10
   * @max 100000
   * @default 20
   * @example 20
   */
  address_pool_gap: number;
  /** Wallet current balance(s) */
  balance: {
    /** Available UTxO balance (funds that can be spent without condition). */
    available: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostWalletUnitEnum;
    };
    /** The balance of the reward account for this wallet. */
    reward: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostWalletUnitEnum1;
    };
    /** Total balance (available balance plus pending change and reward balance). */
    total: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostWalletUnitEnum2;
    };
  };
  /** Delegation settings */
  delegation: {
    /**
     * Currently active delegation status.
     * @example {"status":"delegating","target":"1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"}
     */
    active: {
      status: PostWalletStatusEnum;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
    };
    next: {
      status: PostWalletStatusEnum1;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
      changes_at: {
        /**
         * An epoch is a time period which is divided into slots.
         * @min 0
         * @example 14
         */
        epoch_number: number;
        /**
         * @format iso-8601-date-and-time
         * @example "2019-02-27T14:46:45Z"
         */
        epoch_start_time: string;
      };
    }[];
  };
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /** Information about the wallet's passphrase */
  passphrase?: {
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_updated_at: string;
  };
  /**
   * Whether a wallet is ready to use or still syncing
   * @example {"status":"ready"}
   */
  state: {
    status: PostWalletStatusEnum2;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: PostWalletUnitEnum3;
    };
  };
  /** A reference to a particular time slot, and the block height at that point. */
  tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: PostWalletUnitEnum4;
    };
  };
}

/** bad_request not_acceptable wallet_already_exists unsupported_media_type */
export type PostWalletError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PostWalletCodeEnum;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PostWalletCodeEnum1;
    }
  | {
      /** May occur when a otherwise valid request would yield a wallet that already exists. */
      message: string;
      code: PostWalletCodeEnum2;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: PostWalletCodeEnum3;
    };

export enum ListWalletsUnitEnum {
  Lovelace = "lovelace",
}

export enum ListWalletsUnitEnum1 {
  Lovelace = "lovelace",
}

export enum ListWalletsUnitEnum2 {
  Lovelace = "lovelace",
}

export enum ListWalletsStatusEnum {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum ListWalletsStatusEnum1 {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum ListWalletsStatusEnum2 {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum ListWalletsUnitEnum3 {
  Percent = "percent",
}

/** @example "block" */
export enum ListWalletsUnitEnum4 {
  Block = "block",
}

export enum ListWalletsCodeEnum {
  NotAcceptable = "not_acceptable",
}

export type ListWalletsData = {
  /**
   * A unique identifier for the wallet
   * @format hex
   * @minLength 40
   * @maxLength 40
   * @example "2512a00e9653fe49a44a5886202e24d77eeb998f"
   */
  id: string;
  /**
   * Number of consecutive unused addresses allowed.
   *
   * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
   * your wallet in a different software which is strictly following BIP-44.
   *
   * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
   * @min 10
   * @max 100000
   * @default 20
   * @example 20
   */
  address_pool_gap: number;
  /** Wallet current balance(s) */
  balance: {
    /** Available UTxO balance (funds that can be spent without condition). */
    available: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListWalletsUnitEnum;
    };
    /** The balance of the reward account for this wallet. */
    reward: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListWalletsUnitEnum1;
    };
    /** Total balance (available balance plus pending change and reward balance). */
    total: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListWalletsUnitEnum2;
    };
  };
  /** Delegation settings */
  delegation: {
    /**
     * Currently active delegation status.
     * @example {"status":"delegating","target":"1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"}
     */
    active: {
      status: ListWalletsStatusEnum;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
    };
    next: {
      status: ListWalletsStatusEnum1;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
      changes_at: {
        /**
         * An epoch is a time period which is divided into slots.
         * @min 0
         * @example 14
         */
        epoch_number: number;
        /**
         * @format iso-8601-date-and-time
         * @example "2019-02-27T14:46:45Z"
         */
        epoch_start_time: string;
      };
    }[];
  };
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /** Information about the wallet's passphrase */
  passphrase?: {
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_updated_at: string;
  };
  /**
   * Whether a wallet is ready to use or still syncing
   * @example {"status":"ready"}
   */
  state: {
    status: ListWalletsStatusEnum2;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: ListWalletsUnitEnum3;
    };
  };
  /** A reference to a particular time slot, and the block height at that point. */
  tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ListWalletsUnitEnum4;
    };
  };
}[];

/** not_acceptable */
export type ListWalletsError = {
  /** May occur when providing an invalid 'Accept' header. */
  message: string;
  code: ListWalletsCodeEnum;
};

export enum GetUTxOsStatisticsUnitEnum {
  Lovelace = "lovelace",
}

export enum GetUTxOsStatisticsScaleEnum {
  Log10 = "log10",
}

export enum GetUTxOsStatisticsCodeEnum {
  NoSuchWallet = "no_such_wallet",
}

export enum GetUTxOsStatisticsCodeEnum1 {
  NotAcceptable = "not_acceptable",
}

export interface GetUTxOsStatisticsParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

/** @example {"total":{"quantity":42000000,"unit":"lovelace"},"scale":"log10","distribution":{"10":1,"100":0,"1000":8,"10000":14,"100000":32,"1000000":3,"10000000":0,"100000000":12,"1000000000":0,"10000000000":0,"100000000000":0,"1000000000000":0,"10000000000000":0,"100000000000000":0,"1000000000000000":0,"10000000000000000":0,"45000000000000000":0}} */
export interface GetUTxOsStatisticsData {
  /** Coins, in Lovelace */
  total: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: GetUTxOsStatisticsUnitEnum;
  };
  scale: GetUTxOsStatisticsScaleEnum;
  distribution: Record<string, number>;
}

/** no_such_wallet not_acceptable */
export type GetUTxOsStatisticsError =
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: GetUTxOsStatisticsCodeEnum;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: GetUTxOsStatisticsCodeEnum1;
    };

export enum GetWalletUnitEnum {
  Lovelace = "lovelace",
}

export enum GetWalletUnitEnum1 {
  Lovelace = "lovelace",
}

export enum GetWalletUnitEnum2 {
  Lovelace = "lovelace",
}

export enum GetWalletStatusEnum {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum GetWalletStatusEnum1 {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum GetWalletStatusEnum2 {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum GetWalletUnitEnum3 {
  Percent = "percent",
}

/** @example "block" */
export enum GetWalletUnitEnum4 {
  Block = "block",
}

export enum GetWalletCodeEnum {
  BadRequest = "bad_request",
}

export enum GetWalletCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum GetWalletCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export interface GetWalletParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface GetWalletData {
  /**
   * A unique identifier for the wallet
   * @format hex
   * @minLength 40
   * @maxLength 40
   * @example "2512a00e9653fe49a44a5886202e24d77eeb998f"
   */
  id: string;
  /**
   * Number of consecutive unused addresses allowed.
   *
   * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
   * your wallet in a different software which is strictly following BIP-44.
   *
   * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
   * @min 10
   * @max 100000
   * @default 20
   * @example 20
   */
  address_pool_gap: number;
  /** Wallet current balance(s) */
  balance: {
    /** Available UTxO balance (funds that can be spent without condition). */
    available: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: GetWalletUnitEnum;
    };
    /** The balance of the reward account for this wallet. */
    reward: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: GetWalletUnitEnum1;
    };
    /** Total balance (available balance plus pending change and reward balance). */
    total: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: GetWalletUnitEnum2;
    };
  };
  /** Delegation settings */
  delegation: {
    /**
     * Currently active delegation status.
     * @example {"status":"delegating","target":"1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"}
     */
    active: {
      status: GetWalletStatusEnum;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
    };
    next: {
      status: GetWalletStatusEnum1;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
      changes_at: {
        /**
         * An epoch is a time period which is divided into slots.
         * @min 0
         * @example 14
         */
        epoch_number: number;
        /**
         * @format iso-8601-date-and-time
         * @example "2019-02-27T14:46:45Z"
         */
        epoch_start_time: string;
      };
    }[];
  };
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /** Information about the wallet's passphrase */
  passphrase?: {
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_updated_at: string;
  };
  /**
   * Whether a wallet is ready to use or still syncing
   * @example {"status":"ready"}
   */
  state: {
    status: GetWalletStatusEnum2;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: GetWalletUnitEnum3;
    };
  };
  /** A reference to a particular time slot, and the block height at that point. */
  tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: GetWalletUnitEnum4;
    };
  };
}

/** bad_request no_such_wallet not_acceptable */
export type GetWalletError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: GetWalletCodeEnum;
    }
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: GetWalletCodeEnum1;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: GetWalletCodeEnum2;
    };

export enum DeleteWalletCodeEnum {
  BadRequest = "bad_request",
}

export enum DeleteWalletCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum DeleteWalletCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export interface DeleteWalletParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export type DeleteWalletData = any;

/** bad_request no_such_wallet not_acceptable */
export type DeleteWalletError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: DeleteWalletCodeEnum;
    }
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: DeleteWalletCodeEnum1;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: DeleteWalletCodeEnum2;
    };

export enum PutWalletUnitEnum {
  Lovelace = "lovelace",
}

export enum PutWalletUnitEnum1 {
  Lovelace = "lovelace",
}

export enum PutWalletUnitEnum2 {
  Lovelace = "lovelace",
}

export enum PutWalletStatusEnum {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum PutWalletStatusEnum1 {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum PutWalletStatusEnum2 {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum PutWalletUnitEnum3 {
  Percent = "percent",
}

/** @example "block" */
export enum PutWalletUnitEnum4 {
  Block = "block",
}

export enum PutWalletCodeEnum {
  BadRequest = "bad_request",
}

export enum PutWalletCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum PutWalletCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export enum PutWalletCodeEnum3 {
  UnsupportedMediaType = "unsupported_media_type",
}

export interface PutWalletPayload {
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name?: string;
}

export interface PutWalletParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface PutWalletData {
  /**
   * A unique identifier for the wallet
   * @format hex
   * @minLength 40
   * @maxLength 40
   * @example "2512a00e9653fe49a44a5886202e24d77eeb998f"
   */
  id: string;
  /**
   * Number of consecutive unused addresses allowed.
   *
   * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
   * your wallet in a different software which is strictly following BIP-44.
   *
   * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
   * @min 10
   * @max 100000
   * @default 20
   * @example 20
   */
  address_pool_gap: number;
  /** Wallet current balance(s) */
  balance: {
    /** Available UTxO balance (funds that can be spent without condition). */
    available: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PutWalletUnitEnum;
    };
    /** The balance of the reward account for this wallet. */
    reward: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PutWalletUnitEnum1;
    };
    /** Total balance (available balance plus pending change and reward balance). */
    total: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PutWalletUnitEnum2;
    };
  };
  /** Delegation settings */
  delegation: {
    /**
     * Currently active delegation status.
     * @example {"status":"delegating","target":"1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"}
     */
    active: {
      status: PutWalletStatusEnum;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
    };
    next: {
      status: PutWalletStatusEnum1;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
      changes_at: {
        /**
         * An epoch is a time period which is divided into slots.
         * @min 0
         * @example 14
         */
        epoch_number: number;
        /**
         * @format iso-8601-date-and-time
         * @example "2019-02-27T14:46:45Z"
         */
        epoch_start_time: string;
      };
    }[];
  };
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /** Information about the wallet's passphrase */
  passphrase?: {
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_updated_at: string;
  };
  /**
   * Whether a wallet is ready to use or still syncing
   * @example {"status":"ready"}
   */
  state: {
    status: PutWalletStatusEnum2;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: PutWalletUnitEnum3;
    };
  };
  /** A reference to a particular time slot, and the block height at that point. */
  tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: PutWalletUnitEnum4;
    };
  };
}

/** bad_request no_such_wallet not_acceptable unsupported_media_type */
export type PutWalletError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PutWalletCodeEnum;
    }
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: PutWalletCodeEnum1;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PutWalletCodeEnum2;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: PutWalletCodeEnum3;
    };

export enum PutWalletPassphraseCodeEnum {
  BadRequest = "bad_request",
}

export enum PutWalletPassphraseCodeEnum1 {
  NoRootKey = "no_root_key",
}

export enum PutWalletPassphraseCodeEnum2 {
  WrongEncryptionPassphrase = "wrong_encryption_passphrase",
}

export enum PutWalletPassphraseCodeEnum3 {
  NoSuchWallet = "no_such_wallet",
}

export enum PutWalletPassphraseCodeEnum4 {
  NotAcceptable = "not_acceptable",
}

export enum PutWalletPassphraseCodeEnum5 {
  UnsupportedMediaType = "unsupported_media_type",
}

export interface PutWalletPassphrasePayload {
  /**
   * The current passphrase.
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  old_passphrase: string;
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds).
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  new_passphrase: string;
}

export interface PutWalletPassphraseParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export type PutWalletPassphraseData = any;

/** bad_request no_such_wallet not_acceptable unsupported_media_type */
export type PutWalletPassphraseError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PutWalletPassphraseCodeEnum;
    }
  | (
      | {
          /** May occur when an action require a signing key but the wallet has only access to verification keys. */
          message: string;
          code: PutWalletPassphraseCodeEnum1;
        }
      | {
          /** May occur when the given spending passphrase is wrong. */
          message: string;
          code: PutWalletPassphraseCodeEnum2;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: PutWalletPassphraseCodeEnum3;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PutWalletPassphraseCodeEnum4;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: PutWalletPassphraseCodeEnum5;
    };

export enum PostTransactionFeeUnitEnum {
  Lovelace = "lovelace",
}

export enum PostTransactionFeeUnitEnum1 {
  Lovelace = "lovelace",
}

export enum PostTransactionFeeCodeEnum {
  BadRequest = "bad_request",
}

export enum PostTransactionFeeCodeEnum1 {
  InvalidWalletType = "invalid_wallet_type",
}

export enum PostTransactionFeeCodeEnum2 {
  AlreadyWithdrawing = "already_withdrawing",
}

export enum PostTransactionFeeCodeEnum3 {
  UtxoTooSmall = "utxo_too_small",
}

export enum PostTransactionFeeCodeEnum4 {
  CannotCoverFee = "cannot_cover_fee",
}

export enum PostTransactionFeeCodeEnum5 {
  NotEnoughMoney = "not_enough_money",
}

export enum PostTransactionFeeCodeEnum6 {
  InputsDepleted = "inputs_depleted",
}

export enum PostTransactionFeeCodeEnum7 {
  InvalidCoinSelection = "invalid_coin_selection",
}

export enum PostTransactionFeeCodeEnum8 {
  TransactionIsTooBig = "transaction_is_too_big",
}

export enum PostTransactionFeeCodeEnum9 {
  NoSuchWallet = "no_such_wallet",
}

export enum PostTransactionFeeCodeEnum10 {
  NotAcceptable = "not_acceptable",
}

export enum PostTransactionFeeCodeEnum11 {
  UnsupportedMediaType = "unsupported_media_type",
}

export enum PostTransactionFeeUnitEnum2 {
  Lovelace = "lovelace",
}

/**
 * When provided, instruments the server to automatically withdraw rewards from the source wallet when they are deemed
 * sufficient (i.e. they contribute to the balance for at least as much as they cost).
 *
 * As a consequence, the resulting transaction may or may not have a withdrawal object. Summarizing:
 *
 * withdrawal field | reward balance | result
 * ---              | ---            | ---
 * `null`           | too small      | ✓ no withdrawals generated
 * `null`           | big enough     | ✓ no withdrawals generated
 * `"self"`         | too small      | ✓ no withdrawals generated
 * `"self"`         | big enough     | ✓ withdrawal generated
 */
export enum PostTransactionFeeWithdrawalEnum {
  Self = "self",
}

export enum PostTransactionFeeUnitEnum3 {
  Second = "second",
}

export enum PostTransactionFeeUnitEnum4 {
  Lovelace = "lovelace",
}

export type PostTransactionFeePayload =
  | {
      /**
       * A list of target outputs
       * @minItems 0
       */
      payments: {
        /**
         * @format base58|bech32
         * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
         */
        address: string;
        /** Coins, in Lovelace */
        amount: {
          /**
           * @min 0
           * @example 42000000
           */
          quantity: number;
          unit: PostTransactionFeeUnitEnum2;
        };
      }[];
      /**
       * When provided, instruments the server to automatically withdraw rewards from the source wallet when they are deemed
       * sufficient (i.e. they contribute to the balance for at least as much as they cost).
       *
       * As a consequence, the resulting transaction may or may not have a withdrawal object. Summarizing:
       *
       * withdrawal field | reward balance | result
       * ---              | ---            | ---
       * `null`           | too small      | ✓ no withdrawals generated
       * `null`           | big enough     | ✓ no withdrawals generated
       * `"self"`         | too small      | ✓ no withdrawals generated
       * `"self"`         | big enough     | ✓ withdrawal generated
       */
      withdrawal?: PostTransactionFeeWithdrawalEnum;
      /**
       * Extra application data attached to the transaction.
       *
       * Cardano allows users and developers to embed their own
       * authenticated metadata when submitting transactions. Metadata can
       * be expressed as a JSON object with some restrictions:
       *
       * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
       *
       * 2. Each metadata value is tagged with its type.
       *
       * 3. Strings must be at most 64 bytes when UTF-8 encoded.
       *
       * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
       *
       * Metadata aren't stored as JSON on the Cardano blockchain but are
       * instead stored using a compact binary encoding (CBOR).
       *
       * The binary encoding of metadata values supports three simple types:
       *
       * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
       * * Strings (UTF-8 encoded)
       * * Bytestrings
       *
       * And two compound types:
       *
       * * Lists of metadata values
       * * Mappings from metadata values to metadata values
       *
       * It is possible to transform any JSON object into this schema.
       *
       * However, if your application uses floating point values, they will
       * need to be converted somehow, according to your
       * requirements. Likewise for `null` or `bool` values. When reading
       * metadata from chain, be aware that integers may exceed the
       * javascript numeric range, and may need special "bigint" parsing.
       * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
       */
      metadata?: Record<string, TransactionMetadataValue>;
      /**
       * The TTL (time to live) is the time period in which the transaction
       * will be accepted into node mempools.
       *
       * After the TTL has lapsed, the transaction is considered
       * expired. At this point, nodes will give up on broadcasting the
       * transaction, and the wallet will release the funds allocated to
       * the transaction so they can be used for other payments.
       *
       * The TTL should be long enough that the transaction has time to be
       * propagated through the network and confirmed, but short enough so
       * that - in the event of failures - UTxO are returned to the wallet
       * in a timely manner.
       *
       * The TTL value is given in seconds. It will be converted to a slot
       * number internally.
       *
       * If the TTL is not provided for a payment, a reasonable default
       * value will be used.
       */
      time_to_live?: {
        /**
         * @min 0
         * @example 10
         */
        quantity: number;
        unit: PostTransactionFeeUnitEnum3;
      };
    }
  | {
      /**
       * A list of target outputs
       * @minItems 0
       */
      payments: {
        /**
         * @format base58|bech32
         * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
         */
        address: string;
        /** Coins, in Lovelace */
        amount: {
          /**
           * @min 0
           * @example 42000000
           */
          quantity: number;
          unit: PostTransactionFeeUnitEnum4;
        };
      }[];
      /**
       * When provided, attempts to withdraw rewards from the default stake address corresponding to the given mnemonic.
       *
       * Should the rewards be null or too small to be worth withdrawing (i.e. the cost of adding them into the transaction
       * is more than their own intrinsic value), the server will reject the request with a `withdrawal_not_worth` error.
       *
       * withdrawal field    | reward balance | result
       * ---                 | ---            | ---
       * any recovery phrase | too small      | x Error 403 `withdrawal_not_worth`
       * any recovery phrase | big enough     | ✓ withdrawal generated
       * @maxItems 24
       * @minItems 15
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      withdrawal: string[];
    };

export interface PostTransactionFeeParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface PostTransactionFeeData {
  /** Coins, in Lovelace */
  estimated_min: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: PostTransactionFeeUnitEnum;
  };
  /** Coins, in Lovelace */
  estimated_max: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: PostTransactionFeeUnitEnum1;
  };
}

/** no_such_wallet not_acceptable unsupported_media_type */
export type PostTransactionFeeError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PostTransactionFeeCodeEnum;
    }
  | (
      | {
          /** May occur when trying to perform an operation not supported by this type of wallet. */
          message: string;
          code: PostTransactionFeeCodeEnum1;
        }
      | {
          /** May occur when submitting a withdrawal while another withdrawal is pending. */
          message: string;
          code: PostTransactionFeeCodeEnum2;
        }
      | {
          /** May occur when a requested output is below the minimum utxo value. */
          message: string;
          code: PostTransactionFeeCodeEnum3;
        }
      | {
          /** May occur when a transaction can't be balanced for fees. */
          message: string;
          code: PostTransactionFeeCodeEnum4;
        }
      | {
          /** May occur when there's not enough money in the wallet to cover a requested payment. */
          message: string;
          code: PostTransactionFeeCodeEnum5;
        }
      | {
          /** May occur when there's enough money to pay for a payment, but not enough UTxO to allow for paying each output independently. */
          message: string;
          code: PostTransactionFeeCodeEnum6;
        }
      | {
          /** Should never happen unless the server screwed up with the creation of a coin selection. */
          message: string;
          code: PostTransactionFeeCodeEnum7;
        }
      | {
          /** May occur when the wallet can't cover for all requested outputs without making the transaction too large. */
          message: string;
          code: PostTransactionFeeCodeEnum8;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: PostTransactionFeeCodeEnum9;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PostTransactionFeeCodeEnum10;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: PostTransactionFeeCodeEnum11;
    };

export enum PostTransactionUnitEnum {
  Lovelace = "lovelace",
}

/** @example "block" */
export enum PostTransactionUnitEnum1 {
  Block = "block",
}

/** @example "block" */
export enum PostTransactionUnitEnum2 {
  Block = "block",
}

/** @example "block" */
export enum PostTransactionUnitEnum3 {
  Block = "block",
}

export enum PostTransactionDirectionEnum {
  Outgoing = "outgoing",
  Incoming = "incoming",
}

export enum PostTransactionUnitEnum4 {
  Lovelace = "lovelace",
}

export enum PostTransactionUnitEnum5 {
  Lovelace = "lovelace",
}

export enum PostTransactionUnitEnum6 {
  Lovelace = "lovelace",
}

/**
 * Current transaction status.
 *
 *   ```
 *          *---------*          *-----------*
 *          |         |---------->  EXPIRED  |
 *          |         |  (ttl)   *-----------*
 *   -------> PENDING |
 *          |         <----------------*
 *          |         |                |
 *          *---------*            (rollback)
 *               |                     |
 *          (in ledger)          *-----------*
 *               |               |           |
 *               *---------------> IN_LEDGER |
 *                               |           |
 *                               *-----------*
 *   ```
 */
export enum PostTransactionStatusEnum {
  Pending = "pending",
  InLedger = "in_ledger",
  Expired = "expired",
}

export enum PostTransactionCodeEnum {
  BadRequest = "bad_request",
}

export enum PostTransactionCodeEnum1 {
  InvalidWalletType = "invalid_wallet_type",
}

export enum PostTransactionCodeEnum2 {
  AlreadyWithdrawing = "already_withdrawing",
}

export enum PostTransactionCodeEnum3 {
  UtxoTooSmall = "utxo_too_small",
}

export enum PostTransactionCodeEnum4 {
  CannotCoverFee = "cannot_cover_fee",
}

export enum PostTransactionCodeEnum5 {
  NotEnoughMoney = "not_enough_money",
}

export enum PostTransactionCodeEnum6 {
  TransactionIsTooBig = "transaction_is_too_big",
}

export enum PostTransactionCodeEnum7 {
  NoRootKey = "no_root_key",
}

export enum PostTransactionCodeEnum8 {
  WrongEncryptionPassphrase = "wrong_encryption_passphrase",
}

export enum PostTransactionCodeEnum9 {
  NoSuchWallet = "no_such_wallet",
}

export enum PostTransactionCodeEnum10 {
  NotAcceptable = "not_acceptable",
}

export enum PostTransactionCodeEnum11 {
  UnsupportedMediaType = "unsupported_media_type",
}

export enum PostTransactionUnitEnum7 {
  Lovelace = "lovelace",
}

/**
 * When provided, instruments the server to automatically withdraw rewards from the source wallet when they are deemed
 * sufficient (i.e. they contribute to the balance for at least as much as they cost).
 *
 * As a consequence, the resulting transaction may or may not have a withdrawal object. Summarizing:
 *
 * withdrawal field | reward balance | result
 * ---              | ---            | ---
 * `null`           | too small      | ✓ no withdrawals generated
 * `null`           | big enough     | ✓ no withdrawals generated
 * `"self"`         | too small      | ✓ no withdrawals generated
 * `"self"`         | big enough     | ✓ withdrawal generated
 */
export enum PostTransactionWithdrawalEnum {
  Self = "self",
}

export enum PostTransactionUnitEnum8 {
  Second = "second",
}

export enum PostTransactionUnitEnum9 {
  Lovelace = "lovelace",
}

export type PostTransactionPayload =
  | {
      /**
       * The wallet's master passphrase.
       * @minLength 0
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * A list of target outputs
       * @minItems 0
       */
      payments: {
        /**
         * @format base58|bech32
         * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
         */
        address: string;
        /** Coins, in Lovelace */
        amount: {
          /**
           * @min 0
           * @example 42000000
           */
          quantity: number;
          unit: PostTransactionUnitEnum7;
        };
      }[];
      /**
       * When provided, instruments the server to automatically withdraw rewards from the source wallet when they are deemed
       * sufficient (i.e. they contribute to the balance for at least as much as they cost).
       *
       * As a consequence, the resulting transaction may or may not have a withdrawal object. Summarizing:
       *
       * withdrawal field | reward balance | result
       * ---              | ---            | ---
       * `null`           | too small      | ✓ no withdrawals generated
       * `null`           | big enough     | ✓ no withdrawals generated
       * `"self"`         | too small      | ✓ no withdrawals generated
       * `"self"`         | big enough     | ✓ withdrawal generated
       */
      withdrawal?: PostTransactionWithdrawalEnum;
      /**
       * Extra application data attached to the transaction.
       *
       * Cardano allows users and developers to embed their own
       * authenticated metadata when submitting transactions. Metadata can
       * be expressed as a JSON object with some restrictions:
       *
       * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
       *
       * 2. Each metadata value is tagged with its type.
       *
       * 3. Strings must be at most 64 bytes when UTF-8 encoded.
       *
       * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
       *
       * Metadata aren't stored as JSON on the Cardano blockchain but are
       * instead stored using a compact binary encoding (CBOR).
       *
       * The binary encoding of metadata values supports three simple types:
       *
       * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
       * * Strings (UTF-8 encoded)
       * * Bytestrings
       *
       * And two compound types:
       *
       * * Lists of metadata values
       * * Mappings from metadata values to metadata values
       *
       * It is possible to transform any JSON object into this schema.
       *
       * However, if your application uses floating point values, they will
       * need to be converted somehow, according to your
       * requirements. Likewise for `null` or `bool` values. When reading
       * metadata from chain, be aware that integers may exceed the
       * javascript numeric range, and may need special "bigint" parsing.
       * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
       */
      metadata?: Record<string, TransactionMetadataValue>;
      /**
       * The TTL (time to live) is the time period in which the transaction
       * will be accepted into node mempools.
       *
       * After the TTL has lapsed, the transaction is considered
       * expired. At this point, nodes will give up on broadcasting the
       * transaction, and the wallet will release the funds allocated to
       * the transaction so they can be used for other payments.
       *
       * The TTL should be long enough that the transaction has time to be
       * propagated through the network and confirmed, but short enough so
       * that - in the event of failures - UTxO are returned to the wallet
       * in a timely manner.
       *
       * The TTL value is given in seconds. It will be converted to a slot
       * number internally.
       *
       * If the TTL is not provided for a payment, a reasonable default
       * value will be used.
       */
      time_to_live?: {
        /**
         * @min 0
         * @example 10
         */
        quantity: number;
        unit: PostTransactionUnitEnum8;
      };
    }
  | {
      /**
       * The wallet's master passphrase.
       * @minLength 0
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * A list of target outputs
       * @minItems 0
       */
      payments: {
        /**
         * @format base58|bech32
         * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
         */
        address: string;
        /** Coins, in Lovelace */
        amount: {
          /**
           * @min 0
           * @example 42000000
           */
          quantity: number;
          unit: PostTransactionUnitEnum9;
        };
      }[];
      /**
       * When provided, attempts to withdraw rewards from the default stake address corresponding to the given mnemonic.
       *
       * Should the rewards be null or too small to be worth withdrawing (i.e. the cost of adding them into the transaction
       * is more than their own intrinsic value), the server will reject the request with a `withdrawal_not_worth` error.
       *
       * withdrawal field    | reward balance | result
       * ---                 | ---            | ---
       * any recovery phrase | too small      | x Error 403 `withdrawal_not_worth`
       * any recovery phrase | big enough     | ✓ withdrawal generated
       * @maxItems 24
       * @minItems 15
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      withdrawal: string[];
    };

export interface PostTransactionParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface PostTransactionData {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
  /** Coins, in Lovelace */
  amount: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: PostTransactionUnitEnum;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Absolute time at which the transaction was inserted in a block.
   */
  inserted_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: PostTransactionUnitEnum1;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending OR status == expired
   * </span><br/>
   * Absolute time and slot at which the pending transaction TTL (time to live) will lapse.
   */
  expires_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending
   * </span><br/>
   * The point in time at which a transaction became pending.
   */
  pending_since?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: PostTransactionUnitEnum2;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Current depth of the transaction in the local chain
   */
  depth?: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: PostTransactionUnitEnum3;
  };
  direction: PostTransactionDirectionEnum;
  /**
   * A list of transaction inputs
   * @minItems 0
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address?: string;
    /** Coins, in Lovelace */
    amount?: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostTransactionUnitEnum4;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostTransactionUnitEnum5;
    };
  }[];
  /**
   * A list of withdrawals from stake addresses.
   * @minItems 0
   */
  withdrawals: {
    /**
     * @format bech32
     * @example "stake1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2x"
     */
    stake_address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostTransactionUnitEnum6;
    };
  }[];
  /**
   * Current transaction status.
   *
   *   ```
   *          *---------*          *-----------*
   *          |         |---------->  EXPIRED  |
   *          |         |  (ttl)   *-----------*
   *   -------> PENDING |
   *          |         <----------------*
   *          |         |                |
   *          *---------*            (rollback)
   *               |                     |
   *          (in ledger)          *-----------*
   *               |               |           |
   *               *---------------> IN_LEDGER |
   *                               |           |
   *                               *-----------*
   *   ```
   */
  status: PostTransactionStatusEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
}

/** no_such_wallet not_acceptable unsupported_media_type */
export type PostTransactionError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PostTransactionCodeEnum;
    }
  | (
      | {
          /** May occur when trying to perform an operation not supported by this type of wallet. */
          message: string;
          code: PostTransactionCodeEnum1;
        }
      | {
          /** May occur when submitting a withdrawal while another withdrawal is pending. */
          message: string;
          code: PostTransactionCodeEnum2;
        }
      | {
          /** May occur when a requested output is below the minimum utxo value. */
          message: string;
          code: PostTransactionCodeEnum3;
        }
      | {
          /** May occur when a transaction can't be balanced for fees. */
          message: string;
          code: PostTransactionCodeEnum4;
        }
      | {
          /** May occur when there's not enough money in the wallet to cover a requested payment. */
          message: string;
          code: PostTransactionCodeEnum5;
        }
      | {
          /** May occur when the wallet can't cover for all requested outputs without making the transaction too large. */
          message: string;
          code: PostTransactionCodeEnum6;
        }
      | {
          /** May occur when an action require a signing key but the wallet has only access to verification keys. */
          message: string;
          code: PostTransactionCodeEnum7;
        }
      | {
          /** May occur when the given spending passphrase is wrong. */
          message: string;
          code: PostTransactionCodeEnum8;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: PostTransactionCodeEnum9;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PostTransactionCodeEnum10;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: PostTransactionCodeEnum11;
    };

export enum ListTransactionsUnitEnum {
  Lovelace = "lovelace",
}

/** @example "block" */
export enum ListTransactionsUnitEnum1 {
  Block = "block",
}

/** @example "block" */
export enum ListTransactionsUnitEnum2 {
  Block = "block",
}

/** @example "block" */
export enum ListTransactionsUnitEnum3 {
  Block = "block",
}

export enum ListTransactionsDirectionEnum {
  Outgoing = "outgoing",
  Incoming = "incoming",
}

export enum ListTransactionsUnitEnum4 {
  Lovelace = "lovelace",
}

export enum ListTransactionsUnitEnum5 {
  Lovelace = "lovelace",
}

export enum ListTransactionsUnitEnum6 {
  Lovelace = "lovelace",
}

/**
 * Current transaction status.
 *
 *   ```
 *          *---------*          *-----------*
 *          |         |---------->  EXPIRED  |
 *          |         |  (ttl)   *-----------*
 *   -------> PENDING |
 *          |         <----------------*
 *          |         |                |
 *          *---------*            (rollback)
 *               |                     |
 *          (in ledger)          *-----------*
 *               |               |           |
 *               *---------------> IN_LEDGER |
 *                               |           |
 *                               *-----------*
 *   ```
 */
export enum ListTransactionsStatusEnum {
  Pending = "pending",
  InLedger = "in_ledger",
  Expired = "expired",
}

export enum ListTransactionsCodeEnum {
  MinWithdrawalWrong = "min_withdrawal_wrong",
}

export enum ListTransactionsCodeEnum1 {
  StartTimeLaterThanEndTime = "start_time_later_than_end_time",
}

export enum ListTransactionsCodeEnum2 {
  NoSuchWallet = "no_such_wallet",
}

export enum ListTransactionsCodeEnum3 {
  NotAcceptable = "not_acceptable",
}

export interface ListTransactionsParams {
  /**
   * An optional start time in ISO 8601 date-and-time format. Basic and
   * extended formats are both accepted. Times can be local (with a
   * timezone offset) or UTC.
   *
   * If both a start time and an end time are specified, then the start
   * time must not be later than the end time.
   *
   * Example: `2008-08-08T08:08:08Z`
   * @format ISO 8601
   */
  start?: string;
  /**
   * An optional end time in ISO 8601 date-and-time format. Basic and
   * extended formats are both accepted. Times can be local (with a
   * timezone offset) or UTC.
   *
   * If both a start time and an end time are specified, then the start
   * time must not be later than the end time.
   *
   * Example: `2008-08-08T08:08:08Z`
   * @format ISO 8601
   */
  end?: string;
  /**
   * An optional sort order.
   * @default "descending"
   */
  order?: OrderEnum;
  /**
   * Returns only transactions that have at least one withdrawal above the given amount.
   * This is particularly useful when set to `1` in order to list the withdrawal history of a wallet.
   * @min 1
   */
  minWithdrawal?: number;
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

/**
 * An optional sort order.
 * @default "descending"
 */
export enum OrderEnum {
  Ascending = "ascending",
  Descending = "descending",
}

export type ListTransactionsData = {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
  /** Coins, in Lovelace */
  amount: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ListTransactionsUnitEnum;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Absolute time at which the transaction was inserted in a block.
   */
  inserted_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ListTransactionsUnitEnum1;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending OR status == expired
   * </span><br/>
   * Absolute time and slot at which the pending transaction TTL (time to live) will lapse.
   */
  expires_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending
   * </span><br/>
   * The point in time at which a transaction became pending.
   */
  pending_since?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ListTransactionsUnitEnum2;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Current depth of the transaction in the local chain
   */
  depth?: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: ListTransactionsUnitEnum3;
  };
  direction: ListTransactionsDirectionEnum;
  /**
   * A list of transaction inputs
   * @minItems 0
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address?: string;
    /** Coins, in Lovelace */
    amount?: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListTransactionsUnitEnum4;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListTransactionsUnitEnum5;
    };
  }[];
  /**
   * A list of withdrawals from stake addresses.
   * @minItems 0
   */
  withdrawals: {
    /**
     * @format bech32
     * @example "stake1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2x"
     */
    stake_address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListTransactionsUnitEnum6;
    };
  }[];
  /**
   * Current transaction status.
   *
   *   ```
   *          *---------*          *-----------*
   *          |         |---------->  EXPIRED  |
   *          |         |  (ttl)   *-----------*
   *   -------> PENDING |
   *          |         <----------------*
   *          |         |                |
   *          *---------*            (rollback)
   *               |                     |
   *          (in ledger)          *-----------*
   *               |               |           |
   *               *---------------> IN_LEDGER |
   *                               |           |
   *                               *-----------*
   *   ```
   */
  status: ListTransactionsStatusEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
}[];

/** no_such_wallet not_acceptable */
export type ListTransactionsError =
  | (
      | {
          /** May occur when trying to withdraw less than the minimal UTxO value. */
          message: string;
          code: ListTransactionsCodeEnum;
        }
      | {
          /** May occur when a provided time-range is unsound. */
          message: string;
          code: ListTransactionsCodeEnum1;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: ListTransactionsCodeEnum2;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: ListTransactionsCodeEnum3;
    };

/**
 * An optional sort order.
 * @default "descending"
 */
export enum ListTransactionsParams1OrderEnum {
  Ascending = "ascending",
  Descending = "descending",
}

export enum GetTransactionUnitEnum {
  Lovelace = "lovelace",
}

/** @example "block" */
export enum GetTransactionUnitEnum1 {
  Block = "block",
}

/** @example "block" */
export enum GetTransactionUnitEnum2 {
  Block = "block",
}

/** @example "block" */
export enum GetTransactionUnitEnum3 {
  Block = "block",
}

export enum GetTransactionDirectionEnum {
  Outgoing = "outgoing",
  Incoming = "incoming",
}

export enum GetTransactionUnitEnum4 {
  Lovelace = "lovelace",
}

export enum GetTransactionUnitEnum5 {
  Lovelace = "lovelace",
}

export enum GetTransactionUnitEnum6 {
  Lovelace = "lovelace",
}

/**
 * Current transaction status.
 *
 *   ```
 *          *---------*          *-----------*
 *          |         |---------->  EXPIRED  |
 *          |         |  (ttl)   *-----------*
 *   -------> PENDING |
 *          |         <----------------*
 *          |         |                |
 *          *---------*            (rollback)
 *               |                     |
 *          (in ledger)          *-----------*
 *               |               |           |
 *               *---------------> IN_LEDGER |
 *                               |           |
 *                               *-----------*
 *   ```
 */
export enum GetTransactionStatusEnum {
  Pending = "pending",
  InLedger = "in_ledger",
  Expired = "expired",
}

export enum GetTransactionCodeEnum {
  NoSuchWallet = "no_such_wallet",
}

export enum GetTransactionCodeEnum1 {
  NoSuchTransaction = "no_such_transaction",
}

export enum GetTransactionCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export interface GetTransactionParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
  /**
   * @format hex
   * @minLength 64
   * @maxLength 64
   */
  transactionId: string;
}

export interface GetTransactionData {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
  /** Coins, in Lovelace */
  amount: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: GetTransactionUnitEnum;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Absolute time at which the transaction was inserted in a block.
   */
  inserted_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: GetTransactionUnitEnum1;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending OR status == expired
   * </span><br/>
   * Absolute time and slot at which the pending transaction TTL (time to live) will lapse.
   */
  expires_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending
   * </span><br/>
   * The point in time at which a transaction became pending.
   */
  pending_since?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: GetTransactionUnitEnum2;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Current depth of the transaction in the local chain
   */
  depth?: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: GetTransactionUnitEnum3;
  };
  direction: GetTransactionDirectionEnum;
  /**
   * A list of transaction inputs
   * @minItems 0
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address?: string;
    /** Coins, in Lovelace */
    amount?: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: GetTransactionUnitEnum4;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: GetTransactionUnitEnum5;
    };
  }[];
  /**
   * A list of withdrawals from stake addresses.
   * @minItems 0
   */
  withdrawals: {
    /**
     * @format bech32
     * @example "stake1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2x"
     */
    stake_address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: GetTransactionUnitEnum6;
    };
  }[];
  /**
   * Current transaction status.
   *
   *   ```
   *          *---------*          *-----------*
   *          |         |---------->  EXPIRED  |
   *          |         |  (ttl)   *-----------*
   *   -------> PENDING |
   *          |         <----------------*
   *          |         |                |
   *          *---------*            (rollback)
   *               |                     |
   *          (in ledger)          *-----------*
   *               |               |           |
   *               *---------------> IN_LEDGER |
   *                               |           |
   *                               *-----------*
   *   ```
   */
  status: GetTransactionStatusEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
}

/** not_acceptable */
export type GetTransactionError =
  | (
      | {
          /**
           * May occur when a given walletId does not match with any known
           * wallets (because it has been deleted, or has never existed).
           */
          message: string;
          code: GetTransactionCodeEnum;
        }
      | {
          /** May occur when a given transactionId does not match with any known transactions. */
          message: string;
          code: GetTransactionCodeEnum1;
        }
    )
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: GetTransactionCodeEnum2;
    };

export enum DeleteTransactionCodeEnum {
  TransactionAlreadyInLedger = "transaction_already_in_ledger",
}

export enum DeleteTransactionCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum DeleteTransactionCodeEnum2 {
  NoSuchTransaction = "no_such_transaction",
}

export enum DeleteTransactionCodeEnum3 {
  NotAcceptable = "not_acceptable",
}

export interface DeleteTransactionParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
  /**
   * @format hex
   * @minLength 64
   * @maxLength 64
   */
  transactionId: string;
}

export type DeleteTransactionData = any;

/** transaction_already_in_ledger not_acceptable */
export type DeleteTransactionError =
  | {
      /** Occurs when attempting to delete a transaction which is neither pending nor expired. */
      message: string;
      code: DeleteTransactionCodeEnum;
    }
  | (
      | {
          /**
           * May occur when a given walletId does not match with any known
           * wallets (because it has been deleted, or has never existed).
           */
          message: string;
          code: DeleteTransactionCodeEnum1;
        }
      | {
          /** May occur when a given transactionId does not match with any known transactions. */
          message: string;
          code: DeleteTransactionCodeEnum2;
        }
    )
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: DeleteTransactionCodeEnum3;
    };

export enum ListAddressesStateEnum {
  Used = "used",
  Unused = "unused",
}

export enum ListAddressesCodeEnum {
  BadRequest = "bad_request",
}

export enum ListAddressesCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum ListAddressesCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export interface ListAddressesParams {
  /** An optional filter on the address state. */
  state?: StateEnum;
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

/** An optional filter on the address state. */
export enum StateEnum {
  Used = "used",
  Unused = "unused",
}

export type ListAddressesData = {
  /**
   * @format base58|bech32
   * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
   */
  id: string;
  state: ListAddressesStateEnum;
}[];

/** bad_request no_such_wallet not_acceptable */
export type ListAddressesError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: ListAddressesCodeEnum;
    }
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: ListAddressesCodeEnum1;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: ListAddressesCodeEnum2;
    };

/** An optional filter on the address state. */
export enum ListAddressesParams1StateEnum {
  Used = "used",
  Unused = "unused",
}

export enum GetWalletKeyCodeEnum {
  BadRequest = "bad_request",
}

export enum GetWalletKeyCodeEnum1 {
  NotAcceptable = "not_acceptable",
}

export interface GetWalletKeyParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
  role?: RoleEnum1;
  /**
   * An individual segment within a derivation path.
   * Indexes without `H` suffix are called `Soft`.
   * Indexes with `H` suffix are called `Hardened`.
   * @example "1852H"
   */
  index?: string;
}

export enum RoleEnum1 {
  UtxoExternal = "utxo_external",
  UtxoInternal = "utxo_internal",
  MutableAccount = "mutable_account",
  MultisigScript = "multisig_script",
}

/**
 * @format bech32
 * @pattern ^((addr_vk)|(stake_vk)|(script_vk))1[0-9a-z]*$
 */
export type GetWalletKeyData = string;

/** bad_request not_acceptable */
export type GetWalletKeyError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: GetWalletKeyCodeEnum;
    }
  | {
      /** A descriptive error message. */
      message: string;
      /**
       * A specific error code for this error, more precise than HTTP ones.
       * @example "an_error_code"
       */
      code: string;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: GetWalletKeyCodeEnum1;
    };

export enum GetWalletKeyParams1RoleEnum {
  UtxoExternal = "utxo_external",
  UtxoInternal = "utxo_internal",
  MutableAccount = "mutable_account",
  MultisigScript = "multisig_script",
}

export enum GetWalletKeyParams1Enum {
  UtxoExternal = "utxo_external",
  UtxoInternal = "utxo_internal",
  MutableAccount = "mutable_account",
  MultisigScript = "multisig_script",
}

export enum ListStakePoolsUnitEnum {
  Lovelace = "lovelace",
}

export enum ListStakePoolsUnitEnum1 {
  Percent = "percent",
}

/** @example "block" */
export enum ListStakePoolsUnitEnum2 {
  Block = "block",
}

export enum ListStakePoolsUnitEnum3 {
  Lovelace = "lovelace",
}

export enum ListStakePoolsUnitEnum4 {
  Percent = "percent",
}

export enum ListStakePoolsUnitEnum5 {
  Lovelace = "lovelace",
}

export enum ListStakePoolsFlagsEnum {
  Delisted = "delisted",
}

export enum ListStakePoolsCodeEnum {
  QueryParamMissing = "query_param_missing",
}

export interface ListStakePoolsParams {
  /**
   * The stake the user intends to delegate in Lovelace. Required.
   * @min 0
   * @max 45000000000000000
   */
  stake: number;
}

export type ListStakePoolsData = {
  /**
   * A unique identifier for the pool.
   * @format hex|bech32
   * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
   */
  id: string;
  metrics: {
    /**
     * The rewards the wallet can expect to receive at the end of an epoch, in the long term, if delegating to
     * this pool.
     *
     * For more details, see the
     * [Design Specification for Delegation and Incentives in Cardano](https://hydra.iohk.io/job/Cardano/cardano-ledger-specs/delegationDesignSpec/latest/download-by-type/doc-pdf/delegation_design_spec)
     * document.
     */
    non_myopic_member_rewards: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListStakePoolsUnitEnum;
    };
    /**
     * The live pool stake relative to the *total* stake.
     *
     * For more details, see the section "Relative Stake: Active vs Total" in
     * [Design Specification for Delegation and Incentives in Cardano](https://hydra.iohk.io/job/Cardano/cardano-ledger-specs/delegationDesignSpec/latest/download-by-type/doc-pdf/delegation_design_spec).
     */
    relative_stake: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: ListStakePoolsUnitEnum1;
    };
    /**
     * Saturation-level of the pool based on the desired number of pools aimed by the network.
     * A value above `1` indicates that the pool is saturated.
     *
     * The `non_myopic_member_rewards` take oversaturation into account, as specified by the [specs](https://hydra.iohk.io/job/Cardano/cardano-ledger-specs/delegationDesignSpec/latest/download-by-type/doc-pdf/delegation_design_spec).
     *
     * The saturation is based on the live `relative_stake`. The saturation at the end of epoch e,
     * will affect the rewards paid out at the end of epoch e+3.
     * @min 0
     * @example 0.74
     */
    saturation: number;
    /** Number of blocks produced by a given stake pool in its lifetime. */
    produced_blocks: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ListStakePoolsUnitEnum2;
    };
  };
  /**
   * Estimated cost set by the pool operator when registering his pool.
   * This fixed cost is taken from each reward earned by the pool before splitting rewards between stakeholders.
   *
   * May be omitted if the wallet hasn't found the pool's registration cerificate yet.
   */
  cost: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ListStakePoolsUnitEnum3;
  };
  /**
   * Variable margin on the total reward given to an operator before splitting rewards between stakeholders.
   *
   * May be omitted if the wallet hasn't found the pool's registration cerificate yet.
   */
  margin: {
    /**
     * @min 0
     * @max 100
     * @example 42
     */
    quantity: number;
    unit: ListStakePoolsUnitEnum4;
  };
  /**
   * Minimal stake amount that a stake pool is willing to honor.
   *
   * May be omitted if the wallet hasn't found the pool's registration cerificate yet.
   */
  pledge: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ListStakePoolsUnitEnum5;
  };
  /** Information about the stake pool. */
  metadata?: {
    /**
     * @minLength 3
     * @maxLength 5
     * @example "IOHK"
     */
    ticker: string;
    /**
     * @minLength 1
     * @maxLength 50
     */
    name: string;
    /** @maxLength 255 */
    description?: string;
    /**
     * @format uri
     * @example "https://iohk.io"
     */
    homepage: string;
  };
  /**
   * The epoch in which a stake pool retires.
   *
   * May be omitted if the wallet hasn't yet found a retirement certificate
   * for this stake pool.
   */
  retirement?: {
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    epoch_start_time: string;
  };
  /**
   * Various flags applicable to stake pools. Possible flags:
   *
   * | flag     | description                                                                                                      |
   * | ---      | ---                                                                                                              |
   * | delisted | The pool is marked as delisted on a configured SMASH server; metadata for this pool have therefore been dropped. |
   */
  flags: ListStakePoolsFlagsEnum[];
}[];

/** query_param_missing */
export type ListStakePoolsError = {
  /** May occur when an endpoint requires the presence of a query parameter that is missing. */
  message: string;
  code: ListStakePoolsCodeEnum;
};

export enum GetMaintenanceActionsStatusEnum {
  NotApplicable = "not_applicable",
  NotStarted = "not_started",
  Restarting = "restarting",
  HasRun = "has_run",
}

export interface GetMaintenanceActionsData {
  /**
   * Gives an indication if metadata GC checking for delisted pools
   * has run and if so, when.
   *
   * Possible values are:
   *   - not_applicable -> we're currently not querying a SMASH server for metadata
   *   - not_started -> the GC hasn't started yet, try again in a short while
   *   - restarting -> the GC thread is currently restarting, try again in short while
   *   - has_run -> the GC has run successfully
   *
   * When 'status' is 'restarting' or 'has_run' then the field 'last_run'
   * is set to the last GC time in UTC.
   */
  gc_stake_pools: {
    status: GetMaintenanceActionsStatusEnum;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_run?: string;
  };
}

export enum PostMaintenanceActionMaintenanceActionEnum {
  GcStakePools = "gc_stake_pools",
}

/**
 * The maintenance action to carry out, current values are
 *   - gc_stake_pools -> trigger looking up delisted pools from the remote SMASH server
 */
export interface PostMaintenanceActionPayload {
  maintenance_action: PostMaintenanceActionMaintenanceActionEnum;
}

export type PostMaintenanceActionData = any;

export type PostMaintenanceActionError = {
  /** A descriptive error message. */
  message: string;
  /**
   * A specific error code for this error, more precise than HTTP ones.
   * @example "an_error_code"
   */
  code: string;
};

export enum GetDelegationFeeUnitEnum {
  Lovelace = "lovelace",
}

export enum GetDelegationFeeUnitEnum1 {
  Lovelace = "lovelace",
}

export enum GetDelegationFeeCodeEnum {
  CannotCoverFee = "cannot_cover_fee",
}

export enum GetDelegationFeeCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum GetDelegationFeeCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export interface GetDelegationFeeParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface GetDelegationFeeData {
  /** Coins, in Lovelace */
  estimated_min: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: GetDelegationFeeUnitEnum;
  };
  /** Coins, in Lovelace */
  estimated_max: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: GetDelegationFeeUnitEnum1;
  };
}

/** cannot_cover_fee no_such_wallet not_acceptable */
export type GetDelegationFeeError =
  | {
      /** May occur when a transaction can't be balanced for fees. */
      message: string;
      code: GetDelegationFeeCodeEnum;
    }
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: GetDelegationFeeCodeEnum1;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: GetDelegationFeeCodeEnum2;
    };

export enum QuitStakePoolUnitEnum {
  Lovelace = "lovelace",
}

/** @example "block" */
export enum QuitStakePoolUnitEnum1 {
  Block = "block",
}

/** @example "block" */
export enum QuitStakePoolUnitEnum2 {
  Block = "block",
}

/** @example "block" */
export enum QuitStakePoolUnitEnum3 {
  Block = "block",
}

export enum QuitStakePoolDirectionEnum {
  Outgoing = "outgoing",
  Incoming = "incoming",
}

export enum QuitStakePoolUnitEnum4 {
  Lovelace = "lovelace",
}

export enum QuitStakePoolUnitEnum5 {
  Lovelace = "lovelace",
}

export enum QuitStakePoolUnitEnum6 {
  Lovelace = "lovelace",
}

/**
 * Current transaction status.
 *
 *   ```
 *          *---------*          *-----------*
 *          |         |---------->  EXPIRED  |
 *          |         |  (ttl)   *-----------*
 *   -------> PENDING |
 *          |         <----------------*
 *          |         |                |
 *          *---------*            (rollback)
 *               |                     |
 *          (in ledger)          *-----------*
 *               |               |           |
 *               *---------------> IN_LEDGER |
 *                               |           |
 *                               *-----------*
 *   ```
 */
export enum QuitStakePoolStatusEnum {
  Pending = "pending",
  InLedger = "in_ledger",
  Expired = "expired",
}

export enum QuitStakePoolCodeEnum {
  BadRequest = "bad_request",
}

export enum QuitStakePoolCodeEnum1 {
  CannotCoverFee = "cannot_cover_fee",
}

export enum QuitStakePoolCodeEnum2 {
  NoRootKey = "no_root_key",
}

export enum QuitStakePoolCodeEnum3 {
  WrongEncryptionPassphrase = "wrong_encryption_passphrase",
}

export enum QuitStakePoolCodeEnum4 {
  NotDelegatingTo = "not_delegating_to",
}

export enum QuitStakePoolCodeEnum5 {
  NonNullRewards = "non_null_rewards",
}

export enum QuitStakePoolCodeEnum6 {
  NoSuchWallet = "no_such_wallet",
}

export enum QuitStakePoolCodeEnum7 {
  NotAcceptable = "not_acceptable",
}

export enum QuitStakePoolCodeEnum8 {
  UnsupportedMediaType = "unsupported_media_type",
}

export interface QuitStakePoolPayload {
  /**
   * The source Byron wallet's master passphrase.
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
}

export interface QuitStakePoolParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface QuitStakePoolData {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
  /** Coins, in Lovelace */
  amount: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: QuitStakePoolUnitEnum;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Absolute time at which the transaction was inserted in a block.
   */
  inserted_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: QuitStakePoolUnitEnum1;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending OR status == expired
   * </span><br/>
   * Absolute time and slot at which the pending transaction TTL (time to live) will lapse.
   */
  expires_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending
   * </span><br/>
   * The point in time at which a transaction became pending.
   */
  pending_since?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: QuitStakePoolUnitEnum2;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Current depth of the transaction in the local chain
   */
  depth?: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: QuitStakePoolUnitEnum3;
  };
  direction: QuitStakePoolDirectionEnum;
  /**
   * A list of transaction inputs
   * @minItems 0
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address?: string;
    /** Coins, in Lovelace */
    amount?: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: QuitStakePoolUnitEnum4;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: QuitStakePoolUnitEnum5;
    };
  }[];
  /**
   * A list of withdrawals from stake addresses.
   * @minItems 0
   */
  withdrawals: {
    /**
     * @format bech32
     * @example "stake1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2x"
     */
    stake_address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: QuitStakePoolUnitEnum6;
    };
  }[];
  /**
   * Current transaction status.
   *
   *   ```
   *          *---------*          *-----------*
   *          |         |---------->  EXPIRED  |
   *          |         |  (ttl)   *-----------*
   *   -------> PENDING |
   *          |         <----------------*
   *          |         |                |
   *          *---------*            (rollback)
   *               |                     |
   *          (in ledger)          *-----------*
   *               |               |           |
   *               *---------------> IN_LEDGER |
   *                               |           |
   *                               *-----------*
   *   ```
   */
  status: QuitStakePoolStatusEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
}

/** bad_request no_such_wallet not_acceptable unsupported_media_type */
export type QuitStakePoolError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: QuitStakePoolCodeEnum;
    }
  | (
      | {
          /** May occur when a transaction can't be balanced for fees. */
          message: string;
          code: QuitStakePoolCodeEnum1;
        }
      | {
          /** May occur when an action require a signing key but the wallet has only access to verification keys. */
          message: string;
          code: QuitStakePoolCodeEnum2;
        }
      | {
          /** May occur when the given spending passphrase is wrong. */
          message: string;
          code: QuitStakePoolCodeEnum3;
        }
      | {
          /** May occur when trying to quit a pool on an account that isn't delegating. */
          message: string;
          code: QuitStakePoolCodeEnum4;
        }
      | {
          /** May occur when trying to unregister a stake key that still has rewards attached to it. */
          message: string;
          code: QuitStakePoolCodeEnum5;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: QuitStakePoolCodeEnum6;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: QuitStakePoolCodeEnum7;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: QuitStakePoolCodeEnum8;
    };

export enum JoinStakePoolUnitEnum {
  Lovelace = "lovelace",
}

/** @example "block" */
export enum JoinStakePoolUnitEnum1 {
  Block = "block",
}

/** @example "block" */
export enum JoinStakePoolUnitEnum2 {
  Block = "block",
}

/** @example "block" */
export enum JoinStakePoolUnitEnum3 {
  Block = "block",
}

export enum JoinStakePoolDirectionEnum {
  Outgoing = "outgoing",
  Incoming = "incoming",
}

export enum JoinStakePoolUnitEnum4 {
  Lovelace = "lovelace",
}

export enum JoinStakePoolUnitEnum5 {
  Lovelace = "lovelace",
}

export enum JoinStakePoolUnitEnum6 {
  Lovelace = "lovelace",
}

/**
 * Current transaction status.
 *
 *   ```
 *          *---------*          *-----------*
 *          |         |---------->  EXPIRED  |
 *          |         |  (ttl)   *-----------*
 *   -------> PENDING |
 *          |         <----------------*
 *          |         |                |
 *          *---------*            (rollback)
 *               |                     |
 *          (in ledger)          *-----------*
 *               |               |           |
 *               *---------------> IN_LEDGER |
 *                               |           |
 *                               *-----------*
 *   ```
 */
export enum JoinStakePoolStatusEnum {
  Pending = "pending",
  InLedger = "in_ledger",
  Expired = "expired",
}

export enum JoinStakePoolCodeEnum {
  BadRequest = "bad_request",
}

export enum JoinStakePoolCodeEnum1 {
  CannotCoverFee = "cannot_cover_fee",
}

export enum JoinStakePoolCodeEnum2 {
  NoRootKey = "no_root_key",
}

export enum JoinStakePoolCodeEnum3 {
  WrongEncryptionPassphrase = "wrong_encryption_passphrase",
}

export enum JoinStakePoolCodeEnum4 {
  PoolAlreadyJoined = "pool_already_joined",
}

export enum JoinStakePoolCodeEnum5 {
  NoSuchWallet = "no_such_wallet",
}

export enum JoinStakePoolCodeEnum6 {
  NoSuchPool = "no_such_pool",
}

export enum JoinStakePoolCodeEnum7 {
  NotAcceptable = "not_acceptable",
}

export enum JoinStakePoolCodeEnum8 {
  UnsupportedMediaType = "unsupported_media_type",
}

export interface JoinStakePoolPayload {
  /**
   * The source Byron wallet's master passphrase.
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
}

export interface JoinStakePoolParams {
  /** @format hex|bech32 */
  stakePoolId: string;
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface JoinStakePoolData {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
  /** Coins, in Lovelace */
  amount: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: JoinStakePoolUnitEnum;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Absolute time at which the transaction was inserted in a block.
   */
  inserted_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: JoinStakePoolUnitEnum1;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending OR status == expired
   * </span><br/>
   * Absolute time and slot at which the pending transaction TTL (time to live) will lapse.
   */
  expires_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending
   * </span><br/>
   * The point in time at which a transaction became pending.
   */
  pending_since?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: JoinStakePoolUnitEnum2;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Current depth of the transaction in the local chain
   */
  depth?: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: JoinStakePoolUnitEnum3;
  };
  direction: JoinStakePoolDirectionEnum;
  /**
   * A list of transaction inputs
   * @minItems 0
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address?: string;
    /** Coins, in Lovelace */
    amount?: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: JoinStakePoolUnitEnum4;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: JoinStakePoolUnitEnum5;
    };
  }[];
  /**
   * A list of withdrawals from stake addresses.
   * @minItems 0
   */
  withdrawals: {
    /**
     * @format bech32
     * @example "stake1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2x"
     */
    stake_address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: JoinStakePoolUnitEnum6;
    };
  }[];
  /**
   * Current transaction status.
   *
   *   ```
   *          *---------*          *-----------*
   *          |         |---------->  EXPIRED  |
   *          |         |  (ttl)   *-----------*
   *   -------> PENDING |
   *          |         <----------------*
   *          |         |                |
   *          *---------*            (rollback)
   *               |                     |
   *          (in ledger)          *-----------*
   *               |               |           |
   *               *---------------> IN_LEDGER |
   *                               |           |
   *                               *-----------*
   *   ```
   */
  status: JoinStakePoolStatusEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
}

/** bad_request not_acceptable unsupported_media_type */
export type JoinStakePoolError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: JoinStakePoolCodeEnum;
    }
  | (
      | {
          /** May occur when a transaction can't be balanced for fees. */
          message: string;
          code: JoinStakePoolCodeEnum1;
        }
      | {
          /** May occur when an action require a signing key but the wallet has only access to verification keys. */
          message: string;
          code: JoinStakePoolCodeEnum2;
        }
      | {
          /** May occur when the given spending passphrase is wrong. */
          message: string;
          code: JoinStakePoolCodeEnum3;
        }
      | {
          /** May occur when a given poolId matches the current delegation preferences of the wallet's account. */
          message: string;
          code: JoinStakePoolCodeEnum4;
        }
    )
  | (
      | {
          /**
           * May occur when a given walletId does not match with any known
           * wallets (because it has been deleted, or has never existed).
           */
          message: string;
          code: JoinStakePoolCodeEnum5;
        }
      | {
          /** May occur when a given poolId does not match any known pool. */
          message: string;
          code: JoinStakePoolCodeEnum6;
        }
    )
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: JoinStakePoolCodeEnum7;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: JoinStakePoolCodeEnum8;
    };

export enum SelectCoinsUnitEnum {
  Lovelace = "lovelace",
}

export enum SelectCoinsUnitEnum1 {
  Lovelace = "lovelace",
}

export enum SelectCoinsUnitEnum2 {
  Lovelace = "lovelace",
}

export enum SelectCoinsCertificateTypeEnum {
  JoinPool = "join_pool",
  QuitPool = "quit_pool",
  RegisterRewardAccount = "register_reward_account",
}

export enum SelectCoinsCodeEnum {
  BadRequest = "bad_request",
}

export enum SelectCoinsCodeEnum1 {
  AlreadyWithdrawing = "already_withdrawing",
}

export enum SelectCoinsCodeEnum2 {
  UtxoTooSmall = "utxo_too_small",
}

export enum SelectCoinsCodeEnum3 {
  NotEnoughMoney = "not_enough_money",
}

export enum SelectCoinsCodeEnum4 {
  CannotCoverFee = "cannot_cover_fee",
}

export enum SelectCoinsCodeEnum5 {
  InputsDepleted = "inputs_depleted",
}

export enum SelectCoinsCodeEnum6 {
  InvalidCoinSelection = "invalid_coin_selection",
}

export enum SelectCoinsCodeEnum7 {
  NoSuchWallet = "no_such_wallet",
}

export enum SelectCoinsCodeEnum8 {
  NotAcceptable = "not_acceptable",
}

export enum SelectCoinsCodeEnum9 {
  UnsupportedMediaType = "unsupported_media_type",
}

export enum SelectCoinsUnitEnum3 {
  Lovelace = "lovelace",
}

export enum SelectCoinsActionEnum {
  Quit = "quit",
  Join = "join",
}

export type SelectCoinsPayload =
  | {
      /**
       * A list of target outputs
       * @minItems 0
       */
      payments: {
        /**
         * @format base58|bech32
         * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
         */
        address: string;
        /** Coins, in Lovelace */
        amount: {
          /**
           * @min 0
           * @example 42000000
           */
          quantity: number;
          unit: SelectCoinsUnitEnum3;
        };
      }[];
    }
  | {
      /**
       * A delegation action.
       *
       * Pool id is only required for "join".
       */
      delegation_action: {
        action: SelectCoinsActionEnum;
        /**
         * A unique identifier for the pool.
         * @format hex|bech32
         * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
         */
        pool?: string;
      };
    };

export interface SelectCoinsParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface SelectCoinsData {
  /**
   * A list of transaction inputs
   * @minItems 1
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: SelectCoinsUnitEnum;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /**
     * A path for deriving a child key from a parent key.
     * @minItems 1
     */
    derivation_path: string[];
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: SelectCoinsUnitEnum1;
    };
  }[];
  /**
   * A list of transaction change outputs.
   * @minItems 0
   */
  change: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: SelectCoinsUnitEnum2;
    };
    /**
     * A path for deriving a child key from a parent key.
     * @minItems 1
     */
    derivation_path: string[];
  }[];
  certificates?: {
    certificate_type: SelectCoinsCertificateTypeEnum;
    /**
     * A unique identifier for the pool.
     * @format hex|bech32
     * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
     */
    pool?: string;
    /**
     * @maxItems 5
     * @minItems 5
     */
    reward_account_path: string[];
  }[];
}

/** bad_request no_such_wallet not_acceptable unsupported_media_type */
export type SelectCoinsError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: SelectCoinsCodeEnum;
    }
  | (
      | {
          /** May occur when submitting a withdrawal while another withdrawal is pending. */
          message: string;
          code: SelectCoinsCodeEnum1;
        }
      | {
          /** May occur when a requested output is below the minimum utxo value. */
          message: string;
          code: SelectCoinsCodeEnum2;
        }
      | {
          /** May occur when there's not enough money in the wallet to cover a requested payment. */
          message: string;
          code: SelectCoinsCodeEnum3;
        }
      | {
          /** May occur when a transaction can't be balanced for fees. */
          message: string;
          code: SelectCoinsCodeEnum4;
        }
      | {
          /** May occur when there's enough money to pay for a payment, but not enough UTxO to allow for paying each output independently. */
          message: string;
          code: SelectCoinsCodeEnum5;
        }
      | {
          /** Should never happen unless the server screwed up with the creation of a coin selection. */
          message: string;
          code: SelectCoinsCodeEnum6;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: SelectCoinsCodeEnum7;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: SelectCoinsCodeEnum8;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: SelectCoinsCodeEnum9;
    };

export enum MigrateShelleyWalletUnitEnum {
  Lovelace = "lovelace",
}

/** @example "block" */
export enum MigrateShelleyWalletUnitEnum1 {
  Block = "block",
}

/** @example "block" */
export enum MigrateShelleyWalletUnitEnum2 {
  Block = "block",
}

/** @example "block" */
export enum MigrateShelleyWalletUnitEnum3 {
  Block = "block",
}

export enum MigrateShelleyWalletDirectionEnum {
  Outgoing = "outgoing",
  Incoming = "incoming",
}

export enum MigrateShelleyWalletUnitEnum4 {
  Lovelace = "lovelace",
}

export enum MigrateShelleyWalletUnitEnum5 {
  Lovelace = "lovelace",
}

export enum MigrateShelleyWalletUnitEnum6 {
  Lovelace = "lovelace",
}

/**
 * Current transaction status.
 *
 *   ```
 *          *---------*          *-----------*
 *          |         |---------->  EXPIRED  |
 *          |         |  (ttl)   *-----------*
 *   -------> PENDING |
 *          |         <----------------*
 *          |         |                |
 *          *---------*            (rollback)
 *               |                     |
 *          (in ledger)          *-----------*
 *               |               |           |
 *               *---------------> IN_LEDGER |
 *                               |           |
 *                               *-----------*
 *   ```
 */
export enum MigrateShelleyWalletStatusEnum {
  Pending = "pending",
  InLedger = "in_ledger",
  Expired = "expired",
}

export enum MigrateShelleyWalletCodeEnum {
  NothingToMigrate = "nothing_to_migrate",
}

export enum MigrateShelleyWalletCodeEnum1 {
  NoRootKey = "no_root_key",
}

export enum MigrateShelleyWalletCodeEnum2 {
  WrongEncryptionPassphrase = "wrong_encryption_passphrase",
}

export enum MigrateShelleyWalletCodeEnum3 {
  NoSuchWallet = "no_such_wallet",
}

export enum MigrateShelleyWalletCodeEnum4 {
  NotAcceptable = "not_acceptable",
}

export enum MigrateShelleyWalletCodeEnum5 {
  UnsupportedMediaType = "unsupported_media_type",
}

export interface MigrateShelleyWalletPayload {
  /**
   * The wallet's master passphrase.
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * The recipient addresses.
   * @minItems 1
   */
  addresses: string[];
}

export interface MigrateShelleyWalletParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export type MigrateShelleyWalletData = {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
  /** Coins, in Lovelace */
  amount: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: MigrateShelleyWalletUnitEnum;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Absolute time at which the transaction was inserted in a block.
   */
  inserted_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: MigrateShelleyWalletUnitEnum1;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending OR status == expired
   * </span><br/>
   * Absolute time and slot at which the pending transaction TTL (time to live) will lapse.
   */
  expires_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending
   * </span><br/>
   * The point in time at which a transaction became pending.
   */
  pending_since?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: MigrateShelleyWalletUnitEnum2;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Current depth of the transaction in the local chain
   */
  depth?: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: MigrateShelleyWalletUnitEnum3;
  };
  direction: MigrateShelleyWalletDirectionEnum;
  /**
   * A list of transaction inputs
   * @minItems 0
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address?: string;
    /** Coins, in Lovelace */
    amount?: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: MigrateShelleyWalletUnitEnum4;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: MigrateShelleyWalletUnitEnum5;
    };
  }[];
  /**
   * A list of withdrawals from stake addresses.
   * @minItems 0
   */
  withdrawals: {
    /**
     * @format bech32
     * @example "stake1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2x"
     */
    stake_address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: MigrateShelleyWalletUnitEnum6;
    };
  }[];
  /**
   * Current transaction status.
   *
   *   ```
   *          *---------*          *-----------*
   *          |         |---------->  EXPIRED  |
   *          |         |  (ttl)   *-----------*
   *   -------> PENDING |
   *          |         <----------------*
   *          |         |                |
   *          *---------*            (rollback)
   *               |                     |
   *          (in ledger)          *-----------*
   *               |               |           |
   *               *---------------> IN_LEDGER |
   *                               |           |
   *                               *-----------*
   *   ```
   */
  status: MigrateShelleyWalletStatusEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
}[];

/** no_such_wallet not_acceptable unsupported_media_type */
export type MigrateShelleyWalletError =
  | (
      | {
          /** May occur when trying to migrate a wallet that is empty or full of dust. */
          message: string;
          code: MigrateShelleyWalletCodeEnum;
        }
      | {
          /** May occur when an action require a signing key but the wallet has only access to verification keys. */
          message: string;
          code: MigrateShelleyWalletCodeEnum1;
        }
      | {
          /** May occur when the given spending passphrase is wrong. */
          message: string;
          code: MigrateShelleyWalletCodeEnum2;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: MigrateShelleyWalletCodeEnum3;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: MigrateShelleyWalletCodeEnum4;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: MigrateShelleyWalletCodeEnum5;
    };

export enum GetShelleyWalletMigrationInfoUnitEnum {
  Lovelace = "lovelace",
}

export enum GetShelleyWalletMigrationInfoUnitEnum1 {
  Lovelace = "lovelace",
}

export enum GetShelleyWalletMigrationInfoCodeEnum {
  NothingToMigrate = "nothing_to_migrate",
}

export enum GetShelleyWalletMigrationInfoCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum GetShelleyWalletMigrationInfoCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export interface GetShelleyWalletMigrationInfoParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface GetShelleyWalletMigrationInfoData {
  /** Total amount which will be paid as fees for the migration. */
  migration_cost: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: GetShelleyWalletMigrationInfoUnitEnum;
  };
  /** Leftovers dust coins which won't be migrated nor spent as fees. */
  leftovers: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: GetShelleyWalletMigrationInfoUnitEnum1;
  };
}

/** nothing_to_migrate no_such_wallet not_acceptable */
export type GetShelleyWalletMigrationInfoError =
  | {
      /** May occur when trying to migrate a wallet that is empty or full of dust. */
      message: string;
      code: GetShelleyWalletMigrationInfoCodeEnum;
    }
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: GetShelleyWalletMigrationInfoCodeEnum1;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: GetShelleyWalletMigrationInfoCodeEnum2;
    };

export enum PostByronWalletUnitEnum {
  Lovelace = "lovelace",
}

export enum PostByronWalletUnitEnum1 {
  Lovelace = "lovelace",
}

/**
 * Mechanism used for discovering addresses.
 * @example "sequential"
 */
export enum PostByronWalletDiscoveryEnum {
  Random = "random",
  Sequential = "sequential",
}

export enum PostByronWalletStatusEnum {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum PostByronWalletUnitEnum2 {
  Percent = "percent",
}

/** @example "block" */
export enum PostByronWalletUnitEnum3 {
  Block = "block",
}

export enum PostByronWalletCodeEnum {
  BadRequest = "bad_request",
}

export enum PostByronWalletCodeEnum1 {
  NotAcceptable = "not_acceptable",
}

export enum PostByronWalletStyleEnum {
  Random = "random",
}

export enum PostByronWalletStyleEnum1 {
  Icarus = "icarus",
}

export enum PostByronWalletStyleEnum2 {
  Trezor = "trezor",
}

export enum PostByronWalletStyleEnum3 {
  Ledger = "ledger",
}

export enum PostByronWalletStyleEnum4 {
  Random = "random",
}

/** Restore from account public key */
export type PostByronWalletPayload =
  | {
      style?: PostByronWalletStyleEnum;
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
       * @minLength 10
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * A list of mnemonic words
       * @maxItems 24
       * @minItems 12
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      mnemonic_sentence: string[];
    }
  | {
      style?: PostByronWalletStyleEnum1;
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
       * @minLength 10
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * A list of mnemonic words
       * @maxItems 24
       * @minItems 12
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      mnemonic_sentence: string[];
    }
  | {
      style?: PostByronWalletStyleEnum2;
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
       * @minLength 10
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * A list of mnemonic words
       * @maxItems 24
       * @minItems 12
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      mnemonic_sentence: string[];
    }
  | {
      style?: PostByronWalletStyleEnum3;
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
       * @minLength 10
       * @maxLength 255
       * @example "Secure Passphrase"
       */
      passphrase: string;
      /**
       * A list of mnemonic words
       * @maxItems 24
       * @minItems 12
       * @example ["squirrel","material","silly","twice","direct","slush","pistol","razor","become","junk","kingdom","flee","squirrel","silly","twice"]
       */
      mnemonic_sentence: string[];
    }
  | {
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * An extended account public key (public key + chain code)
       * @format hex
       * @minLength 128
       * @maxLength 128
       * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db11423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
       */
      account_public_key: string;
      /**
       * Number of consecutive unused addresses allowed.
       *
       * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
       * your wallet in a different software which is strictly following BIP-44.
       *
       * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
       * @min 10
       * @max 100000
       * @default 20
       * @example 20
       */
      address_pool_gap?: number;
    }
  | {
      style?: PostByronWalletStyleEnum4;
      /**
       * @minLength 1
       * @maxLength 255
       * @example "Alan's Wallet"
       */
      name: string;
      /**
       * A root private key, encrypted using a given passphrase. The underlying key should contain:
       * - A private key
       * - A chain code
       * - A public key
       * @deprecated
       * @format hex
       * @minLength 256
       * @maxLength 256
       */
      encrypted_root_private_key: string;
      /**
       * A hash of master passphrase. The hash should be an output of a Scrypt function with the following parameters:
       * - logN = 14
       * - r = 8
       * - p = 1
       * @deprecated
       * @format hex
       * @example "31347c387c317c574342652b796362417576356c2b4258676a344a314c6343675375414c2f5653393661364e576a2b7550766655513d3d7c2f376738486c59723174734e394f6e4e753253302b6a65515a6b5437316b45414941366a515867386539493d"
       */
      passphrase_hash: string;
    };

export interface PostByronWalletData {
  /**
   * A unique identifier for the wallet
   * @format hex
   * @minLength 40
   * @maxLength 40
   * @example "2512a00e9653fe49a44a5886202e24d77eeb998f"
   */
  id: string;
  /** Byron wallet's current balance(s) */
  balance: {
    /** Available balance (funds that can be spent) */
    available: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostByronWalletUnitEnum;
    };
    /** Total balance (available balance plus pending change) */
    total: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostByronWalletUnitEnum1;
    };
  };
  /**
   * Mechanism used for discovering addresses.
   * @example "sequential"
   */
  discovery: PostByronWalletDiscoveryEnum;
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /** Information about the wallet's passphrase */
  passphrase?: {
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_updated_at: string;
  };
  /**
   * Whether a wallet is ready to use or still syncing
   * @example {"status":"ready"}
   */
  state: {
    status: PostByronWalletStatusEnum;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: PostByronWalletUnitEnum2;
    };
  };
  /** A reference to a particular time slot, and the block height at that point. */
  tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: PostByronWalletUnitEnum3;
    };
  };
}

/** bad_request not_acceptable */
export type PostByronWalletError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PostByronWalletCodeEnum;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PostByronWalletCodeEnum1;
    }
  | {
      /** A descriptive error message. */
      message: string;
      /**
       * A specific error code for this error, more precise than HTTP ones.
       * @example "an_error_code"
       */
      code: string;
    };

export enum ListByronWalletsUnitEnum {
  Lovelace = "lovelace",
}

export enum ListByronWalletsUnitEnum1 {
  Lovelace = "lovelace",
}

/**
 * Mechanism used for discovering addresses.
 * @example "sequential"
 */
export enum ListByronWalletsDiscoveryEnum {
  Random = "random",
  Sequential = "sequential",
}

export enum ListByronWalletsStatusEnum {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum ListByronWalletsUnitEnum2 {
  Percent = "percent",
}

/** @example "block" */
export enum ListByronWalletsUnitEnum3 {
  Block = "block",
}

export enum ListByronWalletsCodeEnum {
  NotAcceptable = "not_acceptable",
}

export type ListByronWalletsData = {
  /**
   * A unique identifier for the wallet
   * @format hex
   * @minLength 40
   * @maxLength 40
   * @example "2512a00e9653fe49a44a5886202e24d77eeb998f"
   */
  id: string;
  /** Byron wallet's current balance(s) */
  balance: {
    /** Available balance (funds that can be spent) */
    available: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListByronWalletsUnitEnum;
    };
    /** Total balance (available balance plus pending change) */
    total: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListByronWalletsUnitEnum1;
    };
  };
  /**
   * Mechanism used for discovering addresses.
   * @example "sequential"
   */
  discovery: ListByronWalletsDiscoveryEnum;
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /** Information about the wallet's passphrase */
  passphrase?: {
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_updated_at: string;
  };
  /**
   * Whether a wallet is ready to use or still syncing
   * @example {"status":"ready"}
   */
  state: {
    status: ListByronWalletsStatusEnum;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: ListByronWalletsUnitEnum2;
    };
  };
  /** A reference to a particular time slot, and the block height at that point. */
  tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ListByronWalletsUnitEnum3;
    };
  };
}[];

/** not_acceptable */
export type ListByronWalletsError = {
  /** May occur when providing an invalid 'Accept' header. */
  message: string;
  code: ListByronWalletsCodeEnum;
};

export enum GetByronUTxOsStatisticsUnitEnum {
  Lovelace = "lovelace",
}

export enum GetByronUTxOsStatisticsScaleEnum {
  Log10 = "log10",
}

export enum GetByronUTxOsStatisticsCodeEnum {
  NoSuchWallet = "no_such_wallet",
}

export enum GetByronUTxOsStatisticsCodeEnum1 {
  NotAcceptable = "not_acceptable",
}

export interface GetByronUTxOsStatisticsParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

/** @example {"total":{"quantity":42000000,"unit":"lovelace"},"scale":"log10","distribution":{"10":1,"100":0,"1000":8,"10000":14,"100000":32,"1000000":3,"10000000":0,"100000000":12,"1000000000":0,"10000000000":0,"100000000000":0,"1000000000000":0,"10000000000000":0,"100000000000000":0,"1000000000000000":0,"10000000000000000":0,"45000000000000000":0}} */
export interface GetByronUTxOsStatisticsData {
  /** Coins, in Lovelace */
  total: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: GetByronUTxOsStatisticsUnitEnum;
  };
  scale: GetByronUTxOsStatisticsScaleEnum;
  distribution: Record<string, number>;
}

/** no_such_wallet not_acceptable */
export type GetByronUTxOsStatisticsError =
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: GetByronUTxOsStatisticsCodeEnum;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: GetByronUTxOsStatisticsCodeEnum1;
    };

export enum GetByronWalletUnitEnum {
  Lovelace = "lovelace",
}

export enum GetByronWalletUnitEnum1 {
  Lovelace = "lovelace",
}

/**
 * Mechanism used for discovering addresses.
 * @example "sequential"
 */
export enum GetByronWalletDiscoveryEnum {
  Random = "random",
  Sequential = "sequential",
}

export enum GetByronWalletStatusEnum {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum GetByronWalletUnitEnum2 {
  Percent = "percent",
}

/** @example "block" */
export enum GetByronWalletUnitEnum3 {
  Block = "block",
}

export enum GetByronWalletCodeEnum {
  NotAcceptable = "not_acceptable",
}

export interface GetByronWalletParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface GetByronWalletData {
  /**
   * A unique identifier for the wallet
   * @format hex
   * @minLength 40
   * @maxLength 40
   * @example "2512a00e9653fe49a44a5886202e24d77eeb998f"
   */
  id: string;
  /** Byron wallet's current balance(s) */
  balance: {
    /** Available balance (funds that can be spent) */
    available: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: GetByronWalletUnitEnum;
    };
    /** Total balance (available balance plus pending change) */
    total: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: GetByronWalletUnitEnum1;
    };
  };
  /**
   * Mechanism used for discovering addresses.
   * @example "sequential"
   */
  discovery: GetByronWalletDiscoveryEnum;
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /** Information about the wallet's passphrase */
  passphrase?: {
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_updated_at: string;
  };
  /**
   * Whether a wallet is ready to use or still syncing
   * @example {"status":"ready"}
   */
  state: {
    status: GetByronWalletStatusEnum;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: GetByronWalletUnitEnum2;
    };
  };
  /** A reference to a particular time slot, and the block height at that point. */
  tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: GetByronWalletUnitEnum3;
    };
  };
}

/** not_acceptable */
export type GetByronWalletError =
  | {
      /** A descriptive error message. */
      message: string;
      /**
       * A specific error code for this error, more precise than HTTP ones.
       * @example "an_error_code"
       */
      code: string;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: GetByronWalletCodeEnum;
    };

export enum DeleteByronWalletCodeEnum {
  BadRequest = "bad_request",
}

export enum DeleteByronWalletCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum DeleteByronWalletCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export interface DeleteByronWalletParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export type DeleteByronWalletData = any;

/** bad_request no_such_wallet not_acceptable */
export type DeleteByronWalletError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: DeleteByronWalletCodeEnum;
    }
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: DeleteByronWalletCodeEnum1;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: DeleteByronWalletCodeEnum2;
    };

export enum PutByronWalletUnitEnum {
  Lovelace = "lovelace",
}

export enum PutByronWalletUnitEnum1 {
  Lovelace = "lovelace",
}

export enum PutByronWalletUnitEnum2 {
  Lovelace = "lovelace",
}

export enum PutByronWalletStatusEnum {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum PutByronWalletStatusEnum1 {
  NotDelegating = "not_delegating",
  Delegating = "delegating",
}

export enum PutByronWalletStatusEnum2 {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum PutByronWalletUnitEnum3 {
  Percent = "percent",
}

/** @example "block" */
export enum PutByronWalletUnitEnum4 {
  Block = "block",
}

export enum PutByronWalletCodeEnum {
  BadRequest = "bad_request",
}

export enum PutByronWalletCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum PutByronWalletCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export enum PutByronWalletCodeEnum3 {
  UnsupportedMediaType = "unsupported_media_type",
}

export interface PutByronWalletPayload {
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name?: string;
}

export interface PutByronWalletParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface PutByronWalletData {
  /**
   * A unique identifier for the wallet
   * @format hex
   * @minLength 40
   * @maxLength 40
   * @example "2512a00e9653fe49a44a5886202e24d77eeb998f"
   */
  id: string;
  /**
   * Number of consecutive unused addresses allowed.
   *
   * **IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore
   * your wallet in a different software which is strictly following BIP-44.
   *
   * Beside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.
   * @min 10
   * @max 100000
   * @default 20
   * @example 20
   */
  address_pool_gap: number;
  /** Wallet current balance(s) */
  balance: {
    /** Available UTxO balance (funds that can be spent without condition). */
    available: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PutByronWalletUnitEnum;
    };
    /** The balance of the reward account for this wallet. */
    reward: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PutByronWalletUnitEnum1;
    };
    /** Total balance (available balance plus pending change and reward balance). */
    total: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PutByronWalletUnitEnum2;
    };
  };
  /** Delegation settings */
  delegation: {
    /**
     * Currently active delegation status.
     * @example {"status":"delegating","target":"1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"}
     */
    active: {
      status: PutByronWalletStatusEnum;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
    };
    next: {
      status: PutByronWalletStatusEnum1;
      /**
       * A unique Stake-Pool identifier (present only if status = `delegating`)
       * @format hex|bech32
       * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
       */
      target?: string;
      changes_at: {
        /**
         * An epoch is a time period which is divided into slots.
         * @min 0
         * @example 14
         */
        epoch_number: number;
        /**
         * @format iso-8601-date-and-time
         * @example "2019-02-27T14:46:45Z"
         */
        epoch_start_time: string;
      };
    }[];
  };
  /**
   * @minLength 1
   * @maxLength 255
   * @example "Alan's Wallet"
   */
  name: string;
  /** Information about the wallet's passphrase */
  passphrase?: {
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    last_updated_at: string;
  };
  /**
   * Whether a wallet is ready to use or still syncing
   * @example {"status":"ready"}
   */
  state: {
    status: PutByronWalletStatusEnum2;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: PutByronWalletUnitEnum3;
    };
  };
  /** A reference to a particular time slot, and the block height at that point. */
  tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: PutByronWalletUnitEnum4;
    };
  };
}

/** bad_request no_such_wallet not_acceptable unsupported_media_type */
export type PutByronWalletError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PutByronWalletCodeEnum;
    }
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: PutByronWalletCodeEnum1;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PutByronWalletCodeEnum2;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: PutByronWalletCodeEnum3;
    };

export enum PutByronWalletPassphraseCodeEnum {
  BadRequest = "bad_request",
}

export enum PutByronWalletPassphraseCodeEnum1 {
  NoRootKey = "no_root_key",
}

export enum PutByronWalletPassphraseCodeEnum2 {
  WrongEncryptionPassphrase = "wrong_encryption_passphrase",
}

export enum PutByronWalletPassphraseCodeEnum3 {
  NoSuchWallet = "no_such_wallet",
}

export enum PutByronWalletPassphraseCodeEnum4 {
  NotAcceptable = "not_acceptable",
}

export enum PutByronWalletPassphraseCodeEnum5 {
  UnsupportedMediaType = "unsupported_media_type",
}

export interface PutByronWalletPassphrasePayload {
  /**
   * The current passphrase if present.
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  old_passphrase?: string;
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds).
   * @minLength 10
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  new_passphrase: string;
}

export interface PutByronWalletPassphraseParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export type PutByronWalletPassphraseData = any;

/** bad_request no_such_wallet not_acceptable unsupported_media_type */
export type PutByronWalletPassphraseError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PutByronWalletPassphraseCodeEnum;
    }
  | (
      | {
          /** May occur when an action require a signing key but the wallet has only access to verification keys. */
          message: string;
          code: PutByronWalletPassphraseCodeEnum1;
        }
      | {
          /** May occur when the given spending passphrase is wrong. */
          message: string;
          code: PutByronWalletPassphraseCodeEnum2;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: PutByronWalletPassphraseCodeEnum3;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PutByronWalletPassphraseCodeEnum4;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: PutByronWalletPassphraseCodeEnum5;
    };

export enum CreateAddressStateEnum {
  Used = "used",
  Unused = "unused",
}

export enum CreateAddressCodeEnum {
  BadRequest = "bad_request",
}

export enum CreateAddressCodeEnum1 {
  NotAcceptable = "not_acceptable",
}

export interface CreateAddressPayload {
  /**
   * A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * An address derivation index.
   * @min 0
   * @max 4294967295
   */
  address_index?: number;
}

export interface CreateAddressParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface CreateAddressData {
  /**
   * @format base58|bech32
   * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
   */
  id: string;
  state: CreateAddressStateEnum;
}

/** bad_request not_acceptable */
export type CreateAddressError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: CreateAddressCodeEnum;
    }
  | {
      /** A descriptive error message. */
      message: string;
      /**
       * A specific error code for this error, more precise than HTTP ones.
       * @example "an_error_code"
       */
      code: string;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: CreateAddressCodeEnum1;
    };

export enum ListByronAddressesStateEnum {
  Used = "used",
  Unused = "unused",
}

export enum ListByronAddressesCodeEnum {
  BadRequest = "bad_request",
}

export enum ListByronAddressesCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum ListByronAddressesCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export interface ListByronAddressesParams {
  /** An optional filter on the address state. */
  state?: StateEnum1;
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

/** An optional filter on the address state. */
export enum StateEnum1 {
  Used = "used",
  Unused = "unused",
}

export type ListByronAddressesData = {
  /**
   * @format base58|bech32
   * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
   */
  id: string;
  state: ListByronAddressesStateEnum;
}[];

/** bad_request no_such_wallet not_acceptable */
export type ListByronAddressesError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: ListByronAddressesCodeEnum;
    }
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: ListByronAddressesCodeEnum1;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: ListByronAddressesCodeEnum2;
    };

/** An optional filter on the address state. */
export enum ListByronAddressesParams1StateEnum {
  Used = "used",
  Unused = "unused",
}

export enum ImportAddressesCodeEnum {
  BadRequest = "bad_request",
}

export interface ImportAddressesPayload {
  /**
   * The imported addresses.
   * @minItems 1
   */
  addresses: string[];
}

export interface ImportAddressesParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export type ImportAddressesData = any;

/** bad_request */
export type ImportAddressesError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: ImportAddressesCodeEnum;
    }
  | {
      /** A descriptive error message. */
      message: string;
      /**
       * A specific error code for this error, more precise than HTTP ones.
       * @example "an_error_code"
       */
      code: string;
    };

export enum ImportAddressCodeEnum {
  BadRequest = "bad_request",
}

export interface ImportAddressParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
  /**
   * @format base58
   * @example "DdzFFzCqrhtCNjPk5Lei7E1FxnoqMoAYtJ8VjAWbFmDb614nNBWBwv3kt6QHJa59cGezzf6piMWsbK7sWRB5sv325QqWdRuusMqqLdMt"
   */
  addressId: string;
}

export type ImportAddressData = any;

/** bad_request */
export type ImportAddressError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: ImportAddressCodeEnum;
    }
  | {
      /** A descriptive error message. */
      message: string;
      /**
       * A specific error code for this error, more precise than HTTP ones.
       * @example "an_error_code"
       */
      code: string;
    };

export enum PostByronTransactionFeeUnitEnum {
  Lovelace = "lovelace",
}

export enum PostByronTransactionFeeUnitEnum1 {
  Lovelace = "lovelace",
}

export enum PostByronTransactionFeeCodeEnum {
  BadRequest = "bad_request",
}

export enum PostByronTransactionFeeCodeEnum1 {
  InvalidWalletType = "invalid_wallet_type",
}

export enum PostByronTransactionFeeCodeEnum2 {
  AlreadyWithdrawing = "already_withdrawing",
}

export enum PostByronTransactionFeeCodeEnum3 {
  UtxoTooSmall = "utxo_too_small",
}

export enum PostByronTransactionFeeCodeEnum4 {
  CannotCoverFee = "cannot_cover_fee",
}

export enum PostByronTransactionFeeCodeEnum5 {
  NotEnoughMoney = "not_enough_money",
}

export enum PostByronTransactionFeeCodeEnum6 {
  InputsDepleted = "inputs_depleted",
}

export enum PostByronTransactionFeeCodeEnum7 {
  InvalidCoinSelection = "invalid_coin_selection",
}

export enum PostByronTransactionFeeCodeEnum8 {
  TransactionIsTooBig = "transaction_is_too_big",
}

export enum PostByronTransactionFeeCodeEnum9 {
  NoSuchWallet = "no_such_wallet",
}

export enum PostByronTransactionFeeCodeEnum10 {
  NotAcceptable = "not_acceptable",
}

export enum PostByronTransactionFeeCodeEnum11 {
  UnsupportedMediaType = "unsupported_media_type",
}

export enum PostByronTransactionFeeUnitEnum2 {
  Lovelace = "lovelace",
}

export interface PostByronTransactionFeePayload {
  /**
   * A list of target outputs
   * @minItems 0
   */
  payments: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostByronTransactionFeeUnitEnum2;
    };
  }[];
}

export interface PostByronTransactionFeeParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface PostByronTransactionFeeData {
  /** Coins, in Lovelace */
  estimated_min: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: PostByronTransactionFeeUnitEnum;
  };
  /** Coins, in Lovelace */
  estimated_max: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: PostByronTransactionFeeUnitEnum1;
  };
}

/** no_such_wallet not_acceptable unsupported_media_type */
export type PostByronTransactionFeeError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PostByronTransactionFeeCodeEnum;
    }
  | (
      | {
          /** May occur when trying to perform an operation not supported by this type of wallet. */
          message: string;
          code: PostByronTransactionFeeCodeEnum1;
        }
      | {
          /** May occur when submitting a withdrawal while another withdrawal is pending. */
          message: string;
          code: PostByronTransactionFeeCodeEnum2;
        }
      | {
          /** May occur when a requested output is below the minimum utxo value. */
          message: string;
          code: PostByronTransactionFeeCodeEnum3;
        }
      | {
          /** May occur when a transaction can't be balanced for fees. */
          message: string;
          code: PostByronTransactionFeeCodeEnum4;
        }
      | {
          /** May occur when there's not enough money in the wallet to cover a requested payment. */
          message: string;
          code: PostByronTransactionFeeCodeEnum5;
        }
      | {
          /** May occur when there's enough money to pay for a payment, but not enough UTxO to allow for paying each output independently. */
          message: string;
          code: PostByronTransactionFeeCodeEnum6;
        }
      | {
          /** Should never happen unless the server screwed up with the creation of a coin selection. */
          message: string;
          code: PostByronTransactionFeeCodeEnum7;
        }
      | {
          /** May occur when the wallet can't cover for all requested outputs without making the transaction too large. */
          message: string;
          code: PostByronTransactionFeeCodeEnum8;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: PostByronTransactionFeeCodeEnum9;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PostByronTransactionFeeCodeEnum10;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: PostByronTransactionFeeCodeEnum11;
    };

export enum PostByronTransactionUnitEnum {
  Lovelace = "lovelace",
}

/** @example "block" */
export enum PostByronTransactionUnitEnum1 {
  Block = "block",
}

/** @example "block" */
export enum PostByronTransactionUnitEnum2 {
  Block = "block",
}

/** @example "block" */
export enum PostByronTransactionUnitEnum3 {
  Block = "block",
}

export enum PostByronTransactionDirectionEnum {
  Outgoing = "outgoing",
  Incoming = "incoming",
}

export enum PostByronTransactionUnitEnum4 {
  Lovelace = "lovelace",
}

export enum PostByronTransactionUnitEnum5 {
  Lovelace = "lovelace",
}

export enum PostByronTransactionUnitEnum6 {
  Lovelace = "lovelace",
}

/**
 * Current transaction status.
 *
 *   ```
 *          *---------*          *-----------*
 *          |         |---------->  EXPIRED  |
 *          |         |  (ttl)   *-----------*
 *   -------> PENDING |
 *          |         <----------------*
 *          |         |                |
 *          *---------*            (rollback)
 *               |                     |
 *          (in ledger)          *-----------*
 *               |               |           |
 *               *---------------> IN_LEDGER |
 *                               |           |
 *                               *-----------*
 *   ```
 */
export enum PostByronTransactionStatusEnum {
  Pending = "pending",
  InLedger = "in_ledger",
  Expired = "expired",
}

export enum PostByronTransactionCodeEnum {
  BadRequest = "bad_request",
}

export enum PostByronTransactionCodeEnum1 {
  InvalidWalletType = "invalid_wallet_type",
}

export enum PostByronTransactionCodeEnum2 {
  AlreadyWithdrawing = "already_withdrawing",
}

export enum PostByronTransactionCodeEnum3 {
  UtxoTooSmall = "utxo_too_small",
}

export enum PostByronTransactionCodeEnum4 {
  CannotCoverFee = "cannot_cover_fee",
}

export enum PostByronTransactionCodeEnum5 {
  NotEnoughMoney = "not_enough_money",
}

export enum PostByronTransactionCodeEnum6 {
  TransactionIsTooBig = "transaction_is_too_big",
}

export enum PostByronTransactionCodeEnum7 {
  NoRootKey = "no_root_key",
}

export enum PostByronTransactionCodeEnum8 {
  WrongEncryptionPassphrase = "wrong_encryption_passphrase",
}

export enum PostByronTransactionCodeEnum9 {
  NoSuchWallet = "no_such_wallet",
}

export enum PostByronTransactionCodeEnum10 {
  NotAcceptable = "not_acceptable",
}

export enum PostByronTransactionCodeEnum11 {
  UnsupportedMediaType = "unsupported_media_type",
}

export enum PostByronTransactionUnitEnum7 {
  Lovelace = "lovelace",
}

export interface PostByronTransactionPayload {
  /**
   * A list of target outputs
   * @minItems 0
   */
  payments: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostByronTransactionUnitEnum7;
    };
  }[];
  /**
   * The wallet's master passphrase.
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
}

export interface PostByronTransactionParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface PostByronTransactionData {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
  /** Coins, in Lovelace */
  amount: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: PostByronTransactionUnitEnum;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Absolute time at which the transaction was inserted in a block.
   */
  inserted_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: PostByronTransactionUnitEnum1;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending OR status == expired
   * </span><br/>
   * Absolute time and slot at which the pending transaction TTL (time to live) will lapse.
   */
  expires_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending
   * </span><br/>
   * The point in time at which a transaction became pending.
   */
  pending_since?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: PostByronTransactionUnitEnum2;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Current depth of the transaction in the local chain
   */
  depth?: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: PostByronTransactionUnitEnum3;
  };
  direction: PostByronTransactionDirectionEnum;
  /**
   * A list of transaction inputs
   * @minItems 0
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address?: string;
    /** Coins, in Lovelace */
    amount?: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostByronTransactionUnitEnum4;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostByronTransactionUnitEnum5;
    };
  }[];
  /**
   * A list of withdrawals from stake addresses.
   * @minItems 0
   */
  withdrawals: {
    /**
     * @format bech32
     * @example "stake1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2x"
     */
    stake_address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: PostByronTransactionUnitEnum6;
    };
  }[];
  /**
   * Current transaction status.
   *
   *   ```
   *          *---------*          *-----------*
   *          |         |---------->  EXPIRED  |
   *          |         |  (ttl)   *-----------*
   *   -------> PENDING |
   *          |         <----------------*
   *          |         |                |
   *          *---------*            (rollback)
   *               |                     |
   *          (in ledger)          *-----------*
   *               |               |           |
   *               *---------------> IN_LEDGER |
   *                               |           |
   *                               *-----------*
   *   ```
   */
  status: PostByronTransactionStatusEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
}

/** no_such_wallet not_acceptable unsupported_media_type */
export type PostByronTransactionError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PostByronTransactionCodeEnum;
    }
  | (
      | {
          /** May occur when trying to perform an operation not supported by this type of wallet. */
          message: string;
          code: PostByronTransactionCodeEnum1;
        }
      | {
          /** May occur when submitting a withdrawal while another withdrawal is pending. */
          message: string;
          code: PostByronTransactionCodeEnum2;
        }
      | {
          /** May occur when a requested output is below the minimum utxo value. */
          message: string;
          code: PostByronTransactionCodeEnum3;
        }
      | {
          /** May occur when a transaction can't be balanced for fees. */
          message: string;
          code: PostByronTransactionCodeEnum4;
        }
      | {
          /** May occur when there's not enough money in the wallet to cover a requested payment. */
          message: string;
          code: PostByronTransactionCodeEnum5;
        }
      | {
          /** May occur when the wallet can't cover for all requested outputs without making the transaction too large. */
          message: string;
          code: PostByronTransactionCodeEnum6;
        }
      | {
          /** May occur when an action require a signing key but the wallet has only access to verification keys. */
          message: string;
          code: PostByronTransactionCodeEnum7;
        }
      | {
          /** May occur when the given spending passphrase is wrong. */
          message: string;
          code: PostByronTransactionCodeEnum8;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: PostByronTransactionCodeEnum9;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PostByronTransactionCodeEnum10;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: PostByronTransactionCodeEnum11;
    };

export enum ListByronTransactionsUnitEnum {
  Lovelace = "lovelace",
}

/** @example "block" */
export enum ListByronTransactionsUnitEnum1 {
  Block = "block",
}

/** @example "block" */
export enum ListByronTransactionsUnitEnum2 {
  Block = "block",
}

/** @example "block" */
export enum ListByronTransactionsUnitEnum3 {
  Block = "block",
}

export enum ListByronTransactionsDirectionEnum {
  Outgoing = "outgoing",
  Incoming = "incoming",
}

export enum ListByronTransactionsUnitEnum4 {
  Lovelace = "lovelace",
}

export enum ListByronTransactionsUnitEnum5 {
  Lovelace = "lovelace",
}

export enum ListByronTransactionsUnitEnum6 {
  Lovelace = "lovelace",
}

/**
 * Current transaction status.
 *
 *   ```
 *          *---------*          *-----------*
 *          |         |---------->  EXPIRED  |
 *          |         |  (ttl)   *-----------*
 *   -------> PENDING |
 *          |         <----------------*
 *          |         |                |
 *          *---------*            (rollback)
 *               |                     |
 *          (in ledger)          *-----------*
 *               |               |           |
 *               *---------------> IN_LEDGER |
 *                               |           |
 *                               *-----------*
 *   ```
 */
export enum ListByronTransactionsStatusEnum {
  Pending = "pending",
  InLedger = "in_ledger",
  Expired = "expired",
}

export enum ListByronTransactionsCodeEnum {
  MinWithdrawalWrong = "min_withdrawal_wrong",
}

export enum ListByronTransactionsCodeEnum1 {
  StartTimeLaterThanEndTime = "start_time_later_than_end_time",
}

export enum ListByronTransactionsCodeEnum2 {
  NoSuchWallet = "no_such_wallet",
}

export enum ListByronTransactionsCodeEnum3 {
  NotAcceptable = "not_acceptable",
}

export interface ListByronTransactionsParams {
  /**
   * An optional start time in ISO 8601 date-and-time format. Basic and
   * extended formats are both accepted. Times can be local (with a
   * timezone offset) or UTC.
   *
   * If both a start time and an end time are specified, then the start
   * time must not be later than the end time.
   *
   * Example: `2008-08-08T08:08:08Z`
   * @format ISO 8601
   */
  start?: string;
  /**
   * An optional end time in ISO 8601 date-and-time format. Basic and
   * extended formats are both accepted. Times can be local (with a
   * timezone offset) or UTC.
   *
   * If both a start time and an end time are specified, then the start
   * time must not be later than the end time.
   *
   * Example: `2008-08-08T08:08:08Z`
   * @format ISO 8601
   */
  end?: string;
  /**
   * An optional sort order.
   * @default "descending"
   */
  order?: OrderEnum1;
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

/**
 * An optional sort order.
 * @default "descending"
 */
export enum OrderEnum1 {
  Ascending = "ascending",
  Descending = "descending",
}

export type ListByronTransactionsData = {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
  /** Coins, in Lovelace */
  amount: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: ListByronTransactionsUnitEnum;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Absolute time at which the transaction was inserted in a block.
   */
  inserted_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ListByronTransactionsUnitEnum1;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending OR status == expired
   * </span><br/>
   * Absolute time and slot at which the pending transaction TTL (time to live) will lapse.
   */
  expires_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending
   * </span><br/>
   * The point in time at which a transaction became pending.
   */
  pending_since?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: ListByronTransactionsUnitEnum2;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Current depth of the transaction in the local chain
   */
  depth?: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: ListByronTransactionsUnitEnum3;
  };
  direction: ListByronTransactionsDirectionEnum;
  /**
   * A list of transaction inputs
   * @minItems 0
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address?: string;
    /** Coins, in Lovelace */
    amount?: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListByronTransactionsUnitEnum4;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListByronTransactionsUnitEnum5;
    };
  }[];
  /**
   * A list of withdrawals from stake addresses.
   * @minItems 0
   */
  withdrawals: {
    /**
     * @format bech32
     * @example "stake1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2x"
     */
    stake_address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ListByronTransactionsUnitEnum6;
    };
  }[];
  /**
   * Current transaction status.
   *
   *   ```
   *          *---------*          *-----------*
   *          |         |---------->  EXPIRED  |
   *          |         |  (ttl)   *-----------*
   *   -------> PENDING |
   *          |         <----------------*
   *          |         |                |
   *          *---------*            (rollback)
   *               |                     |
   *          (in ledger)          *-----------*
   *               |               |           |
   *               *---------------> IN_LEDGER |
   *                               |           |
   *                               *-----------*
   *   ```
   */
  status: ListByronTransactionsStatusEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
}[];

/** no_such_wallet not_acceptable */
export type ListByronTransactionsError =
  | (
      | {
          /** May occur when trying to withdraw less than the minimal UTxO value. */
          message: string;
          code: ListByronTransactionsCodeEnum;
        }
      | {
          /** May occur when a provided time-range is unsound. */
          message: string;
          code: ListByronTransactionsCodeEnum1;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: ListByronTransactionsCodeEnum2;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: ListByronTransactionsCodeEnum3;
    };

/**
 * An optional sort order.
 * @default "descending"
 */
export enum ListByronTransactionsParams1OrderEnum {
  Ascending = "ascending",
  Descending = "descending",
}

export enum GetByronTransactionUnitEnum {
  Lovelace = "lovelace",
}

/** @example "block" */
export enum GetByronTransactionUnitEnum1 {
  Block = "block",
}

/** @example "block" */
export enum GetByronTransactionUnitEnum2 {
  Block = "block",
}

/** @example "block" */
export enum GetByronTransactionUnitEnum3 {
  Block = "block",
}

export enum GetByronTransactionDirectionEnum {
  Outgoing = "outgoing",
  Incoming = "incoming",
}

export enum GetByronTransactionUnitEnum4 {
  Lovelace = "lovelace",
}

export enum GetByronTransactionUnitEnum5 {
  Lovelace = "lovelace",
}

export enum GetByronTransactionUnitEnum6 {
  Lovelace = "lovelace",
}

/**
 * Current transaction status.
 *
 *   ```
 *          *---------*          *-----------*
 *          |         |---------->  EXPIRED  |
 *          |         |  (ttl)   *-----------*
 *   -------> PENDING |
 *          |         <----------------*
 *          |         |                |
 *          *---------*            (rollback)
 *               |                     |
 *          (in ledger)          *-----------*
 *               |               |           |
 *               *---------------> IN_LEDGER |
 *                               |           |
 *                               *-----------*
 *   ```
 */
export enum GetByronTransactionStatusEnum {
  Pending = "pending",
  InLedger = "in_ledger",
  Expired = "expired",
}

export enum GetByronTransactionCodeEnum {
  NoSuchWallet = "no_such_wallet",
}

export enum GetByronTransactionCodeEnum1 {
  NoSuchTransaction = "no_such_transaction",
}

export enum GetByronTransactionCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export interface GetByronTransactionParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
  /**
   * @format hex
   * @minLength 64
   * @maxLength 64
   */
  transactionId: string;
}

export interface GetByronTransactionData {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
  /** Coins, in Lovelace */
  amount: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: GetByronTransactionUnitEnum;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Absolute time at which the transaction was inserted in a block.
   */
  inserted_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: GetByronTransactionUnitEnum1;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending OR status == expired
   * </span><br/>
   * Absolute time and slot at which the pending transaction TTL (time to live) will lapse.
   */
  expires_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending
   * </span><br/>
   * The point in time at which a transaction became pending.
   */
  pending_since?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: GetByronTransactionUnitEnum2;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Current depth of the transaction in the local chain
   */
  depth?: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: GetByronTransactionUnitEnum3;
  };
  direction: GetByronTransactionDirectionEnum;
  /**
   * A list of transaction inputs
   * @minItems 0
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address?: string;
    /** Coins, in Lovelace */
    amount?: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: GetByronTransactionUnitEnum4;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: GetByronTransactionUnitEnum5;
    };
  }[];
  /**
   * A list of withdrawals from stake addresses.
   * @minItems 0
   */
  withdrawals: {
    /**
     * @format bech32
     * @example "stake1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2x"
     */
    stake_address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: GetByronTransactionUnitEnum6;
    };
  }[];
  /**
   * Current transaction status.
   *
   *   ```
   *          *---------*          *-----------*
   *          |         |---------->  EXPIRED  |
   *          |         |  (ttl)   *-----------*
   *   -------> PENDING |
   *          |         <----------------*
   *          |         |                |
   *          *---------*            (rollback)
   *               |                     |
   *          (in ledger)          *-----------*
   *               |               |           |
   *               *---------------> IN_LEDGER |
   *                               |           |
   *                               *-----------*
   *   ```
   */
  status: GetByronTransactionStatusEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
}

/** not_acceptable */
export type GetByronTransactionError =
  | (
      | {
          /**
           * May occur when a given walletId does not match with any known
           * wallets (because it has been deleted, or has never existed).
           */
          message: string;
          code: GetByronTransactionCodeEnum;
        }
      | {
          /** May occur when a given transactionId does not match with any known transactions. */
          message: string;
          code: GetByronTransactionCodeEnum1;
        }
    )
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: GetByronTransactionCodeEnum2;
    };

export enum DeleteByronTransactionCodeEnum {
  TransactionAlreadyInLedger = "transaction_already_in_ledger",
}

export enum DeleteByronTransactionCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum DeleteByronTransactionCodeEnum2 {
  NoSuchTransaction = "no_such_transaction",
}

export enum DeleteByronTransactionCodeEnum3 {
  NotAcceptable = "not_acceptable",
}

export interface DeleteByronTransactionParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
  /**
   * @format hex
   * @minLength 64
   * @maxLength 64
   */
  transactionId: string;
}

export type DeleteByronTransactionData = any;

/** transaction_already_in_ledger not_acceptable */
export type DeleteByronTransactionError =
  | {
      /** Occurs when attempting to delete a transaction which is neither pending nor expired. */
      message: string;
      code: DeleteByronTransactionCodeEnum;
    }
  | (
      | {
          /**
           * May occur when a given walletId does not match with any known
           * wallets (because it has been deleted, or has never existed).
           */
          message: string;
          code: DeleteByronTransactionCodeEnum1;
        }
      | {
          /** May occur when a given transactionId does not match with any known transactions. */
          message: string;
          code: DeleteByronTransactionCodeEnum2;
        }
    )
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: DeleteByronTransactionCodeEnum3;
    };

export enum ByronSelectCoinsUnitEnum {
  Lovelace = "lovelace",
}

export enum ByronSelectCoinsUnitEnum1 {
  Lovelace = "lovelace",
}

export enum ByronSelectCoinsUnitEnum2 {
  Lovelace = "lovelace",
}

export enum ByronSelectCoinsCertificateTypeEnum {
  JoinPool = "join_pool",
  QuitPool = "quit_pool",
  RegisterRewardAccount = "register_reward_account",
}

export enum ByronSelectCoinsCodeEnum {
  BadRequest = "bad_request",
}

export enum ByronSelectCoinsCodeEnum1 {
  AlreadyWithdrawing = "already_withdrawing",
}

export enum ByronSelectCoinsCodeEnum2 {
  UtxoTooSmall = "utxo_too_small",
}

export enum ByronSelectCoinsCodeEnum3 {
  NotEnoughMoney = "not_enough_money",
}

export enum ByronSelectCoinsCodeEnum4 {
  CannotCoverFee = "cannot_cover_fee",
}

export enum ByronSelectCoinsCodeEnum5 {
  InputsDepleted = "inputs_depleted",
}

export enum ByronSelectCoinsCodeEnum6 {
  InvalidCoinSelection = "invalid_coin_selection",
}

export enum ByronSelectCoinsCodeEnum7 {
  NoSuchWallet = "no_such_wallet",
}

export enum ByronSelectCoinsCodeEnum8 {
  NotAcceptable = "not_acceptable",
}

export enum ByronSelectCoinsCodeEnum9 {
  UnsupportedMediaType = "unsupported_media_type",
}

export enum ByronSelectCoinsUnitEnum3 {
  Lovelace = "lovelace",
}

export interface ByronSelectCoinsPayload {
  /**
   * A list of target outputs
   * @minItems 0
   */
  payments: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ByronSelectCoinsUnitEnum3;
    };
  }[];
}

export interface ByronSelectCoinsParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface ByronSelectCoinsData {
  /**
   * A list of transaction inputs
   * @minItems 1
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ByronSelectCoinsUnitEnum;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /**
     * A path for deriving a child key from a parent key.
     * @minItems 1
     */
    derivation_path: string[];
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ByronSelectCoinsUnitEnum1;
    };
  }[];
  /**
   * A list of transaction change outputs.
   * @minItems 0
   */
  change: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: ByronSelectCoinsUnitEnum2;
    };
    /**
     * A path for deriving a child key from a parent key.
     * @minItems 1
     */
    derivation_path: string[];
  }[];
  certificates?: {
    certificate_type: ByronSelectCoinsCertificateTypeEnum;
    /**
     * A unique identifier for the pool.
     * @format hex|bech32
     * @example "pool1wqaz0q0zhtxlgn0ewssevn2mrtm30fgh2g7hr7z9rj5856457mm"
     */
    pool?: string;
    /**
     * @maxItems 5
     * @minItems 5
     */
    reward_account_path: string[];
  }[];
}

/** bad_request no_such_wallet not_acceptable unsupported_media_type */
export type ByronSelectCoinsError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: ByronSelectCoinsCodeEnum;
    }
  | (
      | {
          /** May occur when submitting a withdrawal while another withdrawal is pending. */
          message: string;
          code: ByronSelectCoinsCodeEnum1;
        }
      | {
          /** May occur when a requested output is below the minimum utxo value. */
          message: string;
          code: ByronSelectCoinsCodeEnum2;
        }
      | {
          /** May occur when there's not enough money in the wallet to cover a requested payment. */
          message: string;
          code: ByronSelectCoinsCodeEnum3;
        }
      | {
          /** May occur when a transaction can't be balanced for fees. */
          message: string;
          code: ByronSelectCoinsCodeEnum4;
        }
      | {
          /** May occur when there's enough money to pay for a payment, but not enough UTxO to allow for paying each output independently. */
          message: string;
          code: ByronSelectCoinsCodeEnum5;
        }
      | {
          /** Should never happen unless the server screwed up with the creation of a coin selection. */
          message: string;
          code: ByronSelectCoinsCodeEnum6;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: ByronSelectCoinsCodeEnum7;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: ByronSelectCoinsCodeEnum8;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: ByronSelectCoinsCodeEnum9;
    };

export enum MigrateByronWalletUnitEnum {
  Lovelace = "lovelace",
}

/** @example "block" */
export enum MigrateByronWalletUnitEnum1 {
  Block = "block",
}

/** @example "block" */
export enum MigrateByronWalletUnitEnum2 {
  Block = "block",
}

/** @example "block" */
export enum MigrateByronWalletUnitEnum3 {
  Block = "block",
}

export enum MigrateByronWalletDirectionEnum {
  Outgoing = "outgoing",
  Incoming = "incoming",
}

export enum MigrateByronWalletUnitEnum4 {
  Lovelace = "lovelace",
}

export enum MigrateByronWalletUnitEnum5 {
  Lovelace = "lovelace",
}

export enum MigrateByronWalletUnitEnum6 {
  Lovelace = "lovelace",
}

/**
 * Current transaction status.
 *
 *   ```
 *          *---------*          *-----------*
 *          |         |---------->  EXPIRED  |
 *          |         |  (ttl)   *-----------*
 *   -------> PENDING |
 *          |         <----------------*
 *          |         |                |
 *          *---------*            (rollback)
 *               |                     |
 *          (in ledger)          *-----------*
 *               |               |           |
 *               *---------------> IN_LEDGER |
 *                               |           |
 *                               *-----------*
 *   ```
 */
export enum MigrateByronWalletStatusEnum {
  Pending = "pending",
  InLedger = "in_ledger",
  Expired = "expired",
}

export enum MigrateByronWalletCodeEnum {
  NothingToMigrate = "nothing_to_migrate",
}

export enum MigrateByronWalletCodeEnum1 {
  NoRootKey = "no_root_key",
}

export enum MigrateByronWalletCodeEnum2 {
  WrongEncryptionPassphrase = "wrong_encryption_passphrase",
}

export enum MigrateByronWalletCodeEnum3 {
  NoSuchWallet = "no_such_wallet",
}

export enum MigrateByronWalletCodeEnum4 {
  NotAcceptable = "not_acceptable",
}

export enum MigrateByronWalletCodeEnum5 {
  UnsupportedMediaType = "unsupported_media_type",
}

export interface MigrateByronWalletPayload {
  /**
   * The wallet's master passphrase.
   * @minLength 0
   * @maxLength 255
   * @example "Secure Passphrase"
   */
  passphrase: string;
  /**
   * The recipient addresses.
   * @minItems 1
   */
  addresses: string[];
}

export interface MigrateByronWalletParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export type MigrateByronWalletData = {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
  /** Coins, in Lovelace */
  amount: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: MigrateByronWalletUnitEnum;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Absolute time at which the transaction was inserted in a block.
   */
  inserted_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: MigrateByronWalletUnitEnum1;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending OR status == expired
   * </span><br/>
   * Absolute time and slot at which the pending transaction TTL (time to live) will lapse.
   */
  expires_at?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == pending
   * </span><br/>
   * The point in time at which a transaction became pending.
   */
  pending_since?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: MigrateByronWalletUnitEnum2;
    };
  };
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == in_ledger
   * </span><br/>
   * Current depth of the transaction in the local chain
   */
  depth?: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: MigrateByronWalletUnitEnum3;
  };
  direction: MigrateByronWalletDirectionEnum;
  /**
   * A list of transaction inputs
   * @minItems 0
   */
  inputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address?: string;
    /** Coins, in Lovelace */
    amount?: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: MigrateByronWalletUnitEnum4;
    };
    /**
     * A unique identifier for this transaction
     * @format hex
     * @minLength 64
     * @maxLength 64
     * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
     */
    id: string;
    /** @min 0 */
    index: number;
  }[];
  /**
   * A list of target outputs
   * @minItems 0
   */
  outputs: {
    /**
     * @format base58|bech32
     * @example "addr1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2xfvz82xgwh7wal6g2xt8n996s3xvu5g"
     */
    address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: MigrateByronWalletUnitEnum5;
    };
  }[];
  /**
   * A list of withdrawals from stake addresses.
   * @minItems 0
   */
  withdrawals: {
    /**
     * @format bech32
     * @example "stake1sjck9mdmfyhzvjhydcjllgj9vjvl522w0573ncustrrr2rg7h9azg4cyqd36yyd48t5ut72hgld0fg2x"
     */
    stake_address: string;
    /** Coins, in Lovelace */
    amount: {
      /**
       * @min 0
       * @example 42000000
       */
      quantity: number;
      unit: MigrateByronWalletUnitEnum6;
    };
  }[];
  /**
   * Current transaction status.
   *
   *   ```
   *          *---------*          *-----------*
   *          |         |---------->  EXPIRED  |
   *          |         |  (ttl)   *-----------*
   *   -------> PENDING |
   *          |         <----------------*
   *          |         |                |
   *          *---------*            (rollback)
   *               |                     |
   *          (in ledger)          *-----------*
   *               |               |           |
   *               *---------------> IN_LEDGER |
   *                               |           |
   *                               *-----------*
   *   ```
   */
  status: MigrateByronWalletStatusEnum;
  /**
   * Extra application data attached to the transaction.
   *
   * Cardano allows users and developers to embed their own
   * authenticated metadata when submitting transactions. Metadata can
   * be expressed as a JSON object with some restrictions:
   *
   * 1. All top-level keys must be integers between `0` and `2^64 - 1`.
   *
   * 2. Each metadata value is tagged with its type.
   *
   * 3. Strings must be at most 64 bytes when UTF-8 encoded.
   *
   * 4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.
   *
   * Metadata aren't stored as JSON on the Cardano blockchain but are
   * instead stored using a compact binary encoding (CBOR).
   *
   * The binary encoding of metadata values supports three simple types:
   *
   * * Integers in the range `-(2^64 - 1)` to `2^64 - 1`
   * * Strings (UTF-8 encoded)
   * * Bytestrings
   *
   * And two compound types:
   *
   * * Lists of metadata values
   * * Mappings from metadata values to metadata values
   *
   * It is possible to transform any JSON object into this schema.
   *
   * However, if your application uses floating point values, they will
   * need to be converted somehow, according to your
   * requirements. Likewise for `null` or `bool` values. When reading
   * metadata from chain, be aware that integers may exceed the
   * javascript numeric range, and may need special "bigint" parsing.
   * @example {"0":{"string":"cardano"},"1":{"int":14},"2":{"bytes":"2512a00e9653fe49a44a5886202e24d77eeb998f"},"3":{"list":[{"int":14},{"int":42},{"string":"1337"}]},"4":{"map":[{"k":{"string":"key"},"v":{"string":"value"}},{"k":{"int":14},"v":{"int":42}}]}}
   */
  metadata?: Record<string, TransactionMetadataValue>;
}[];

/** no_such_wallet not_acceptable unsupported_media_type */
export type MigrateByronWalletError =
  | (
      | {
          /** May occur when trying to migrate a wallet that is empty or full of dust. */
          message: string;
          code: MigrateByronWalletCodeEnum;
        }
      | {
          /** May occur when an action require a signing key but the wallet has only access to verification keys. */
          message: string;
          code: MigrateByronWalletCodeEnum1;
        }
      | {
          /** May occur when the given spending passphrase is wrong. */
          message: string;
          code: MigrateByronWalletCodeEnum2;
        }
    )
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: MigrateByronWalletCodeEnum3;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: MigrateByronWalletCodeEnum4;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: MigrateByronWalletCodeEnum5;
    };

export enum GetByronWalletMigrationInfoUnitEnum {
  Lovelace = "lovelace",
}

export enum GetByronWalletMigrationInfoUnitEnum1 {
  Lovelace = "lovelace",
}

export enum GetByronWalletMigrationInfoCodeEnum {
  NothingToMigrate = "nothing_to_migrate",
}

export enum GetByronWalletMigrationInfoCodeEnum1 {
  NoSuchWallet = "no_such_wallet",
}

export enum GetByronWalletMigrationInfoCodeEnum2 {
  NotAcceptable = "not_acceptable",
}

export interface GetByronWalletMigrationInfoParams {
  /**
   * @format hex
   * @minLength 40
   * @maxLength 40
   */
  walletId: string;
}

export interface GetByronWalletMigrationInfoData {
  /** Total amount which will be paid as fees for the migration. */
  migration_cost: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: GetByronWalletMigrationInfoUnitEnum;
  };
  /** Leftovers dust coins which won't be migrated nor spent as fees. */
  leftovers: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: GetByronWalletMigrationInfoUnitEnum1;
  };
}

/** nothing_to_migrate no_such_wallet not_acceptable */
export type GetByronWalletMigrationInfoError =
  | {
      /** May occur when trying to migrate a wallet that is empty or full of dust. */
      message: string;
      code: GetByronWalletMigrationInfoCodeEnum;
    }
  | {
      /**
       * May occur when a given walletId does not match with any known
       * wallets (because it has been deleted, or has never existed).
       */
      message: string;
      code: GetByronWalletMigrationInfoCodeEnum1;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: GetByronWalletMigrationInfoCodeEnum2;
    };

export enum GetNetworkInformationStatusEnum {
  Ready = "ready",
  Syncing = "syncing",
  NotResponding = "not_responding",
}

export enum GetNetworkInformationUnitEnum {
  Percent = "percent",
}

/** @example "block" */
export enum GetNetworkInformationUnitEnum1 {
  Block = "block",
}

export enum GetNetworkInformationCodeEnum {
  NotAcceptable = "not_acceptable",
}

export interface GetNetworkInformationData {
  /**
   * Estimated synchronization progress of the node with the underlying network. Note that this may
   * change quite arbitrarily as the node may switch to shorter or longer chain forks.
   * @example {"status":"ready"}
   */
  sync_progress: {
    status: GetNetworkInformationStatusEnum;
    /**
     * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
     * <strong>if:</strong> status == syncing
     * </span><br/>
     */
    progress?: {
      /**
       * @min 0
       * @max 100
       * @example 42
       */
      quantity: number;
      unit: GetNetworkInformationUnitEnum;
    };
  };
  /** Underlying node's tip */
  node_tip: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
    height: {
      /**
       * @min 0
       * @example 1337
       */
      quantity: number;
      /** @example "block" */
      unit: GetNetworkInformationUnitEnum1;
    };
  };
  /** The time slot corresponding the network tip. */
  network_tip?: {
    /**
     * The 0-based slot index starting from genesis of the blockchain.
     * @min 0
     * @example 8086
     */
    absolute_slot_number: number;
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * The zero-based slot index within an epoch.
     * @min 0
     * @example 1337
     */
    slot_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    time: string;
  };
  next_epoch?: {
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    epoch_start_time: string;
  };
}

/** not_acceptable */
export type GetNetworkInformationError = {
  /** May occur when providing an invalid 'Accept' header. */
  message: string;
  code: GetNetworkInformationCodeEnum;
};

export enum GetNetworkClockStatusEnum {
  Available = "available",
  Unavailable = "unavailable",
  Pending = "pending",
}

export enum GetNetworkClockUnitEnum {
  Microsecond = "microsecond",
}

export enum GetNetworkClockCodeEnum {
  NotAcceptable = "not_acceptable",
}

export interface GetNetworkClockParams {
  /**
   * NTP checks are cached for short duration to avoid sending too many queries to the central NTP servers. In some cases however, a client may want to force a new check.
   *
   * When this flag is set, the request **will block** until NTP server responds or will timeout after a while without any answer from the NTP server.
   */
  forceNtpCheck?: boolean;
}

/**
 * [Network Time Protocol](https://en.wikipedia.org/wiki/Network_Time_Protocol) information of the server.
 *
 * **Important:** This piece of information only makes sense when the server runs on the same host machine as the node.
 */
export interface GetNetworkClockData {
  status: GetNetworkClockStatusEnum;
  /**
   * <span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">
   * <strong>if:</strong> status == available
   * </span><br/>
   * Drift offset of the local clock.
   */
  offset?: {
    /** @example 14 */
    quantity: number;
    unit: GetNetworkClockUnitEnum;
  };
}

/** not_acceptable */
export type GetNetworkClockError = {
  /** May occur when providing an invalid 'Accept' header. */
  message: string;
  code: GetNetworkClockCodeEnum;
};

export enum GetNetworkParametersUnitEnum {
  Second = "second",
}

export enum GetNetworkParametersUnitEnum1 {
  Slot = "slot",
}

/** @example "block" */
export enum GetNetworkParametersUnitEnum2 {
  Block = "block",
}

export enum GetNetworkParametersUnitEnum3 {
  Percent = "percent",
}

export enum GetNetworkParametersUnitEnum4 {
  Percent = "percent",
}

export enum GetNetworkParametersUnitEnum5 {
  Lovelace = "lovelace",
}

export enum GetNetworkParametersCodeEnum {
  NotAcceptable = "not_acceptable",
}

export interface GetNetworkParametersData {
  /**
   * The hash of genesis block
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "3c07030e36bfffe67e2e2ec09e5293d384637cd2f004356ef320f3fe6c52041a"
   */
  genesis_block_hash: string;
  /**
   * @format iso-8601-date-and-time
   * @example "2019-02-27T14:46:45Z"
   */
  blockchain_start_time: string;
  slot_length: {
    /**
     * @min 0
     * @example 10
     */
    quantity: number;
    unit: GetNetworkParametersUnitEnum;
  };
  epoch_length: {
    /**
     * @min 0
     * @example 42000
     */
    quantity: number;
    unit: GetNetworkParametersUnitEnum1;
  };
  epoch_stability: {
    /**
     * @min 0
     * @example 1337
     */
    quantity: number;
    /** @example "block" */
    unit: GetNetworkParametersUnitEnum2;
  };
  active_slot_coefficient: {
    /**
     * @min 0
     * @max 100
     * @example 42
     */
    quantity: number;
    unit: GetNetworkParametersUnitEnum3;
  };
  decentralization_level: {
    /**
     * @min 0
     * @max 100
     * @example 42
     */
    quantity: number;
    unit: GetNetworkParametersUnitEnum4;
  };
  /**
   * @min 0
   * @example 100
   */
  desired_pool_number: number;
  /** Coins, in Lovelace */
  minimum_utxo_value: {
    /**
     * @min 0
     * @example 42000000
     */
    quantity: number;
    unit: GetNetworkParametersUnitEnum5;
  };
  hardfork_at?: {
    /**
     * An epoch is a time period which is divided into slots.
     * @min 0
     * @example 14
     */
    epoch_number: number;
    /**
     * @format iso-8601-date-and-time
     * @example "2019-02-27T14:46:45Z"
     */
    epoch_start_time: string;
  };
}

/** not_acceptable */
export type GetNetworkParametersError = {
  /** May occur when providing an invalid 'Accept' header. */
  message: string;
  code: GetNetworkParametersCodeEnum;
};

export enum PostExternalTransactionCodeEnum {
  BadRequest = "bad_request",
}

export enum PostExternalTransactionCodeEnum1 {
  NotAcceptable = "not_acceptable",
}

export enum PostExternalTransactionCodeEnum2 {
  UnsupportedMediaType = "unsupported_media_type",
}

/**
 * Signed transaction message binary blob.
 * @format binary
 */
export type PostExternalTransactionPayload = File;

export interface PostExternalTransactionData {
  /**
   * A unique identifier for this transaction
   * @format hex
   * @minLength 64
   * @maxLength 64
   * @example "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
   */
  id: string;
}

/** bad_request not_acceptable unsupported_media_type */
export type PostExternalTransactionError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PostExternalTransactionCodeEnum;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PostExternalTransactionCodeEnum1;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: PostExternalTransactionCodeEnum2;
    };

export enum InspectAddressAddressStyleEnum {
  Shelley = "Shelley",
  Icarus = "Icarus",
  Byron = "Byron",
}

export enum InspectAddressStakeReferenceEnum {
  None = "none",
  ByValue = "by value",
  ByPointer = "by pointer",
}

export enum InspectAddressCodeEnum {
  BadRequest = "bad_request",
}

export interface InspectAddressParams {
  /**
   * @format base58
   * @example "DdzFFzCqrhtCNjPk5Lei7E1FxnoqMoAYtJ8VjAWbFmDb614nNBWBwv3kt6QHJa59cGezzf6piMWsbK7sWRB5sv325QqWdRuusMqqLdMt"
   */
  addressId: string;
}

export interface InspectAddressData {
  address_style: InspectAddressAddressStyleEnum;
  stake_reference: InspectAddressStakeReferenceEnum;
  /**
   * Can be null for 'Icarus' and 'Byron' styles.
   * @min 0
   */
  network_tag?: number;
  /**
   * @format base16
   * @minLength 56
   * @maxLength 56
   */
  spending_key_hash?: string;
  /**
   * @format base16
   * @minLength 56
   * @maxLength 56
   */
  stake_key_hash?: string;
  /**
   * @format base16
   * @minLength 64
   * @maxLength 64
   */
  script_hash?: string;
  pointer?: {
    /** @min 0 */
    slot_num: number;
    /** @min 0 */
    transaction_index: number;
    /** @min 0 */
    output_index: number;
  };
  /**
   * Only for 'Icarus' and 'Byron' styles.
   * @format base16
   */
  address_root?: string;
  /**
   * Only for 'Byron' style.
   * @format base16
   */
  derivation_path?: string;
}

/** bad_request */
export type InspectAddressError = {
  /**
   * May occur when a request is not well-formed; that is, it fails to parse
   * successfully. This could be the case when some required parameters
   * are missing or, when malformed values are provided.
   */
  message: string;
  code: InspectAddressCodeEnum;
};

export enum PostAnyAddressCodeEnum {
  BadRequest = "bad_request",
}

export enum PostAnyAddressCodeEnum1 {
  NotAcceptable = "not_acceptable",
}

export interface PostAnyAddressPayload {
  /**
   * A public key (public key without chain code) for credential - 32 bytes
   * @example {"any":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms",{"all":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms"]},{"any":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms",{"all":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt36ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms"]}]},{"some":{"at_least":2,"from":["script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt37ms","script_vkh18srsxr3khll7vl3w9mqfu55n6wzxxlxj7qzr2mhnyreluzt38ms"]}}]}
   */
  payment?:
    | string
    | (
        | string
        | {
            /**
             * Script primitive for which all signing keys corresponding to all list elements' verification keys are expected to make the script valid.
             * @minItems 1
             */
            all: ScriptValue[];
          }
        | {
            /**
             * Script primitive for which a signing key corresponding to any of the list elements' verification keys is expected to make the script valid. It is equivalent to `some` with `"at_least"=1`.
             * @minItems 1
             */
            any: ScriptValue[];
          }
        | {
            /** Script primitive for which at least a given number of signing keys corresponding to the list elements' verification keys are expected to make the script valid. */
            some: {
              /** @min 1 */
              at_least: number;
              /** @minItems 1 */
              from: ScriptValue[];
            };
          }
      );
  /**
   * A public key (public key without chain code) for credential - 32 bytes
   * @example "stake_vk16apaenn9ut6s40lcw3l8v68xawlrlq20z2966uzcx8jmv2q9uy7qau558d"
   */
  stake?:
    | string
    | (
        | string
        | {
            /**
             * Script primitive for which all signing keys corresponding to all list elements' verification keys are expected to make the script valid.
             * @minItems 1
             */
            all: ScriptValue[];
          }
        | {
            /**
             * Script primitive for which a signing key corresponding to any of the list elements' verification keys is expected to make the script valid. It is equivalent to `some` with `"at_least"=1`.
             * @minItems 1
             */
            any: ScriptValue[];
          }
        | {
            /** Script primitive for which at least a given number of signing keys corresponding to the list elements' verification keys are expected to make the script valid. */
            some: {
              /** @min 1 */
              at_least: number;
              /** @minItems 1 */
              from: ScriptValue[];
            };
          }
      );
}

export interface PostAnyAddressData {
  /**
   * A Shelley address representing either enterprise, reward account or delegating address
   * @format bech32
   * @pattern ^((addr)|(stake)|(addr_test)|(stake_test))1[0-9a-z]*$
   * @example ["stake17xt2z3pa7etaxp7jurdg0m8jhsmtp4r2z56pd3a5q3jhxycdxzmx9","addr1wy5np0m5x03tax3kcdh6e2cet98qcfs80wtv4cyvl5taclc6dnd8e","addr1xy5np0m5x03tax3kcdh6e2cet98qcfs80wtv4cyvl5tacluk59zrmajh6vra9cx6slk090pkkr2x59f5zmrmgpr9wvfs37hjk4"]
   */
  address: string;
}

/** bad_request not_acceptable */
export type PostAnyAddressError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PostAnyAddressCodeEnum;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: PostAnyAddressCodeEnum1;
    }
  | {
      /** A descriptive error message. */
      message: string;
      /**
       * A specific error code for this error, more precise than HTTP ones.
       * @example "an_error_code"
       */
      code: string;
    };

export enum PutSettingsCodeEnum {
  BadRequest = "bad_request",
}

export enum PutSettingsCodeEnum1 {
  UnsupportedMediaType = "unsupported_media_type",
}

export interface PutSettingsPayload {
  /** Settings */
  settings?: {
    /**
     * Select stake pool metadata fetching strategy:
     *   - `none` - metadata is not fetched at all,
     *   - `direct` - metadata is fetched directly URLs registered on chain,
     *   - `uri` - metadata is fetched from an external Stake-Pool Metadata Aggregation Server (SMASH)
     *
     * After update existing metadata will be dropped forcing it to re-sync automatically with the new setting.
     * @pattern ^(none|direct|https?:\/\/[a-zA-Z0-9-_~.]+(:[0-9]+)?/?)$
     * @example "https://smash.cardano-mainnet.iohk.io/"
     */
    pool_metadata_source: string;
  };
}

export type PutSettingsData = any;

/** bad_request unsupported_media_type */
export type PutSettingsError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: PutSettingsCodeEnum;
    }
  | {
      /** May occur when providing an invalid 'Content-Type' header. */
      message: string;
      code: PutSettingsCodeEnum1;
    };

export interface GetSettingsData {
  /**
   * Pool metadata source. This sets the metadata fetching strategy.
   *
   * Possible values are
   *   * none -> no fetching
   *   * direct -> direct fetching
   *   * uri -> use SMASH server
   * @pattern ^(none|direct|https?:\/\/[a-zA-Z0-9-_~.]+(:[0-9]+)?/?)$
   * @example "https://smash.cardano-mainnet.iohk.io/"
   */
  pool_metadata_source: string;
}

export enum GetCurrentSmashHealthHealthEnum {
  Available = "available",
  Unavailable = "unavailable",
  Unreachable = "unreachable",
  NoSmashConfigured = "no_smash_configured",
}

export enum GetCurrentSmashHealthCodeEnum {
  BadRequest = "bad_request",
}

export enum GetCurrentSmashHealthCodeEnum1 {
  NotAcceptable = "not_acceptable",
}

export interface GetCurrentSmashHealthParams {
  /**
   * A base SMASH uri without endpoint path.
   * @pattern ^https?:\/\/[a-zA-Z0-9-_~.]+(:[0-9]+)?/?$
   * @example "https://smash.cardano-mainnet.iohk.io/"
   */
  url?: string;
}

/**
 * The status of the SMASH server. Possible values are:
 *
 * health                  | description
 * ---                     | ---
 * `"available"`           | server is awaiting your requests
 * `"unavailable"`         | server is running, but currently unavailable, try again in a short time
 * `"unreachable"`         | server could not be reached or didn't return a health status
 * `"no_smash_configured"` | SMASH is currently not configured, adjust the Settings first
 */
export interface GetCurrentSmashHealthData {
  health: GetCurrentSmashHealthHealthEnum;
}

/** bad_request not_acceptable */
export type GetCurrentSmashHealthError =
  | {
      /**
       * May occur when a request is not well-formed; that is, it fails to parse
       * successfully. This could be the case when some required parameters
       * are missing or, when malformed values are provided.
       */
      message: string;
      code: GetCurrentSmashHealthCodeEnum;
    }
  | {
      /** May occur when providing an invalid 'Accept' header. */
      message: string;
      code: GetCurrentSmashHealthCodeEnum1;
    };

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "https://localhost:8090/v2/",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Cardano Wallet Backend API
 * @version 2020.11.26
 * @license Apache-2.0 (https://raw.githubusercontent.com/input-output-hk/cardano-wallet/master/LICENSE)
 * @baseUrl https://localhost:8090/v2/
 * @externalDocs https://github.com/input-output-hk/cardano-wallet/wiki
 *
 * <p align="right"><img style="position: relative; top: -10em; margin-bottom: -12em;" width="20%" src="https://cardanodocs.com/img/cardano.png"></img></p>
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  wallets = {
    /**
     * @description <p align="right">status: <strong>experimental</strong></p> **⚠️ WARNING ⚠️** This endpoint is experimental and for internal use in the Catalyst project. This functionality will be refined in the forthcoming future and the interface is likely to change in **NON-BACKWARD COMPATIBLE WAYS**. <b>Note:</b> Only `Soft` indexes are supported by this endpoint.
     *
     * @tags Experimental
     * @name SignMetadata
     * @summary Sign Metadata
     * @request POST:/wallets/{walletId}/signatures/{role}/{index}
     */
    signMetadata: (
      { walletId, role, index, ...query }: SignMetadataParams,
      data: SignMetadataPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<SignMetadataData, SignMetadataError>({
        path: `/wallets/${walletId}/signatures/${role}/${index}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Create and restore a wallet from a mnemonic sentence or account public key.
     *
     * @tags Wallets
     * @name PostWallet
     * @summary Create / Restore
     * @request POST:/wallets
     */
    postWallet: (data: PostWalletPayload, params: RequestParams = {}) =>
      this.http.request<PostWalletData, PostWalletError>({
        path: `/wallets`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Return a list of known wallets, ordered from oldest to newest.
     *
     * @tags Wallets
     * @name ListWallets
     * @summary List
     * @request GET:/wallets
     */
    listWallets: (params: RequestParams = {}) =>
      this.http.request<ListWalletsData, ListWalletsError>({
        path: `/wallets`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Return the UTxOs distribution across the whole wallet, in the form of a histogram. ``` │ 100 ─ │ │                                 ┌───┐ 10 ─                         ┌───┐   │   │                   ┌───┐ │                 ┌───┐   │   │   │   │                   │   │ │                 │   │   │   │   │   │   ┌───┐           │   │ 1 ─ ┌───┐           │   │   │   │   │   │   │   │           │   │ │ │   │           │   │   │   │   │   │   │   │           │   │ │ │   │ │       │ │   │ │ │   │ ╷ │   │ ╷ │   │ ╷       ╷ │   │ └─┘   └─│───────│─┘   └─│─┘   └─│─┘   └─│─┘   └─│───────│─┘   └──── 10μ₳    100μ₳   1000μ₳   0.1₳    1₳      10₳     100₳ ```
     *
     * @tags Wallets
     * @name GetUTxOsStatistics
     * @summary UTxO Statistics
     * @request GET:/wallets/{walletId}/statistics/utxos
     */
    getUTxOsStatistics: (
      { walletId, ...query }: GetUTxOsStatisticsParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GetUTxOsStatisticsData, GetUTxOsStatisticsError>({
        path: `/wallets/${walletId}/statistics/utxos`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p>
     *
     * @tags Wallets
     * @name GetWallet
     * @summary Get
     * @request GET:/wallets/{walletId}
     */
    getWallet: (
      { walletId, ...query }: GetWalletParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GetWalletData, GetWalletError>({
        path: `/wallets/${walletId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p>
     *
     * @tags Wallets
     * @name DeleteWallet
     * @summary Delete
     * @request DELETE:/wallets/{walletId}
     */
    deleteWallet: (
      { walletId, ...query }: DeleteWalletParams,
      params: RequestParams = {},
    ) =>
      this.http.request<DeleteWalletData, DeleteWalletError>({
        path: `/wallets/${walletId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p>
     *
     * @tags Wallets
     * @name PutWallet
     * @summary Update Metadata
     * @request PUT:/wallets/{walletId}
     */
    putWallet: (
      { walletId, ...query }: PutWalletParams,
      data: PutWalletPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<PutWalletData, PutWalletError>({
        path: `/wallets/${walletId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p>
     *
     * @tags Wallets
     * @name PutWalletPassphrase
     * @summary Update Passphrase
     * @request PUT:/wallets/{walletId}/passphrase
     */
    putWalletPassphrase: (
      { walletId, ...query }: PutWalletPassphraseParams,
      data: PutWalletPassphrasePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<PutWalletPassphraseData, PutWalletPassphraseError>({
        path: `/wallets/${walletId}/passphrase`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Estimate fee for the transaction. The estimate is made by assembling multiple transactions and analyzing the distribution of their fees. The estimated_max is the highest fee observed, and the estimated_min is the fee which is lower than at least 90% of the fees observed.
     *
     * @tags Transactions
     * @name PostTransactionFee
     * @summary Estimate Fee
     * @request POST:/wallets/{walletId}/payment-fees
     */
    postTransactionFee: (
      { walletId, ...query }: PostTransactionFeeParams,
      data: PostTransactionFeePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<PostTransactionFeeData, PostTransactionFeeError>({
        path: `/wallets/${walletId}/payment-fees`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Create and send transaction from the wallet.
     *
     * @tags Transactions
     * @name PostTransaction
     * @summary Create
     * @request POST:/wallets/{walletId}/transactions
     */
    postTransaction: (
      { walletId, ...query }: PostTransactionParams,
      data: PostTransactionPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<PostTransactionData, PostTransactionError>({
        path: `/wallets/${walletId}/transactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Lists all incoming and outgoing wallet's transactions.
     *
     * @tags Transactions
     * @name ListTransactions
     * @summary List
     * @request GET:/wallets/{walletId}/transactions
     */
    listTransactions: (
      { walletId, ...query }: ListTransactionsParams,
      params: RequestParams = {},
    ) =>
      this.http.request<ListTransactionsData, ListTransactionsError>({
        path: `/wallets/${walletId}/transactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Get transaction by id.
     *
     * @tags Transactions
     * @name GetTransaction
     * @summary Get
     * @request GET:/wallets/{walletId}/transactions/{transactionId}
     */
    getTransaction: (
      { walletId, transactionId, ...query }: GetTransactionParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GetTransactionData, GetTransactionError>({
        path: `/wallets/${walletId}/transactions/${transactionId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Forget pending transaction. Importantly, a transaction, when sent, cannot be cancelled. One can only request forgetting about it in order to try spending (concurrently) the same UTxO in another transaction. But, the transaction may still show up later in a block and therefore, appear in the wallet.
     *
     * @tags Transactions
     * @name DeleteTransaction
     * @summary Forget
     * @request DELETE:/wallets/{walletId}/transactions/{transactionId}
     */
    deleteTransaction: (
      { walletId, transactionId, ...query }: DeleteTransactionParams,
      params: RequestParams = {},
    ) =>
      this.http.request<DeleteTransactionData, DeleteTransactionError>({
        path: `/wallets/${walletId}/transactions/${transactionId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Return a list of known addresses, ordered from newest to oldest
     *
     * @tags Addresses
     * @name ListAddresses
     * @summary List
     * @request GET:/wallets/{walletId}/addresses
     */
    listAddresses: (
      { walletId, ...query }: ListAddressesParams,
      params: RequestParams = {},
    ) =>
      this.http.request<ListAddressesData, ListAddressesError>({
        path: `/wallets/${walletId}/addresses`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Return a public key for a given role and derivation index. <b>Note:</b> Only `Soft` indexes are supported by this endpoint.
     *
     * @tags Keys
     * @name GetWalletKey
     * @summary Get Public Key
     * @request GET:/wallets/{walletId}/keys/{role}/{index}
     */
    getWalletKey: (
      { walletId, role, index, ...query }: GetWalletKeyParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GetWalletKeyData, GetWalletKeyError>({
        path: `/wallets/${walletId}/keys/${role}/${index}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Estimate fee for joining or leaving a stake pool. Note that it is an estimation because a delegation induces a transaction for which coins have to be selected randomly within the wallet. Because of this randomness, fees can only be estimated.
     *
     * @tags Stake Pools
     * @name GetDelegationFee
     * @summary Estimate Fee
     * @request GET:/wallets/{walletId}/delegation-fees
     */
    getDelegationFee: (
      { walletId, ...query }: GetDelegationFeeParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GetDelegationFeeData, GetDelegationFeeError>({
        path: `/wallets/${walletId}/delegation-fees`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Select coins to cover the given set of payments. Uses the <a href="https://iohk.io/blog/self-organisation-in-coin-selection/"> Random-Improve coin selection algorithm</a>.
     *
     * @tags Coin Selections
     * @name SelectCoins
     * @summary Random
     * @request POST:/wallets/{walletId}/coin-selections/random
     */
    selectCoins: (
      { walletId, ...query }: SelectCoinsParams,
      data: SelectCoinsPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<SelectCoinsData, SelectCoinsError>({
        path: `/wallets/${walletId}/coin-selections/random`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>in development</strong></p> Submit one or more transactions which transfers all funds from a Shelley wallet to a set of addresses. This operation attempts to preserve the UTxO "shape" of a wallet as far as possible. That is, coins will not be agglomerated. Therefore, if the wallet has a large UTxO set, several transactions may be needed. A typical usage would be when one wants to move all funds from an old wallet to another by providing addresses coming from the new wallet.
     *
     * @tags Migrations
     * @name MigrateShelleyWallet
     * @summary Migrate
     * @request POST:/wallets/{walletId}/migrations
     */
    migrateShelleyWallet: (
      { walletId, ...query }: MigrateShelleyWalletParams,
      data: MigrateShelleyWalletPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<MigrateShelleyWalletData, MigrateShelleyWalletError>({
        path: `/wallets/${walletId}/migrations`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>in development</strong></p> Calculate the exact cost of sending all funds from particular Shelley wallet to a set of addresses.
     *
     * @tags Migrations
     * @name GetShelleyWalletMigrationInfo
     * @summary Calculate Cost
     * @request GET:/wallets/{walletId}/migrations
     */
    getShelleyWalletMigrationInfo: (
      { walletId, ...query }: GetShelleyWalletMigrationInfoParams,
      params: RequestParams = {},
    ) =>
      this.http.request<
        GetShelleyWalletMigrationInfoData,
        GetShelleyWalletMigrationInfoError
      >({
        path: `/wallets/${walletId}/migrations`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  stakePools = {
    /**
     * @description <p align="right">status: <strong>stable</strong></p> List all known stake pools ordered by descending `non_myopic_member_rewards`. The `non_myopic_member_rewards` — and thus the ordering — depends on the `?stake` query parameter. Some pools _may_ also have metadata attached to them.
     *
     * @tags Stake Pools
     * @name ListStakePools
     * @summary List
     * @request GET:/stake-pools
     */
    listStakePools: (query: ListStakePoolsParams, params: RequestParams = {}) =>
      this.http.request<ListStakePoolsData, ListStakePoolsError>({
        path: `/stake-pools`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the current status of the stake pools maintenance actions.
     *
     * @tags Stake Pools
     * @name GetMaintenanceActions
     * @summary View maintenance actions
     * @request GET:/stake-pools/maintenance-actions
     */
    getMaintenanceActions: (params: RequestParams = {}) =>
      this.http.request<GetMaintenanceActionsData, any>({
        path: `/stake-pools/maintenance-actions`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Performs maintenance actions on stake pools, such as triggering metadata garbage collection. Actions may not be instantaneous.
     *
     * @tags Stake Pools
     * @name PostMaintenanceAction
     * @summary Trigger Maintenance actions
     * @request POST:/stake-pools/maintenance-actions
     */
    postMaintenanceAction: (
      data: PostMaintenanceActionPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<PostMaintenanceActionData, PostMaintenanceActionError>({
        path: `/stake-pools/maintenance-actions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Stop delegating completely. The wallet's stake will become inactive. > ⚠️  Disclaimer ⚠️ > > This endpoint historically use to take a stake pool id as a path parameter. > However, retiring from delegation is ubiquitous and not tight to a particular > stake pool. For backward-compatibility reasons, sending stake pool ids as path > parameter will still be accepted by the server but new integrations are > encouraged to provide a placeholder asterisk `*` instead.
     *
     * @tags Stake Pools
     * @name QuitStakePool
     * @summary Quit
     * @request DELETE:/stake-pools/*\/wallets/{walletId}
     */
    quitStakePool: (
      { walletId, ...query }: QuitStakePoolParams,
      data: QuitStakePoolPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<QuitStakePoolData, QuitStakePoolError>({
        path: `/stake-pools/*/wallets/${walletId}`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Delegate all (current and future) addresses from the given wallet to the given stake pool. <strong>Note:</strong> Bech32-encoded stake pool identifiers can vary in length.
     *
     * @tags Stake Pools
     * @name JoinStakePool
     * @summary Join
     * @request PUT:/stake-pools/{stakePoolId}/wallets/{walletId}
     */
    joinStakePool: (
      { stakePoolId, walletId, ...query }: JoinStakePoolParams,
      data: JoinStakePoolPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<JoinStakePoolData, JoinStakePoolError>({
        path: `/stake-pools/${stakePoolId}/wallets/${walletId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  byronWallets = {
    /**
     * @description <p align="right">status: <strong>stable</strong></p> Restore a Byron wallet from a mnemonic sentence or encrypted root private key (deprecated). **⚠️ WARNING ⚠️** The construction of random wallet in itself is **deprecated**, in particular the restoration from an encrypted root private key. These endpoints exist to ease migrations from legacy software such as `cardano-sl` but should be avoided by new applications.
     *
     * @tags Byron Wallets
     * @name PostByronWallet
     * @summary Restore
     * @request POST:/byron-wallets
     */
    postByronWallet: (
      data: PostByronWalletPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<PostByronWalletData, PostByronWalletError>({
        path: `/byron-wallets`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Return a list of known Byron wallets, ordered from oldest to newest.
     *
     * @tags Byron Wallets
     * @name ListByronWallets
     * @summary List
     * @request GET:/byron-wallets
     */
    listByronWallets: (params: RequestParams = {}) =>
      this.http.request<ListByronWalletsData, ListByronWalletsError>({
        path: `/byron-wallets`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Return the UTxOs distribution across the whole wallet, in the form of a histogram. ``` │ 100 ─ │ │                                 ┌───┐ 10 ─                         ┌───┐   │   │                   ┌───┐ │                 ┌───┐   │   │   │   │                   │   │ │                 │   │   │   │   │   │   ┌───┐           │   │ 1 ─ ┌───┐           │   │   │   │   │   │   │   │           │   │ │ │   │           │   │   │   │   │   │   │   │           │   │ │ │   │ │       │ │   │ │ │   │ ╷ │   │ ╷ │   │ ╷       ╷ │   │ └─┘   └─│───────│─┘   └─│─┘   └─│─┘   └─│─┘   └─│───────│─┘   └──── 10μ₳    100μ₳   1000μ₳   0.1₳    1₳      10₳     100₳ ```
     *
     * @tags Byron Wallets
     * @name GetByronUTxOsStatistics
     * @summary UTxO Statistics
     * @request GET:/byron-wallets/{walletId}/statistics/utxos
     */
    getByronUTxOsStatistics: (
      { walletId, ...query }: GetByronUTxOsStatisticsParams,
      params: RequestParams = {},
    ) =>
      this.http.request<
        GetByronUTxOsStatisticsData,
        GetByronUTxOsStatisticsError
      >({
        path: `/byron-wallets/${walletId}/statistics/utxos`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Return information about a Byron wallet.
     *
     * @tags Byron Wallets
     * @name GetByronWallet
     * @summary Get
     * @request GET:/byron-wallets/{walletId}
     */
    getByronWallet: (
      { walletId, ...query }: GetByronWalletParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GetByronWalletData, GetByronWalletError>({
        path: `/byron-wallets/${walletId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Delete a Byron wallet.
     *
     * @tags Byron Wallets
     * @name DeleteByronWallet
     * @summary Delete
     * @request DELETE:/byron-wallets/{walletId}
     */
    deleteByronWallet: (
      { walletId, ...query }: DeleteByronWalletParams,
      params: RequestParams = {},
    ) =>
      this.http.request<DeleteByronWalletData, DeleteByronWalletError>({
        path: `/byron-wallets/${walletId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p>
     *
     * @tags Byron Wallets
     * @name PutByronWallet
     * @summary Update Metadata
     * @request PUT:/byron-wallets/{walletId}
     */
    putByronWallet: (
      { walletId, ...query }: PutByronWalletParams,
      data: PutByronWalletPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<PutByronWalletData, PutByronWalletError>({
        path: `/byron-wallets/${walletId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p>
     *
     * @tags Byron Wallets
     * @name PutByronWalletPassphrase
     * @summary Update Passphrase
     * @request PUT:/byron-wallets/{walletId}/passphrase
     */
    putByronWalletPassphrase: (
      { walletId, ...query }: PutByronWalletPassphraseParams,
      data: PutByronWalletPassphrasePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PutByronWalletPassphraseData,
        PutByronWalletPassphraseError
      >({
        path: `/byron-wallets/${walletId}/passphrase`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> ⚠️  This endpoint is available for `random` wallets only. Any attempt to call this endpoint on another type of wallet will result in a `403 Forbidden` error from the server.
     *
     * @tags Byron Addresses
     * @name CreateAddress
     * @summary Create Address
     * @request POST:/byron-wallets/{walletId}/addresses
     */
    createAddress: (
      { walletId, ...query }: CreateAddressParams,
      data: CreateAddressPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<CreateAddressData, CreateAddressError>({
        path: `/byron-wallets/${walletId}/addresses`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Return a list of known addresses, ordered from newest to oldest for sequential wallets. Arbitrarily ordered for random wallets.
     *
     * @tags Byron Addresses
     * @name ListByronAddresses
     * @summary List
     * @request GET:/byron-wallets/{walletId}/addresses
     */
    listByronAddresses: (
      { walletId, ...query }: ListByronAddressesParams,
      params: RequestParams = {},
    ) =>
      this.http.request<ListByronAddressesData, ListByronAddressesError>({
        path: `/byron-wallets/${walletId}/addresses`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> ⚠️  This endpoint is available for `random` wallets only. Any attempt to call this endpoint on another type of wallet will result in a `403 Forbidden` error from the server.
     *
     * @tags Byron Addresses
     * @name ImportAddresses
     * @summary Import Addresses
     * @request PUT:/byron-wallets/{walletId}/addresses
     */
    importAddresses: (
      { walletId, ...query }: ImportAddressesParams,
      data: ImportAddressesPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<ImportAddressesData, ImportAddressesError>({
        path: `/byron-wallets/${walletId}/addresses`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> ⚠️  This endpoint is available for `random` wallets only. Any attempt to call this endpoint on another type of wallet will result in a `403 Forbidden` error from the server.
     *
     * @tags Byron Addresses
     * @name ImportAddress
     * @summary Import Address
     * @request PUT:/byron-wallets/{walletId}/addresses/{addressId}
     */
    importAddress: (
      { walletId, addressId, ...query }: ImportAddressParams,
      params: RequestParams = {},
    ) =>
      this.http.request<ImportAddressData, ImportAddressError>({
        path: `/byron-wallets/${walletId}/addresses/${addressId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Estimate fee for the transaction.
     *
     * @tags Byron Transactions
     * @name PostByronTransactionFee
     * @summary Estimate Fee
     * @request POST:/byron-wallets/{walletId}/payment-fees
     */
    postByronTransactionFee: (
      { walletId, ...query }: PostByronTransactionFeeParams,
      data: PostByronTransactionFeePayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PostByronTransactionFeeData,
        PostByronTransactionFeeError
      >({
        path: `/byron-wallets/${walletId}/payment-fees`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Create and send transaction from the wallet.
     *
     * @tags Byron Transactions
     * @name PostByronTransaction
     * @summary Create
     * @request POST:/byron-wallets/{walletId}/transactions
     */
    postByronTransaction: (
      { walletId, ...query }: PostByronTransactionParams,
      data: PostByronTransactionPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<PostByronTransactionData, PostByronTransactionError>({
        path: `/byron-wallets/${walletId}/transactions`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> List all incoming and outgoing transactions for the given wallet.
     *
     * @tags Byron Transactions
     * @name ListByronTransactions
     * @summary List
     * @request GET:/byron-wallets/{walletId}/transactions
     */
    listByronTransactions: (
      { walletId, ...query }: ListByronTransactionsParams,
      params: RequestParams = {},
    ) =>
      this.http.request<ListByronTransactionsData, ListByronTransactionsError>({
        path: `/byron-wallets/${walletId}/transactions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Get transaction by id.
     *
     * @tags Byron Transactions
     * @name GetByronTransaction
     * @summary Get
     * @request GET:/byron-wallets/{walletId}/transactions/{transactionId}
     */
    getByronTransaction: (
      { walletId, transactionId, ...query }: GetByronTransactionParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GetByronTransactionData, GetByronTransactionError>({
        path: `/byron-wallets/${walletId}/transactions/${transactionId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Forget pending Byron transaction. Importantly, a transaction, when sent, cannot be cancelled. One can only request forgetting about it in order to try spending (concurrently) the same UTxO in another transaction. But, the transaction may still show up later in a block and therefore, appear in the wallet.
     *
     * @tags Byron Transactions
     * @name DeleteByronTransaction
     * @summary Forget
     * @request DELETE:/byron-wallets/{walletId}/transactions/{transactionId}
     */
    deleteByronTransaction: (
      { walletId, transactionId, ...query }: DeleteByronTransactionParams,
      params: RequestParams = {},
    ) =>
      this.http.request<
        DeleteByronTransactionData,
        DeleteByronTransactionError
      >({
        path: `/byron-wallets/${walletId}/transactions/${transactionId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Select coins to cover the given set of payments. Uses the <a href="https://iohk.io/blog/self-organisation-in-coin-selection/"> Random-Improve coin selection algorithm</a>. <b>Note: </b> Not supported for Byron random wallets.
     *
     * @tags Byron Coin Selections
     * @name ByronSelectCoins
     * @summary Random
     * @request POST:/byron-wallets/{walletId}/coin-selections/random
     */
    byronSelectCoins: (
      { walletId, ...query }: ByronSelectCoinsParams,
      data: ByronSelectCoinsPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<ByronSelectCoinsData, ByronSelectCoinsError>({
        path: `/byron-wallets/${walletId}/coin-selections/random`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Submit one or more transactions which transfers all funds from a Byron wallet to a set of addresses. This operation attempts to preserve the UTxO "shape" of a wallet as far as possible. That is, coins will not be agglomerated. Therefore, if the wallet has a large UTxO set, several transactions may be needed. A typical usage would be when one wants to move all funds from an old wallet to another (Shelley or Byron) by providing addresses coming from the new wallet.
     *
     * @tags Byron Migrations
     * @name MigrateByronWallet
     * @summary Migrate
     * @request POST:/byron-wallets/{walletId}/migrations
     */
    migrateByronWallet: (
      { walletId, ...query }: MigrateByronWalletParams,
      data: MigrateByronWalletPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<MigrateByronWalletData, MigrateByronWalletError>({
        path: `/byron-wallets/${walletId}/migrations`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Calculate the exact cost of sending all funds from particular Byron wallet to a set of addresses.
     *
     * @tags Byron Migrations
     * @name GetByronWalletMigrationInfo
     * @summary Calculate Cost
     * @request GET:/byron-wallets/{walletId}/migrations
     */
    getByronWalletMigrationInfo: (
      { walletId, ...query }: GetByronWalletMigrationInfoParams,
      params: RequestParams = {},
    ) =>
      this.http.request<
        GetByronWalletMigrationInfoData,
        GetByronWalletMigrationInfoError
      >({
        path: `/byron-wallets/${walletId}/migrations`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  network = {
    /**
     * @description <p align="right">status: <strong>stable</strong></p>
     *
     * @tags Network
     * @name GetNetworkInformation
     * @summary Information
     * @request GET:/network/information
     */
    getNetworkInformation: (params: RequestParams = {}) =>
      this.http.request<GetNetworkInformationData, GetNetworkInformationError>({
        path: `/network/information`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p>
     *
     * @tags Network
     * @name GetNetworkClock
     * @summary Clock
     * @request GET:/network/clock
     */
    getNetworkClock: (
      query: GetNetworkClockParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GetNetworkClockData, GetNetworkClockError>({
        path: `/network/clock`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Returns the set of network parameters for the current epoch.
     *
     * @tags Network
     * @name GetNetworkParameters
     * @summary Parameters
     * @request GET:/network/parameters
     */
    getNetworkParameters: (params: RequestParams = {}) =>
      this.http.request<GetNetworkParametersData, GetNetworkParametersError>({
        path: `/network/parameters`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  proxy = {
    /**
     * @description <p align="right">status: <strong>stable</strong></p> Submits a transaction that was created and signed outside of cardano-wallet.
     *
     * @tags Proxy
     * @name PostExternalTransaction
     * @summary Submit External Transaction
     * @request POST:/proxy/transactions
     */
    postExternalTransaction: (
      data: PostExternalTransactionPayload,
      params: RequestParams = {},
    ) =>
      this.http.request<
        PostExternalTransactionData,
        PostExternalTransactionError
      >({
        path: `/proxy/transactions`,
        method: "POST",
        body: data,
        format: "json",
        ...params,
      }),
  };
  addresses = {
    /**
     * @description <p align="right">status: <strong>stable</strong></p> Give useful information about the structure of a given address.
     *
     * @tags Addresses
     * @name InspectAddress
     * @summary Inspect Address
     * @request GET:/addresses/{addressId}
     */
    inspectAddress: (
      { addressId, ...query }: InspectAddressParams,
      params: RequestParams = {},
    ) =>
      this.http.request<InspectAddressData, InspectAddressError>({
        path: `/addresses/${addressId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Construct any address by specyfying credential for payment or stake. In Cardano, Addresses are made of three parts: ``` *---------*---------*-------* | NETWORK | PAYMENT | STAKE | *---------*---------*-------* ``` The `NETWORK` part allows for distinguishing addresses between different networks like the mainnet or the testnet. It is implicitly handled by the server without you having to worry about it. The `PAYMENT` and `STAKE` parts however can be constructed similarly, using either: - A public key - A script The script itself is either constructed out of a public key, or one of the three following primitives: - all - any - some Each of which contains one or more script(s) that can be either keys or primitives, and so on. Schematically: ``` ┏─────────┓ SCRIPT = ──┬───────────────────────┤ pub key ├─────────────────────┬── │                       ┗─────────┛                     │ │  ╭─────╮   ╭────────╮                                 │ ├──┤ ALL ├───┤ SCRIPT ├─┬───────────────────────────────┤ │  ╰─────╯ ^ ╰────────╯ │                               │ │          │   ╭───╮    │                               │ │          └───┤ , ├────┘                               │ │              ╰───╯                                    │ │  ╭─────╮   ╭────────╮                                 │ ├──┤ ALL ├───┤ SCRIPT ├─┬───────────────────────────────┤ │  ╰─────╯ ^ ╰────────╯ │                               │ │          │   ╭───╮    │                               │ │          └───┤ , ├────┘                               │ │              ╰───╯                                    │ │  ╭──────╮ ╭──────────╮ ┏───┓ ╭──────╮   ╭────────╮    │ └──┤ SOME ├─┤ AT_LEAST ├─┤ n ├─┤ FROM ├───┤ SCRIPT ├─┬──┘ ╰──────╯ ╰──────────╯ ┗───┛ ╰──────╯ ^ ╰────────╯ │ │   ╭───╮    │ └───┤ , ├────┘ ╰───╯ ```
     *
     * @tags Addresses
     * @name PostAnyAddress
     * @summary Construct Address
     * @request POST:/addresses
     */
    postAnyAddress: (data: PostAnyAddressPayload, params: RequestParams = {}) =>
      this.http.request<PostAnyAddressData, PostAnyAddressError>({
        path: `/addresses`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  settings = {
    /**
     * @description <p align="right">status: <strong>stable</strong></p> Overwrite current settings.
     *
     * @tags Settings
     * @name PutSettings
     * @summary Update settings
     * @request PUT:/settings
     */
    putSettings: (data: PutSettingsPayload, params: RequestParams = {}) =>
      this.http.request<PutSettingsData, PutSettingsError>({
        path: `/settings`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description <p align="right">status: <strong>stable</strong></p> Return the current settings.
     *
     * @tags Settings
     * @name GetSettings
     * @summary Get settings
     * @request GET:/settings
     */
    getSettings: (params: RequestParams = {}) =>
      this.http.request<GetSettingsData, any>({
        path: `/settings`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  smash = {
    /**
     * @description Get health status of the currently active SMASH server.
     *
     * @tags Utils
     * @name GetCurrentSmashHealth
     * @summary Current SMASH health
     * @request GET:/smash/health
     */
    getCurrentSmashHealth: (
      query: GetCurrentSmashHealthParams,
      params: RequestParams = {},
    ) =>
      this.http.request<GetCurrentSmashHealthData, GetCurrentSmashHealthError>({
        path: `/smash/health`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
