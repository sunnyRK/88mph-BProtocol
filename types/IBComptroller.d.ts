/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface IBComptrollerInterface extends ethers.utils.Interface {
  functions: {
    "claimComp(address)": FunctionFragment;
    "comptroller()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "claimComp", values: [string]): string;
  encodeFunctionData(
    functionFragment: "comptroller",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "claimComp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "comptroller",
    data: BytesLike
  ): Result;

  events: {};
}

export class IBComptroller extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IBComptrollerInterface;

  functions: {
    claimComp(
      holder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "claimComp(address)"(
      holder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    comptroller(overrides?: CallOverrides): Promise<[string]>;

    "comptroller()"(overrides?: CallOverrides): Promise<[string]>;
  };

  claimComp(
    holder: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "claimComp(address)"(
    holder: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  comptroller(overrides?: CallOverrides): Promise<string>;

  "comptroller()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    claimComp(holder: string, overrides?: CallOverrides): Promise<void>;

    "claimComp(address)"(
      holder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    comptroller(overrides?: CallOverrides): Promise<string>;

    "comptroller()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    claimComp(
      holder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "claimComp(address)"(
      holder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    comptroller(overrides?: CallOverrides): Promise<BigNumber>;

    "comptroller()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    claimComp(
      holder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "claimComp(address)"(
      holder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    comptroller(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "comptroller()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}