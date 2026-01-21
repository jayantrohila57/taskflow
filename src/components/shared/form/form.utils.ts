/**
 * Converts input to a safe slug for use as a form field name.
 * - Keeps lowercase letters, numbers (not at the start), and dashes.
 * - Strips symbols, emojis, and extra separators.
 * - Ensures slug doesn't start with a digit.
 *
 * @param input - The input to slugify.
 * @returns A safe, kebab-case field name.
 */
export const toSlugCase = (input?: unknown): string => {
  if (typeof input !== 'string') return ''

  let slug = input
    .normalize()
    ?.toLowerCase()
    ?.replace(/[^a-z0-9]+/g, '-')
    ?.replace(/^-+|-+$/g, '')
    ?.replace(/--+/g, '-')

  if (/^[0-9]/?.test(slug)) {
    slug = `field-${slug}`
  }

  return slug
}
