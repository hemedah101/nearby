export function escapeRegexSpecialCharacters(string: string) {
  return string.replace(/[<>*()?]/g, '\\$&');
}
