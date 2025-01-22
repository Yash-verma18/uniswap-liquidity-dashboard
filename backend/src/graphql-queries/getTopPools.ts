import { gql } from 'graphql-request';
export const GET_TOP_POOLS = gql`
  query GetTopPools {
    pools(orderBy: totalValueLockedETH, orderDirection: desc) {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      feeTier
      totalValueLockedETH
      volumeUSD
      volumeToken0
      volumeToken1
      liquidity
    }
  }
`;
