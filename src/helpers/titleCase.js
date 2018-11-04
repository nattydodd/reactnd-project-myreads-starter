// Takes a camel cased string and turns it into title case
// Ex: titleCase("camelCasedString") returns "Camel Cased String"

const titleCase = (string) => {
  let title = string.replace( /([A-Z])/g, " $1" );
  return title.charAt(0).toUpperCase() + title.slice(1);
}

export default titleCase;