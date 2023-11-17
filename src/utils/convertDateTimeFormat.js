export const convertDateTimeFormat = str => {
  const dateObject = new Date(str);
  if (isNaN(dateObject.getTime())) {
    return null;
  }
  return dateObject;
};
