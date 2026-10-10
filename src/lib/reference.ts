import { randomBytes } from "crypto";

/** Generates a unique, non-sequential public booking reference like MOL-20261010-A8F31 */
export function generateBookingReference(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const random = randomBytes(4).toString("hex").toUpperCase().slice(0, 5);
  return `MOL-${y}${m}${d}-${random}`;
}
