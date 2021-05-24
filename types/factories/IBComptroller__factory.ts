/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IBComptroller } from "../IBComptroller";

export class IBComptroller__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IBComptroller {
    return new Contract(address, _abi, signerOrProvider) as IBComptroller;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
    ],
    name: "claimComp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "comptroller",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
