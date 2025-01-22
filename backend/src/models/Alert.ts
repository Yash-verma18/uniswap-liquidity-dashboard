import mongoose, { Schema, Document } from 'mongoose';

// Define the Alert Interface
interface IAlert extends Document {
  poolAddress: string;
  dropPercentage: number; // Percentage as a number
  timeInterval: number; // Duration as a number (e.g., in seconds or minutes)
}

// Schema Definition
const AlertSchema: Schema = new Schema({
  poolAddress: { type: String, required: true },
  dropPercentage: { type: Number, required: true }, // Percentage as a number
  timeInterval: { type: Number, required: true }, // Duration as a number
});

// Export the Model
export default mongoose.model<IAlert>('Alert', AlertSchema);
