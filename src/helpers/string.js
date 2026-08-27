/**
 * String helpers.
 */

/**
 * Turns a string into a lowercased, dash separated slug.
 *
 * Accents are stripped and any non alphanumeric character becomes a dash.
 *
 * @param {string} str
 * @returns {string}
 */
export function slugify(str) {
    return String(str == null ? '' : str)
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
