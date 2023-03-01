export const kebabize = (str, joiner = "-") =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? joiner : "") + $.toLowerCase()
  );
