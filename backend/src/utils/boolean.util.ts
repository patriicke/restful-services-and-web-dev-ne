export const isTrueOrFalse = (inputString?: string) => {
  if (!inputString) return false;
  else if (inputString.toLowerCase() === 'true') return true;
  else if (inputString.toLowerCase() === 'false') return false;
  else return false;
};
