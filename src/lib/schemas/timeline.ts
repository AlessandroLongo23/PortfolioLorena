import { z } from 'zod';

export const timelineEventSchema = z.object({
	year: z
		.string()
		.min(1, 'L’anno è obbligatorio.')
		.max(20, 'Massimo 20 caratteri.'),
	title: z.string().min(1, 'Il titolo è obbligatorio.'),
	description: z.string().min(1, 'La descrizione è obbligatoria.'),
	sort_order: z.number().int().default(0)
});

export type TimelineEventInput = z.infer<typeof timelineEventSchema>;
