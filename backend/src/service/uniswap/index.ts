import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();
import { request } from 'graphql-request';
import { GET_TOP_POOLS } from '../../graphql-queries/getTopPools';
import { serializeBigInt } from '../helper';

const API_KEY = process.env.UNISWAP_API_KEY;
const SUBGRAPH_ID = process.env.SUBGRAPH_ID;
const URL = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/${SUBGRAPH_ID}`;
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

export async function getPoolData(poolAddress: string) {
  const poolContract = new ethers.Contract(
    poolAddress,
    [
      'function slot0() external view returns (uint160, int24, uint16, uint16, uint16, uint8, bool)',
      'function liquidity() external view returns (uint128)',
    ],
    provider
  );

  const [slot0, liquidity] = await Promise.all([
    poolContract.slot0(),
    poolContract.liquidity(),
  ]);

  const result = {
    sqrtPriceX96: slot0[0], // BigInt
    tick: slot0[1], // int24
    liquidity: liquidity, // BigInt
  };

  return serializeBigInt(result);
}

export async function getTopPools() {
  try {
    const data: any = await request(URL, GET_TOP_POOLS);

    // formatting the data
    const formattedPools = data.pools.map((pool: any) => ({
      id: pool.id,
      tokenPair: `${pool.token0.symbol}/${pool.token1.symbol}`,
      feeTier: `${(Number(pool.feeTier) / 10000).toFixed(2)}%`,
      totalValueLockedETH: `${Number(pool.totalValueLockedETH).toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )} ETH`, // Add commas and format decimals
      volumeToken0: `${Number(pool.volumeToken0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`, // Format volumeToken0
      volumeToken1: `${Number(pool.volumeToken1).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`, // Format volumeToken1
      volumeUSD: `$${Number(pool.volumeUSD).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`, // Add a dollar sign and format USD values
      liquidity: `${Number(pool.liquidity).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    }));

    return formattedPools;
  } catch (error) {
    console.error('Error fetching top pools:', error);
    throw new Error('Failed to fetch top pools');
  }
}
