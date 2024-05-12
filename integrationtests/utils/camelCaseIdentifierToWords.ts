const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const camelCaseIdentifierToWords = (identifier: string) => {
  let words = identifier.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  words = words.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  return capitalizeFirstLetter(words);
};
