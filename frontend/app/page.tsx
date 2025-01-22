'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AlertDisplay from '@/components/ui/AlertDisplay';
import SetAlertDialog from '@/components/ui/SetAlertDialog';
type Pool = {
  id: string;
  tokenPair: string;
  feeTier: string;
  totalValueLockedETH: string;
  volumeToken0: string;
  volumeToken1: string;
  volumeUSD: string;
  liquidity: string;
};

export default function Dashboard() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPools() {
      try {
        const response = await axios.get(
          'http://localhost:3000/v1/api/top-pools'
        );
        if (response && response.data) {
          setPools(response.data);
        }
      } catch (error) {
        console.error('Error fetching pools:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPools();
  }, []);

  const handleSaveAlert = async (alertData: {
    address: string;
    dropPercentage: number;
    timeInterval: number;
  }) => {
    try {
      await axios.post('http://localhost:3000/v1/api/alert', alertData);
    } catch (error) {
      console.error('Error saving alert:', error);
    }
  };

  const [showSetAlertDialog, setShowSetAlertDialog] = useState(false);
  const [selectedContractAddress, setSelectedContractAddress] = useState('');

  const toggleSetAlertdialog = (id: string) => {
    setSelectedContractAddress(id);
    setShowSetAlertDialog((prev) => !prev);
  };

  if (loading) return <p>Loading pools...</p>;

  return (
    <div className='p-8'>
      <SetAlertDialog
        onSave={handleSaveAlert}
        isOpen={showSetAlertDialog}
        onClose={() => setShowSetAlertDialog(false)}
        address={selectedContractAddress}
      />
      <h1 className='text-2xl font-bold mb-4'>Uniswap Liquidity Dashboard</h1>
      <div>
        <h1 className='text-2xl font-bold'>Alert System</h1>
        <AlertDisplay />
      </div>
      <table className='table-auto w-full border-collapse border border-gray-200'>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2'>Actions</th>
            <th className='border border-gray-300 px-4 py-2'>Pool ID</th>
            <th className='border border-gray-300 px-4 py-2'>Liquidity </th>
            <th className='border border-gray-300 px-4 py-2'>Token Pair</th>
            <th className='border border-gray-300 px-4 py-2'>Fee Tier</th>
            <th className='border border-gray-300 px-4 py-2'>TVL (ETH)</th>
            <th className='border border-gray-300 px-4 py-2'>Volume Token 0</th>
            <th className='border border-gray-300 px-4 py-2'>Volume Token 1</th>
            <th className='border border-gray-300 px-4 py-2'>Volume (USD)</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((pool) => (
            <tr key={pool.id}>
              <td className='border border-gray-300 px-4 py-2'>
                <button
                  className='bg-blue-500 text-white px-3 py-1 rounded'
                  onClick={() => toggleSetAlertdialog(pool.id)}
                >
                  Set Alert
                </button>
              </td>
              <td className='border border-gray-300 px-4 py-2'>{pool.id}</td>
              <td className='border border-gray-300 px-4 py-2'>
                {pool.liquidity}
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {pool.tokenPair}
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {pool.feeTier}
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {pool.totalValueLockedETH}
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {pool.volumeToken0}
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {pool.volumeToken1}
              </td>
              <td className='border border-gray-300 px-4 py-2'>
                {pool.volumeUSD}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
