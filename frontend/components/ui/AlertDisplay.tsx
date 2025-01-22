'use client';

import { useSocket } from '@/app/context/SocketProvider';
import React from 'react';

export default function AlertDisplay() {
  const { alertEvents } = useSocket();

  return (
    <div className='p-4'>
      <div className='border p-4 mb-4'>
        {alertEvents.length === 0 ? (
          <p>No Alerts yet.</p>
        ) : (
          <ul>
            {alertEvents.map((event, index) => (
              <li key={index} className='mb-4 border p-2'>
                <p>
                  <strong>Pool Address:</strong> {event.poolAddress}
                </p>
                <p>
                  <strong>Current Liquidity:</strong> {event.currentLiquidity}
                </p>
                <p>
                  <strong>Percentage Drop:</strong> {event.percentageDrop}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
