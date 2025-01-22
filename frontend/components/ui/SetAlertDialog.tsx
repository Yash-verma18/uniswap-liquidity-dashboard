'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SetAlertDialogProps {
  onSave: (alertData: {
    address: string;
    dropPercentage: number;
    timeInterval: number;
  }) => void;
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

export default function SetAlertDialog({
  onSave,
  isOpen,
  onClose,
  address,
}: SetAlertDialogProps) {
  const [dropPercentage, setDropPercentage] = useState<number | ''>('');
  const [timeInterval, setTimeInterval] = useState<number | ''>('');

  const handleSave = () => {
    if (dropPercentage && timeInterval) {
      onSave({ address, dropPercentage, timeInterval });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Alert</DialogTitle>
          <DialogDescription>
            Set an alert for a drop in percentage over a specific time interval.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <label
              htmlFor='dropPercentage'
              className='block text-sm font-medium text-gray-700'
            >
              Drop Percentage (%)
            </label>
            <Input
              id='dropPercentage'
              type='number'
              value={dropPercentage}
              onChange={(e) => setDropPercentage(Number(e.target.value))}
              placeholder='e.g., 5'
              className='mt-1'
            />
          </div>
          <div>
            <label
              htmlFor='timeInterval'
              className='block text-sm font-medium text-gray-700'
            >
              Time Interval (minutes)
            </label>
            <Input
              id='timeInterval'
              type='number'
              value={timeInterval}
              onChange={(e) => setTimeInterval(Number(e.target.value))}
              placeholder='e.g., 2'
              className='mt-1'
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant='default'
            onClick={handleSave}
            disabled={!dropPercentage || !timeInterval}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
