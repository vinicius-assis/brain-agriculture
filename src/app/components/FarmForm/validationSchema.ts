import { z } from "zod";

// Regex CPF e CNPJ
const cpfOrCnpjRegex =
  /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/;

export const schema = z
  .object({
    document: z
      .string()
      .regex(cpfOrCnpjRegex, "Document is invalid")
      .transform((val) => val.replace(/\D/g, ""))
      .refine((val) => val.length === 11 || val.length === 14, {
        message: "Document must be 11 or 14 digits",
      }),
    name: z.string().nonempty("Producer Name is required"),
    farmName: z.string().nonempty("Farm Name is required"),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    totalArea: z
      .string()
      .transform((val) => parseFloat(val))
      .refine((val) => val >= 0, "Total area must be a positive number"),
    cultivableArea: z
      .string()
      .transform((val) => parseFloat(val))
      .refine((val) => val >= 0, "Cultivable area must be a positive number"),
    vegetationArea: z
      .string()
      .transform((val) => parseFloat(val))
      .refine((val) => val >= 0, "Vegetation area must be a positive number"),
    crops: z
      .array(z.enum(["Soybean", "Corn", "Cotton", "Coffee", "Sugarcane"]))
      .nonempty("Select at least one crop"),
  })
  .refine(
    (data) => data.cultivableArea + data.vegetationArea <= data.totalArea,
    {
      message:
        "The sum of cultivable area and vegetation area cannot be greater than the total area of the farm",
      path: ["cultivableArea"],
    }
  );
