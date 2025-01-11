export const formatVitaminName = (name) => {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};
