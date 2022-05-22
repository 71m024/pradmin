export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toCapitalizedWords(words) {
  const wordArray = words.match(/[A-Za-z][a-z]*/g) || [];
  return wordArray.map(capitalizeFirstLetter).join(' ');
}
