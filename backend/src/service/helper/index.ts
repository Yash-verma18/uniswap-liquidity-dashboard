// Helper function to handle BigInt serialization
export function serializeBigInt(obj: any): any {
  if (typeof obj === 'bigint') {
    return obj.toString(); // Convert BigInt to string
  }
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt); // Recursively handle arrays
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, serializeBigInt(value)])
    );
  }
  return obj; // Return other types unchanged
}
