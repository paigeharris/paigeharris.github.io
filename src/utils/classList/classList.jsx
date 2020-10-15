import _map from "lodash/map";
import _compact from "lodash/compact";

/**
 * cl
 * Forms a single string that can be used with the className property.
 * @param {(string||object|object[]|string[])} items - Array of class names or conditional classes.
 * @param {string} [ctx] - Context for style module.  Usually, the classes object.
 * @returns a string of space separated class names.
 */
export const cl = (items, ctx = {}) => {
  let classList = null;

  if (!items)
    return '';

  if (typeof items === 'string') { // for single classes
    return ctx[items] || items;
  } else if (typeof items === 'object') { // for conditional classes (e.g. { active: true })
    classList = _map(items, (v, k) => {
      return (typeof v === 'boolean')
        ? v && (ctx[k] || k)
        : cl(v, ctx);
    });
  } else if (Array.isArray(items)) { // for array of classes
    classList = items.map((item) => cl(item, ctx));
  }

  if (classList) {
    return _compact(classList).join(' ');
  }

  return '';
};