import express from 'express';

import { initiateAlert } from '../service/alert';
import { getTopPools } from '../service/uniswap';

const router = express.Router();

router.get('/api/top-pools', async (req, res) => {
  try {
    const topPools = await getTopPools();
    console.log('sending  top pools', topPools.length);
    res.json(topPools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/api/alert', async (req, res) => {
  try {
    const { address, dropPercentage, timeInterval } = req.body;
    await initiateAlert(address, dropPercentage, timeInterval);
    res.send({
      status: 'sucess',
      message: 'alert initiated',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as generalRouter };
