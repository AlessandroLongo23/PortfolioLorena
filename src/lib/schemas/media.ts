import { z } from 'zod';

export const previewSchema = z.discriminatedUnion('kind', [
	z.object({
		kind: z.literal('video'),
		src: z.string().min(1, 'Il file video è obbligatorio.'),
		poster: z.string().optional()
	}),
	z.object({
		kind: z.literal('image'),
		src: z.string().min(1, 'L’immagine è obbligatoria.'),
		alt: z.string().min(1, 'Inserisci un testo alternativo per l’immagine.')
	})
]);

export const mediaBlockSchema = z.discriminatedUnion('kind', [
	z.object({
		kind: z.literal('video'),
		src: z.string().min(1, 'Il file video è obbligatorio.'),
		poster: z.string().optional(),
		caption: z.string().optional()
	}),
	z.object({
		kind: z.literal('image'),
		src: z.string().min(1, 'L’immagine è obbligatoria.'),
		alt: z.string().min(1, 'Inserisci un testo alternativo per l’immagine.'),
		caption: z.string().optional()
	}),
	z.object({
		kind: z.literal('gallery'),
		images: z
			.array(
				z.object({
					src: z.string().min(1, 'L’immagine è obbligatoria.'),
					alt: z.string().min(1, 'Inserisci un testo alternativo.')
				})
			)
			.min(1, 'La galleria deve contenere almeno un’immagine.'),
		caption: z.string().optional()
	})
]);

export type Preview = z.infer<typeof previewSchema>;
export type MediaBlockInput = z.infer<typeof mediaBlockSchema>;
