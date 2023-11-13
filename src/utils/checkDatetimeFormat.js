export const checkDatetimeFormat = str => {
  const iso8601Pattern = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})$/;
  const rfc1123Pattern = /^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT/;
  const mmddyyyyPattern = /^\d{2}\/\d{2}\/\d{4}, \d{1,2}:\d{2}:\d{2} [APap][Mm]/;
  const ddmmyyyyPattern = /^\d{2}\d{2}\d{4}/;
  const customDatePattern = /^Mon\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[+-]\d{4}\s\(.+\)$/;

  // Check if the string matches any of the patterns
  return (
    iso8601Pattern.test(str) || rfc1123Pattern.test(str) || mmddyyyyPattern.test(str) || ddmmyyyyPattern.test(str) || customDatePattern.test(str)
  );
};
