import _difference from 'lodash/difference';
import _differenceBy from 'lodash/differenceBy';
import _isEqual from 'lodash/isEqual';
import _pullAllBy from 'lodash/pullAllBy';
import _each from 'lodash/each';
import _findIndex from 'lodash/findIndex';
import _without from 'lodash/without';
import _keyBy from 'lodash/keyBy';
import _sortBy from 'lodash/sortBy';
import _transform from 'lodash/transform';
import _isObject from 'lodash/isObject';

/**
 * Insert an item into an array at specified index and returns a sorted shallow copy.
 * @param array
 * @param item
 * @param targetIndex
 * @param orderKey
 * @returns {*[]}
 */
export const insert = (array, item, targetIndex, orderKey) => {
  if (array === undefined) {
    console.warn('Failed to insert item in collection.  Collection is undefined.');
    return;
  } else if (array === null) {
    console.warn('Failed to insert item in collection.  Collection is null.');
    return;
  } else if (!Array.isArray(array)) {
    console.warn('Failed to insert item in collection.  Collection is not an array.');
    return;
  } else if (item === undefined) {
    console.warn('Failed to insert item in collection.  Item is undefined.');
    return;
  } else if ((targetIndex < 0) || targetIndex > array.length) {
    console.warn('Failed to insert item in collection.  Target index is out of bounds.');
    return;
  } else if ((orderKey !== undefined) && (typeof orderKey !== 'string')) {
    console.warn('Failed to swap items in collection.  Invalid order key.');
    return;
  }

  array.splice(targetIndex, 0, item);

  if (orderKey) {
    let start, end = item[orderKey];

    if (end > targetIndex)
      start = targetIndex;
    else {
      start = end;
      end = targetIndex;
    }

    for (let i = start; i <= end; i++)
      array[i][orderKey] = i;

    return _sortBy(array, orderKey);
  }

  return array;
};

/**
 * Remove an item from an array and return a sorted shallow copy.
 * Mostly useful for an array of objects.
 * If an orderKey is provided, an object's order is shifted accordingly.
 * Note: This method mutates an array.
 * @param {*[]} array - collection
 * @param item - item to remove
 * @param {string=} orderKey - key that specifies the order of an object
 * @returns {*[]}
 */
export const remove = (array, item, orderKey) => {
  if (array === undefined) {
    console.warn('Failed to remove item from collection.  Collection is undefined.');
    return;
  } else if (array === null) {
    console.warn('Failed to remove item from collection.  Collection is null.');
    return;
  } else if (!Array.isArray(array)) {
    console.warn('Failed to remove item from collection.  Collection is not an array.');
    return;
  } else if (!array.length) {
    console.warn('Failed to remove item from collection.  Collection is empty.');
    return;
  } else if (item === undefined) {
    console.warn('Failed to remove item from collection.  Item is undefined.');
    return;
  } else if ((orderKey !== undefined) && (typeof orderKey !== 'string')) {
    console.warn('Failed to swap items in collection.  Invalid order key.');
    return;
  }

  const index = array.indexOf(item);

  if (index === -1)
    return array;

  const sorted = orderKey ? _sortBy(array, orderKey) : array;
  array.splice(index, 1);

  if (orderKey) {
    const sortedIndex = sorted.indexOf(item);
    sorted.splice(sortedIndex, 1);

    for (let i = sortedIndex; i < sorted.length; i++) {
      sorted[i][orderKey] = i;
    }

    return sorted;
  }

  return array;
};

/**
 * Moves an item in an array to a specified targetIndex and returns a sorted shallow copy.
 * Note: This method mutates array.
 * @param {*[]} array - collection
 * @param item - item to move
 * @param {int} targetIndex - index to move to
 * @param {string=} orderKey - key that specifies the order of an object
 * @returns {*[]}
 */
export const move = (array, item, targetIndex, orderKey) => {
  if (array === undefined) {
    console.warn('Failed to move item in collection.  Collection is undefined.');
    return;
  } else if (array === null) {
    console.warn('Failed to move item in collection.  Collection is null.');
    return;
  } else if (!Array.isArray(array)) {
    console.warn('Failed to move item in collection.  Collection is not an array.');
    return;
  } else if (item === undefined) {
    console.warn('Failed to move item in collection.  Item is undefined.');
    return;
  } else if ((targetIndex < 0) || targetIndex > array.length) {
    console.warn('Failed to move item in collection.  Target index is out of bounds.');
    return;
  } else if ((orderKey !== undefined) && (typeof orderKey !== 'string')) {
    console.warn('Failed to swap items in collection.  Invalid order key.');
    return;
  }

  const indexOfItem = array.indexOf(item);

  if (indexOfItem === -1) {
    console.warn('Failed to move item from collection.  Item not found.');
    return;
  }

  if (orderKey && (item[orderKey] === targetIndex))
    return array;

  array.splice(indexOfItem, 1);

  return insert(array, item, targetIndex, orderKey);
};

/**
 * Swaps items within an array and returns a sorted shallow copy.
 * Note: This method mutates array.
 * @param {*[]} array - collection
 * @param item1 - first item
 * @param item2 - second item
 * @param {string=} orderKey - key that specifies the order of an object
 * @returns {*[]}
 */
export const swap = (array, item1, item2, orderKey) => {
  if (array === undefined) {
    console.warn('Failed to swap items in collection.  Collection is undefined.');
    return;
  } else if (array === null) {
    console.warn('Failed to swap items in collection.  Collection is null.');
    return;
  } else if (!Array.isArray(array)) {
    console.warn('Failed to swap items in collection.  Collection is not an array.');
    return;
  } else if (item1 === undefined) {
    console.warn('Failed to swap items in collection.  Item 1 is undefined.');
    return;
  } else if (item2 === undefined) {
    console.warn('Failed to swap items in collection.  Item 2 is undefined.');
    return;
  } else if ((orderKey !== undefined) && (typeof orderKey !== 'string')) {
    console.warn('Failed to swap items in collection.  Invalid order key.');
    return;
  }

  if (item1 === item2)
    return;

  let index1, index2;

  if (!orderKey) {
    index1 = array.indexOf(item1);
    index2 = array.indexOf(item2);

    if (index1 !== index2) {
      array.splice(index1, 1, item2);
      array.splice(index2, 1, item1);
    }

    return array;
  } else {
    index1 = item1[orderKey];
    item1[orderKey] = item2[orderKey];
    item2[orderKey] = index1;

    return _sortBy(array, orderKey);
  }
};

/**
 * @callback updateFn
 * @param targetItem - target item.
 * @param srcItem - source item.
 */

/**
 * Mutates a target collection to only include the items from a
 * reference collection with a specified orderKey.
 * @param {object[]} target - target collection.
 * @param {object[]} src - reference collection.
 * @param {string} iteratee - name of property to iterate with.
 * @param {updateFn} [update] - Custom handler for updating target collection items.
 */
export const syncCollectionsBy = (target, src, iteratee, update) => {
  if (target === undefined) {
    console.warn('Failed to sync collection.  Target collection is undefined.');
    return;
  } else if (target === null) {
    console.warn('Failed to sync collection.  Target collection is null.');
    return;
  } else if (!Array.isArray(target)) {
    console.warn('Failed to sync collection.  Target collection is not an array.');
    return;
  } else if (src === undefined) {
    console.warn('Failed to sync collection.  Source collection is undefined.');
    return;
  } else if (src === null) {
    console.warn('Failed to sync collection.  Source collection is null.');
    return;
  } else if (!Array.isArray(src)) {
    console.warn('Failed to sync collection.  Source collection is not an array.');
    return;
  } else if ((iteratee !== undefined) && (typeof iteratee !== 'string')) {
    console.warn('Failed to swap items in collection.  Invalid order key.');
    return;
  }

  const toRemove = _differenceBy(target, src, iteratee);
  toRemove.length && _pullAllBy(target, toRemove, iteratee);

  _each(src, (item, i) => {
    const iterValue = item[iteratee];

    if (iterValue === undefined)
      return;

    let match;

    if (i >= target.length) {
      match = { [iteratee]: iterValue };
      target.push(match);
    } else {
      match = target[i];

      if (match[iteratee] !== iterValue) {
        const indexOfMatch = _findIndex(target, { [iteratee]: iterValue });

        if (indexOfMatch === -1) {
          match = { [iteratee]: iterValue };
          target.splice(i, 0, match);
        } else {
          match = target.splice(indexOfMatch, 1)[0];
          target.splice(i, 0, match);
        }
      }

      let props = _without(Object.keys(match), iteratee);

      _each(props, (prop) => {
        if (item.hasOwnProperty(prop)) {
          match[prop] = item[prop];
        }
      });
    }

    update && update(match, item);
  });
};

/**
 * Checks if a reference collection contains the values in another collection.
 * If comparing collections of objects, an id key can be provided to compare
 * collections by presence rather than values.
 * @param {object[]} ref - reference collection.
 * @param {object[]} values - Collection to check against the ref.
 * @param {string=} idKey - name of an identifying property.
 * @returns {boolean}
 */
export const contains = (ref, values, idKey) => {
  if (ref === values)
    return true;

  if (ref === undefined) {
    console.warn('Failed to check containment.  Reference collection is undefined.');
    return;
  } else if (ref === null) {
    console.warn('Failed to check containment.  Reference collection is null.');
    return;
  } else if (!Array.isArray(ref)) {
    console.warn('Failed to check containment.  Reference collection is not an array.');
    return;
  } else if (values === undefined) {
    console.warn('Failed to check containment.  Values collection is undefined.');
    return;
  } else if (values === null) {
    console.warn('Failed to check containment.  Values collection is null.');
    return;
  } else if (!Array.isArray(values)) {
    console.warn('Failed to check containment.  Values collection is not an array.');
    return;
  } else if ((idKey !== undefined) && (typeof idKey !== 'string')) {
    console.warn('Failed to check containment.  Invalid id key.');
    return;
  }

  if (idKey) {
    const itemMap = _keyBy(ref, idKey);
    return values.every((item) => itemMap[item[idKey]]);
  }

  return values.every((value) => ref.includes(value));
};

/**
 * Checks if two collections contain the same items.
 * If comparing collections of objects, an id key can be provided to compare
 * collections by presence rather than values.
 * @param {object[]} arr1 - First collection.
 * @param {object[]} arr2 - Second collection.
 * @param {string=} idKey - name of an identifying property.
 * @returns {boolean}
 */
export const isSame = (arr1, arr2, idKey) => {
  if (arr1 === arr2)
    return true;

  if (arr1 === undefined) {
    console.warn('Failed to compare collections.  Collection 1 is undefined.');
    return;
  } else if (arr1 === null) {
    console.warn('Failed to compare collections.  Collection 1 is null.');
    return;
  } else if (!Array.isArray(arr1)) {
    console.warn('Failed to compare collections.  Collection 1 is not an array.');
    return;
  } else if (arr2 === undefined) {
    console.warn('Failed to compare collections.  Collection 2 is undefined.');
    return;
  } else if (arr2 === null) {
    console.warn('Failed to compare collections.  Collection 2 is null.');
    return;
  } else if (!Array.isArray(arr2)) {
    console.warn('Failed to compare collections.  Collection 2 is not an array.');
    return;
  } else if ((idKey !== undefined) && (typeof idKey !== 'string')) {
    console.warn('Failed to compare collections.  Invalid id key.');
    return;
  }

  return contains(arr1, arr2, idKey) && contains(arr2, arr1, idKey);
};

/**
 * Creates an array of three objects. Comparison is done by key presence ONLY.
 * The first object contains the properties of o1 not found in o2.
 * The second object contains properties not found in o1.
 * The third object contains references of properties from o1 that are found o2.
 * @param o1 - First object
 * @param o2 - Second object
 * @returns {[{}, {}, {}]}
 */
export const findDifferences = (o1, o2) => {
  if (o1 === o2) {
    return [{}, {}, o1];
  } else if (o1 === undefined) {
    console.warn('Failed to compare collections.  Collection 1 is undefined.');
    return;
  } else if (o1 === null) {
    console.warn('Failed to compare collections.  Collection 1 is null.');
    return;
  } else if (typeof o1 !== 'object') {
    console.warn('Failed to compare collections.  Collection 1 is not an array.');
    return;
  } else if (o2 === undefined) {
    console.warn('Failed to compare collections.  Collection 2 is undefined.');
    return;
  } else if (o2 === null) {
    console.warn('Failed to compare collections.  Collection 2 is null.');
    return;
  } else if (typeof o2 !== 'object') {
    console.warn('Failed to compare collections.  Collection 2 is not an object.');
    return;
  }

  const o1Diffs = {};
  const o2Diffs = {};
  const same = {};

  _each(o1, (o, key) => {
    if (o2[key])
      same[key] = o;
    else
      o1Diffs[key] = o;
  });

  _difference(Object.keys(o2), Object.keys(same)).forEach((key) => {
    o2Diffs[key] = o2[key];
  });

  return [o1Diffs, o2Diffs, same];
};

export const findDeepDifferences = (o1, o2) => {
  if (o1 === o2) {
    return [{}, {}, o1];
  } else if (o1 === undefined) {
    console.warn('Failed to compare collections.  Collection 1 is undefined.');
    return;
  } else if (o1 === null) {
    console.warn('Failed to compare collections.  Collection 1 is null.');
    return;
  } else if (typeof o1 !== 'object') {
    console.warn('Failed to compare collections.  Collection 1 is not an array.');
    return;
  } else if (o2 === undefined) {
    console.warn('Failed to compare collections.  Collection 2 is undefined.');
    return;
  } else if (o2 === null) {
    console.warn('Failed to compare collections.  Collection 2 is null.');
    return;
  } else if (typeof o2 !== 'object') {
    console.warn('Failed to compare collections.  Collection 2 is not an object.');
    return;
  }

  const o1Diffs = {};
  const o2Diffs = {};
  const same = {};

  _each(o1, (o, key) => {
    const match = o2[key];

    if (match && _isEqual(o, match))
      same[key] = o;
    else
      o1Diffs[key] = o;
  });

  _each(o2, (o, key) => {
    const match = o1[key];

    if (!o1Diffs[key] && match && _isEqual(o, match))
      same[key] = o;
    else
      o2Diffs[key] = o;
  });

  return [o1Diffs, o2Diffs, same];
};

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export const deepDifferences = (object, base) => {
  function changes(object, base) {
    return _transform(object, function(result, value, key) {
      if (!_isEqual(value, base[key])) {
        result[key] = (_isObject(value) && _isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }

  return changes(object, base);
};

/**
 * Returns true/false if two objects are different, performs deep comparison
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return true or false if objects are different
 */
export const isDeepDifferent = (o1, o1Base) => {
  return (Object.keys(deepDifferences(o1, o1Base)).length > 0);
};

export const isArrayDeepDifferent = (arr1 = [], arr2 = []) => {
  if (!(Array.isArray(arr1) && Array.isArray(arr2))) return false;

  return (isDeepDifferent(arr1, arr2) || arr1.length !== arr2.length);
};

/**
 * Flattens an array of nested arrays into a single array of depth 1
 * @param arr,      array to flatten
 * @returns arr,    flatted array
 */
export const flatDeep = (arr) => {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);
};