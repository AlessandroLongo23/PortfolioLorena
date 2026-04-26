import { z } from 'zod';
import { mediaBlockSchema, previewSchema } from './media';

export const caseProjectSchema = z.object({
	slug: z
		.string()
		.min(1, 'Lo slug è obbligatorio.')
		.regex(/^[a-z0-9-]+$/, 'Solo lettere minuscole, numeri e trattini.'),
	title: z.string().min(1, 'Il titolo è obbligatorio.'),
	category: z.string().min(1, 'La categoria è obbligatoria.'),
	year: z.string().nullable().optional(),
	tags: z.array(z.string().min(1)).default([]),
	brand_color: z
		.string()
		.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Colore non valido (es. #6366f1).'),
	description: z.string().min(1, 'La descrizione è obbligatoria.'),
	preview: previewSchema,
	media: z.array(mediaBlockSchema).default([]),
	sort_order: z.number().int().default(0)
});

export type CaseProjectInput = z.infer<typeof caseProjectSchema>;
