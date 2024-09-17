import { z } from "zod";

const cpfOrCnpjRegex = /^(?:\d{11}|\d{14})$/; // Basic validation regex for CPF/CNPJ

export const schema = z
  .object({
    document: z
      .string()
      .regex(cpfOrCnpjRegex, "Document is invalid")
      .min(11, "CPF must be 11 digits")
      .max(14, "CNPJ must be 14 digits"),
    name: z.string().nonempty("Producer Name is required"),
    farmName: z.string().nonempty("Farm Name is required"),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    totalArea: z.coerce
      .string()
      .min(0, "Total area must be a positive number")
      .transform((val) => parseFloat(val)),
    cultivableArea: z.coerce
      .string()
      .min(0, "Cultivable area must be a positive number")
      .transform((val) => parseFloat(val)),
    vegetationArea: z.coerce
      .string()
      .min(0, "Vegetation area must be a positive number")
      .transform((val) => parseFloat(val)),
    crops: z
      .array(z.enum(["Soybean", "Corn", "Cotton", "Coffee", "Sugarcane"]))
      .nonempty("Select at least one crop"),
  })
  .refine(
    (data) => {
      return data.cultivableArea + data.vegetationArea <= data.totalArea;
    },
    {
      message:
        "The sum of cultivable area and vegetation area cannot be greater than the total area of the farm",
      path: ["cultivableArea"],
    }
  );
