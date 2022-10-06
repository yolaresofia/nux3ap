import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder({
  projectId: "q5syy0z1",
  dataset: "production",
  apiVersion: "2019-01-29", // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
});

export function urlFor(source) {
  return builder.image(source);
}
export function selectAll(selector) {
  return document.querySelectorAll(selector);
}
export function select(selector) {
  return document.querySelector(selector);
}
export function matches(elem, filter) {
  if (elem && elem.nodeType === 1) {
    if (!filter) return;
    return elem.matches(filter);
  }
}
export function getPreviousSiblings(elem, filter) {
  const sibs = [];
  while ((elem = elem.previousSibling)) {
    if (this.matches(elem, filter)) sibs.push(elem);
  }

  return sibs;
}
export function getNextSiblings(elem, filter) {
  const sibs = [];
  while ((elem = elem.nextSibling)) {
    if (this.matches(elem, filter)) sibs.push(elem);
  }

  return sibs;
}
export function returnThemeClass(isBackground, color, mainTheme) {
  if (isBackground) {
    return mainTheme === "black"
      ? "bg-black text-white"
      : `bg-${color}`;
  } else {
    return mainTheme === "black" ? "text-white" : `text-${color}`;
  }
}
export function returnCategoryClass(category) {
  switch (category) {
    case "creative direction":
      return "bg-green";
    case "photography":
      return "bg-yellow";
    case "sound":
      return "bg-blue";
    case "direction":
      return "bg-cyan";
    case "post-production":
      return "bg-magenta";
    default:
      return "bg-black";
  }
}
