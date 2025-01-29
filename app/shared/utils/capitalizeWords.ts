export const capitalizeWords = (input: string): string => {
  // Perform the character replacements
  let txt = input.replace(/i/g, "İ").replace(/ı/g, "I").replace(/I/g, "ı").replace(/İ/g, "i");

  // Split the input string into words
  const words: string[] = txt.split(" ");

  // Iterate through each word
  for (let i = 0; i < words.length; i++) {
    // If the word is not empty
    if (words[i].length > 0) {
      // Lowercase all characters except the first one
      words[i] = words[i][0].toUpperCase() + words[i].substring(1).toLowerCase();
    }
  }

  // Join the words back together with spaces and return the result
  return words.join(" ");
};
