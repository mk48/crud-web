import { z } from "zod";

export const zodNullableNumber = () =>
  z
    .union([z.null(), z.number(), z.string()])
    .transform(value => (value === "" ? null : value))
    .refine(value => value === null || !isNaN(Number(value)), {
      message: "Invalid number",
    })
    .transform(value => (value === null ? null : Number(value)));
