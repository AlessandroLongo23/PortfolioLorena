import { z } from 'zod';

export const visualStyleEnum = z.enum(['tech-gradient', 'minimalist', 'playful', 'elegant', 'field']);

export const starMethodSchema = z.object({
	situation: z.string().min(1, 'Descrivi la situazione.'),
	task: z.string().min(1, 'Descrivi il compito.'),
	action: z.string().min(1, 'Descrivi l’azione.'),
	result: z.string().min(1, 'Descrivi il risultato.')
});

export const experienceSchema = z.object({
	slug: z
		.string()
		.min(1, 'Lo slug è obbligatorio.')
		.regex(/^[a-z0-9-]+$/, 'Solo lettere minuscole, numeri e trattini.'),
	title: z.string().min(1, 'Il titolo è obbligatorio.'),
	role: z.string().min(1, 'Il ruolo è obbligatorio.'),
	duration: z.string().min(1, 'La durata è obbligatoria.'),
	focus: z.string().min(1, 'Il focus è obbligatorio.'),
	tags: z.array(z.string().min(1)).default([]),
	visual_style: visualStyleEnum,
	brand_color: z
		.string()
		.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Colore non valido (es. #6366f1).'),
	logo_path: z.string().nullable().optional(),
	cover_image_path: z.string().nullable().optional(),
	is_summary_card: z.boolean().default(false),
	star: starMethodSchema.nullable().optional(),
	sort_order: z.number().int().default(0)
});

export type ExperienceInput = z.infer<typeof experienceSchema>;
export type StarMethodInput = z.infer<typeof starMethodSchema>;
