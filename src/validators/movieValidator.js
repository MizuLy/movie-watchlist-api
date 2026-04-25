const { z } = require("zod");

const addMovieSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  overview: z.string().trim().optional(),
  releaseYear: z.coerce
    .number()
    .int()
    .min(1888, "Invalid release year")
    .max(new Date().getFullYear(), "Release year cannot be in the future"),
  genres: z.array(z.string()).default([]),
  runTime: z.coerce.number().int().min(1).optional(),
  posterUrl: z.string().url("Invalid poster URL").optional(),
});

const updateMovieSchema = z.object({
  title: z.string().trim().min(1, "Title is required").optional(),
  overview: z.string().trim().optional(),
  releaseYear: z.coerce
    .number()
    .int()
    .min(1888, "Invalid release year")
    .max(new Date().getFullYear(), "Release year cannot be in the future")
    .optional(),
  genres: z.array(z.string()).optional(),
  runTime: z.coerce.number().int().min(1).optional(),
  posterUrl: z.string().url("Invalid poster URL").optional(),
});

module.exports = { addMovieSchema, updateMovieSchema };
