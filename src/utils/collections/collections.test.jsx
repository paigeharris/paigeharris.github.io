import React from 'react';
import * as utils from './collections';

describe('Utility functions for collections', () => {
  describe('insert', () => {
    it('inserts an item', () => {
      const arr = [1, 2, 4, 5];
      utils.insert(arr, 3, 2);

      expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    it('inserts an item with an idKey', () => {
      const arr = [{ id: 0, order: 0 }, { id: 1, order: 1 }, { id: 3, order: 3 }];
      utils.insert(arr, { id: 2, order: 2 }, 2, 'order');

      expect(arr).toEqual([{ id: 0, order: 0 }, { id: 1, order: 1 }, { id: 2, order: 2 }, { id: 3, order: 3 }]);
    });
  });

  describe('remove', () => {
    it('removes an item', () => {
      const arr = [1, 2, 3, 4, 5];
      utils.remove(arr, 3);

      expect(arr).toEqual([1, 2, 4, 5]);
    });

    it('removes an item with an idKey', () => {
      const arr = [{ id: 2, order: 2 }, { id: 0, order: 0 }, { id: 1, order: 1 }];
      utils.remove(arr, arr[1], 'order');

      expect(arr).toEqual([{ id: 2, order: 1 }, { id: 1, order: 0 }]);
    });
  });

  describe('move', () => {
    it('moves items', () => {
      const arr = [1, 2, 3, 4, 5];

      utils.move(arr, 2, 2);
      expect(arr).toEqual([1, 3, 2, 4, 5]);

      utils.move(arr, 3, 2);
      expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    it('moves items with an idKey', () => {
      const arr = [{ id: 0, order: 0 }, { id: 1, order: 1 }, { id: 2, order: 2 }, { id: 3, order: 3 }];

      utils.move(arr, arr[3], 1, 'order');
      expect(arr).toEqual([{ id: 0, order: 0 }, { id: 3, order: 1 }, { id: 1, order: 2 }, { id: 2, order: 3 }]);

      utils.move(arr, arr[1], 3, 'order');
      expect(arr).toEqual([{ id: 0, order: 0 }, { id: 1, order: 1 }, { id: 2, order: 2 }, { id: 3, order: 3 }]);
    });
  });

  describe('swap', () => {
    it('swaps items', () => {
      const arr = [1, 2, 3, 4, 5];
      utils.swap(arr, 2, 3);

      expect(arr).toEqual([1, 3, 2, 4, 5]);
    });

    it('swaps items with an idKey', () => {
      const arr = [{ id: 0, order: 0 }, { id: 2, order: 2 }, { id: 1, order: 1 }, { id: 3, order: 3 }];
      utils.swap(arr, arr[1], arr[2], 'order');

      expect(arr).toEqual([{ id: 0, order: 0 }, { id: 2, order: 1 }, { id: 1, order: 2 }, { id: 3, order: 3 }]);
    });
  });

  describe('syncCollectionsBy', () => {
    it('syncs collection size', () => {
      let target = [
        { id: 2, prop: 'c' },
        { id: 1, prop: 'b' }
      ];

      let src = [
        { id: 0, prop: 'a', prop2: 'a2' },
        { id: 2, prop: 'not c', prop2: 'c2' }
      ];

      utils.syncCollectionsBy(target, src, 'id');

      expect(target).toEqual([
        { id: 0 },
        { id: 2, prop: 'not c' }
      ]);
    });

    it('syncs collection order', () => {
      let target = [
        { id: 2, prop: 'c' },
        { id: 0, prop: 'a' },
        { id: 1, prop: 'b' }
      ];

      let src = [
        { id: 0, prop: 'a', prop2: 'a2' },
        { id: 2, prop: 'not c', prop2: 'c2' },
        { id: 3, prop: 'd', prop2: 'd2' }
      ];

      utils.syncCollectionsBy(target, src, 'id');

      expect(target).toEqual([
        { id: 0, prop: 'a' },
        { id: 2, prop: 'not c' },
        { id: 3 }
      ]);
    });

    it('calls the update callback', () => {
      let target = [
        { id: 0, prop: 'a' },
        { id: 1, prop: 'b' },
        { id: 2, prop: 'c' }
      ];

      let src = [
        { id: 0, prop: 'a', prop2: 'a2' },
        { id: 2, prop: 'not c', prop2: 'c2' },
        { id: 3, prop: 'd', prop2: 'd2' }
      ];

      utils.syncCollectionsBy(target, src, 'id', (targetItem, srcItem) => {
        targetItem.prop2 = srcItem.prop2;
      });

      expect(target).toEqual([
        { id: 0, prop: 'a', prop2: 'a2' },
        { id: 2, prop: 'not c', prop2: 'c2' },
        { id: 3, prop2: 'd2' }
      ]);
    });
  });

  describe('contains', () => {
    it('works on arrays of primitives', () => {
      expect(utils.contains([1, 2, 3], [3, 1])).toBe(true);
    });

    it('works on array of objects with an idKey', () => {
      const arr1 = [
        { id: 0, prop: 'a' },
        { id: 1, prop: 'b' },
        { id: 2, prop: 'c' }
      ];

      const arr2 = [
        { id: 0, prop: 'a' },
        { id: 2, prop: 'b' }
      ];

      expect(utils.contains(arr1, arr2, 'id')).toBe(true);
    });
  });


  describe('isSame', () => {
    it('works on arrays of primitives', () => {
      expect(utils.isSame([1, 2, 3], [3, 1])).toBe(false);
      expect(utils.isSame([1, 2, 3], [2, 1, 3])).toBe(true);
    });

    it('works on array of objects with an idKey', () => {
      const arr1 = [
        { id: 0, prop: 'a' },
        { id: 1, prop: 'b' },
        { id: 2, prop: 'c' }
      ];

      const arr2 = [
        { id: 0, prop: 'a' },
        { id: 2, prop: 'b' }
      ];

      expect(utils.isSame(arr1, arr2, 'id')).toBe(false);

      arr2.push({ id: 1 });
      expect(utils.isSame(arr1, arr2, 'id')).toBe(true);
    });
  });

  describe('findDifferences', () => {
    it('finds differences', () => {
      const o1 = { a: 1, b: 2, c: 3 };
      const o2 = { b: 1, c: 2, d: 3, e: 4 };

      expect(utils.findDifferences(o1, o2)).toEqual([
        { a: 1 },
        { d: 3, e: 4 },
        { b: 2, c: 3 }
      ]);
    });
  });

  describe('findDeepDifferences', () => {
    it('finds deep differences', () => {
      const o1 = { a: 1, b: 1, c: 3 };
      const o2 = { b: 1, c: 2, d: 3, e: 4 };

      expect(utils.findDeepDifferences(o1, o2)).toEqual([
        { a: 1, c: 3 },
        { c: 2, d: 3, e: 4 },
        { b: 1 }
      ]);
    });
  });

  describe(`deepDifferences`, () => {
    it(`returns deep differences`, () => {
      const o1 = {
        a: 1, b: 1, c: 3,
        arr: ['1', '2', '3'],
        num: 1,
        str: 'str2',
        obj: {
          objArr: [1, 2, 3]
        }
      };
      const o2 = {
        a: 2, b: 1, c: 3, d: {
          arr: ['2', '3', '4'],
          num: 2,
          str: 'str2',
          obj: {
            objArr: [2, 3, 4]
          }
        }
      };

      expect(utils.deepDifferences(o1, o2)).toEqual({
          a: 1,
          arr: ['1', '2', '3'],
          num: 1,
          obj: { objArr: [1, 2, 3] },
          str: 'str2'
        }
      );
    });
  });

  describe(`isDeepDifferent`, () => {
    it(`returns true or false for shallow differences`, () => {
      const o1 = { a: 1, b: 1, c: 3 };
      const o2 = { b: 1, c: 2, d: 3, e: 4 };

      expect(utils.isDeepDifferent(o1, o2)).toEqual(true);
      expect(utils.isDeepDifferent(o1, o1)).toEqual(false);
    });
    it(`returns true or false for deep differences`, () => {
      const o1 = {
        a: 1, b: 1, c: 3,
        arr: ['1', '2', '3'],
        num: 1,
        str: 'str2',
        obj: {
          objArr: [1, 2, 3]
        }
      };
      const o2 = {
        a: 2, b: 1, c: 3, d: {
          arr: ['2', '3', '4'],
          num: 2,
          str: 'str2',
          obj: {
            objArr: [2, 3, 4]
          }
        }
      };

      expect(utils.isDeepDifferent(o1, o2)).toEqual(true);
      expect(utils.isDeepDifferent(o1, o1)).toEqual(false);
    });
  });

  describe(`isArrayDeepDifferent`, () => {
    it(`returns true or false for an array with no objects`, () => {
      const arr1 = ['a', 'b', 'c'];
      const arr2 = ['a', 'b', 'c'];
      const arr3 = ['a', 'b', 'c', 'd'];
      const arr4 = ['a', 'b', 'c', 'e'];

      expect(utils.isArrayDeepDifferent(arr1, arr2)).toEqual(false);
      expect(utils.isArrayDeepDifferent(arr1, arr3)).toEqual(true);
      expect(utils.isArrayDeepDifferent(arr3, arr4)).toEqual(true);

    });
    it(`returns true or false for an array of shallow objects`, () => {
      const arr1 = [{ a: 1 }, { b: 1 }, { c: 3 }];
      const arr2 = [{ a: 1 }, { b: 1 }, { c: 3 }];
      const arr3 = [{ b: 1 }, { c: 2 }, { d: 3 }, { e: 4 }];

      expect(utils.isArrayDeepDifferent(arr1, arr2)).toEqual(false);
      expect(utils.isArrayDeepDifferent(arr1, arr3)).toEqual(true);

    });

    it(`returns true or false for an array of deep objects`, () => {
      const arr1 = [
        { a: { a: 1 }, value: true },
        { a: { b: 2 }, value: false },
        { a: { c: 3 }, value: false }
      ];
      const arr2 = [
        { a: { a: 1 }, value: true },
        { a: { b: 2 }, value: false },
        { a: { c: 3 }, value: false }
      ];
      const arr3 = [
        { a: { a: 1 }, value: true },
        { a: { b: 2 }, value: false },
        { a: { c: 4 }, value: false }
      ];
      const arr4 = [
        { a: { a: 1 }, value: true },
        { a: { b: 2 }, value: false },
        { a: { c: 4 }, value: false },
        { a: { c: 5 }, value: true }
      ];

      expect(utils.isArrayDeepDifferent(arr1, arr2)).toEqual(false);
      expect(utils.isArrayDeepDifferent(arr1, arr3)).toEqual(true);
      expect(utils.isArrayDeepDifferent(arr3, arr4)).toEqual(true);

    });
  });

  describe(`flatDeep`, () => {
    it(`flattens an array`, () => {
      const arr = [1, [2], [3], [4, [5]]];
      expect(utils.flatDeep(arr)).toEqual([1, 2, 3, 4, 5])
    })
  });
});