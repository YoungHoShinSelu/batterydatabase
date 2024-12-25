import { z } from "zod";

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const facilityImportSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.enum(["active", "engaged", "past", "general"]),
  address: z.string().min(1, "Address is required"),
  phone: z.string().regex(phoneRegex, "Phone must be in format (XXX) XXX-XXXX"),
  email: z.string().email().optional().nullable(),
  website: z.string().regex(urlRegex).optional().nullable(),
  buying_price: z.number().positive().optional().nullable(),
  selling_price: z.number().positive().optional().nullable(),
  last_contact: z.string().datetime().optional().nullable(),
  size: z.enum(["Small", "Medium", "Large"]),
  general_remarks: z.string().optional().nullable(),
  internal_notes: z.string().optional().nullable(),
});

export type FacilityImportData = z.infer<typeof facilityImportSchema>;

export const validateImportData = (data: any[]): { 
  validData: FacilityImportData[], 
  errors: Record<number, string[]> 
} => {
  const validData: FacilityImportData[] = [];
  const errors: Record<number, string[]> = {};

  data.forEach((row, index) => {
    try {
      const validatedRow = facilityImportSchema.parse(row);
      validData.push(validatedRow);
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors[index] = error.errors.map(e => e.message);
      }
    }
  });

  return { validData, errors };
};