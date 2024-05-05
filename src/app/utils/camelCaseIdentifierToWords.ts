export default function camelCaseIdentifierToWords(identifier: string) {
  let words = identifier.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  words = words.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  return words.charAt(0).toUpperCase() + words.slice(1).toLowerCase();
}
