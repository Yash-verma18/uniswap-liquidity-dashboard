import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { io } from '../..';
import Alert from '../../models/Alert';
import Liquidity from '../../models/Liquidity';
import { getPoolData } from '../uniswap';

dotenv.config();
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const poolAbi = [
  // Swap Event
  'event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)',
];

// Event handlers for each event type
async function handleSwapEvent(
  contractAddress: string,
  { liquidity }: { liquidity: any }
) {
  try {
    console.log('Swap Event Detected:');
    console.log(`Liquidity: ${liquidity.toString()}`);
    console.log(`contractAddress: ${contractAddress}`);

    const poolAddress = contractAddress;
    const currentLiquidity = parseFloat(liquidity.toString());
    const currentTimestamp = new Date();

    // Fetch the alert for this pool
    const alert = await Alert.findOne({ poolAddress });

    if (!alert) {
      console.log('No alert configured for this pool.');
      return;
    }

    const { dropPercentage, timeInterval } = alert; // `timeInterval` is in seconds

    const previousLiquidityRecord = await Liquidity.findOne({
      poolAddress,
    }).sort({ timestamp: -1 });

    if (!previousLiquidityRecord) {
      console.log(
        'No previous liquidity data found. Saving current liquidity.'
      );
      await Liquidity.create({
        poolAddress,
        timestamp: currentTimestamp,
        liquidity: currentLiquidity.toString(),
      });
      return;
    }

    const previousLiquidity = parseFloat(previousLiquidityRecord.liquidity);
    const timeDifference =
      (currentTimestamp.getTime() -
        new Date(previousLiquidityRecord.timestamp).getTime()) /
      1000;

    console.log(
      `Time difference: ${timeDifference} sec, Interval: ${timeInterval} sec`
    );

    // Only proceed if the time interval has passed
    if (timeDifference < timeInterval) {
      console.log('Time interval not yet passed. Skipping drop check.');
      return;
    }

    // Calculate the percentage drop
    const percentageDrop =
      ((previousLiquidity - currentLiquidity) / previousLiquidity) * 100;

    console.log(`Liquidity Drop: ${percentageDrop}%`);

    // Check if drop percentage condition is met
    if (percentageDrop >= dropPercentage) {
      console.log('Drop condition met. Emitting alert.');

      const serializedData = {
        poolAddress,
        percentageDrop,
        currentLiquidity,
      };

      // Emit the event to the UI
      io.emit('event:alert', serializedData);
    } else {
      console.log('Drop condition not met.');
    }
  } catch (error) {
    console.error('Error handling swap event:', error);
  }
}

/**
 * Subscribes to a specific event from a smart contract.
 *
 * @param contractAddress The address of the smart contract
 * @param abi The ABI of the contract
 * @param eventName The name of the event to subscribe to
 * @param eventHandler A callback function to handle the event
 */
export async function subscribeToEvent(
  contractAddress: string,
  abi: any[],
  eventName: string,
  eventHandler: (...args: any[]) => void
) {
  try {
    // Initialize contract instance
    const contract = new ethers.Contract(contractAddress, abi, provider);

    // Subscribe to the event
    console.log(
      `Subscribing to event: ${eventName} for contract: ${contractAddress}`
    );
    contract.on(eventName, (...args) => {
      eventHandler(contractAddress, { liquidity: args[5] });
    });

    console.log(`Successfully subscribed to ${eventName}`);
  } catch (error) {
    console.error(
      `Failed to subscribe to ${eventName} on contract ${contractAddress}:`,
      error
    );
  }
}

/**
 * Initiates monitoring for specific pool events (e.g., Swap, Mint, Burn).
 *
 * @param address The address of the pool contract
 */
export async function initiateAlert(
  address: string,
  dropPercentage: number,
  timeInterval: number
) {
  try {
    if (!address || !dropPercentage || !timeInterval) {
      throw new Error('Missing required parameters');
    }

    // convert time to seconds
    const timeIntervalInSeconds = timeInterval * 60;

    await Alert.create({
      poolAddress: address,
      dropPercentage,
      timeInterval: timeIntervalInSeconds,
    });

    // Fetch and save the initial liquidity
    const initialLiquidity = await getPoolData(address);

    await Liquidity.create({
      poolAddress: address,
      timestamp: new Date(),
      liquidity: initialLiquidity.liquidity.toString(),
    });

    // Subscribe to Swap events
    await subscribeToEvent(address, poolAbi, 'Swap', handleSwapEvent);

    console.log(`Monitoring initiated for pool: ${address}`);
  } catch (error) {
    console.error('Error initiating alert:', error);
  }
}
