import { matches } from "../deps.ts";

const { literal, literals, shape, number, string, some, boolean, object } =
  matches;
export const setConfigMatcher = shape(
  {
    "peer-tor-address": string,
    "rpc-tor-address": string,
    alias: string.optional(),
    color: string,
    bitcoind: some(
      shape({
        type: literal("internal"),
        user: string.optional(),
        password: string.optional(),
      }, ["user", "password"]),
      shape({
        type: literal("internal-proxy"),
        user: string.optional(),
        password: string.optional(),
      }, ["user", "password"]),
    ),
    rpc: shape({
      enabled: boolean,
      user: string,
      password: string,
    }),
    advanced: shape({
      "tor-only": boolean,
      "fee-base": number,
      "fee-rate": number,
      "min-capacity": number,
      "ignore-fee-limits": boolean,
      "funding-confirms": number,
      "cltv-delta": number,
      "wumbo-channels": boolean,
      experimental: shape({
        "dual-fund": boolean,
        "onion-messages": boolean,
        offers: boolean,
        "shutdown-wrong-funding": boolean,
      }),
      plugins: shape({
        http: boolean,
        rebalance: boolean,
        summary: boolean,
        rest: boolean,
        clboss: shape({
          "min-onchain": number,
          "auto-close": boolean,
          "zerobasefee": literals("default", "required", "allow", "disallow"),
          "min-channel": number,
          "max-channel": number,
        }, [
          "min-onchain",
          "auto-close",
          "zerobasefee",
          "min-channel",
          "max-channel",
        ]),
      }),
    }),
  },
  ["alias", "peer-tor-address", "rpc-tor-address"],
);
export type SetConfig = typeof setConfigMatcher._TYPE;
