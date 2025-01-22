import mongoose, { Schema, Document } from 'mongoose';

interface ILiquidity extends Document {
  poolAddress: string;
  timestamp: Date;
  liquidity: string; // Store liquidity as a string to handle large values
}

const LiquiditySchema: Schema = new Schema({
  poolAddress: { type: String, required: true },
  timestamp: { type: Date, required: true },
  liquidity: { type: String, required: true },
});

// Export the Model
export default mongoose.model<ILiquidity>('Liquidity', LiquiditySchema);
