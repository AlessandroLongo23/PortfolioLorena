import { z } from 'zod';

export const skillCategoryEnum = z.enum(['analytics', 'marketing', 'communication', 'technical']);

export const skillSchema = z.object({
	name: z.string().min(1, 'Il nome è obbligatorio.').max(100, 'Massimo 100 caratteri.'),
	category: skillCategoryEnum,
	sort_order: z.number().int().default(0)
});

export type SkillInput = z.infer<typeof skillSchema>;
