import { z } from "zod";

const cpfOrCnpjRegex = /^(?:\d{11}|\d{14})$/; // Basic validation regex for CPF/CNPJ

export const schema = z.object({
  document: z
    .string()
    .regex(cpfOrCnpjRegex, "Document is invalid")
    .min(11, "CPF must be 11 digits")
    .max(14, "CNPJ must be 14 digits"),
  producerName: z.string().nonempty("Producer Name is required"),
  farmName: z.string().nonempty("Farm Name is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  totalArea: z.coerce.string().min(0, "Total area must be a positive number"),
  cultivableArea: z.coerce
    .string()
    .min(0, "Cultivable area must be a positive number"),
  vegetationArea: z.coerce
    .string()
    .min(0, "Vegetation area must be a positive number"),
  crops: z.enum(["Soja", "Milho", "Algodão", "Café", "Cana de Açúcar"], {
    required_error: "Select at least one crop",
  }),
});
