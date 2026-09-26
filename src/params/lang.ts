import type { ParamMatcher } from '@sveltejs/kit';

// English is the default and has no prefix; only Italian takes a segment.
export const match: ParamMatcher = (param) => param === 'it';
