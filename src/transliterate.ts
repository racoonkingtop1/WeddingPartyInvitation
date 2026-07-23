// Practical Cyrillic → Latin transliteration for building URL-safe guest
// slugs (e.g. "Андрей" → "andrey"). Not a formal GOST standard — optimized
// for producing short, readable, conventional-looking name slugs.
const MAP: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
  с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
};

export function transliterate(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((char) => (char in MAP ? MAP[char] : char))
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
