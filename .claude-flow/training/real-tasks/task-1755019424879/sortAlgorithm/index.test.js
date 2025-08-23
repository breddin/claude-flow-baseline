
const { quickSort, mergeSort } = require('./index');

describe('Sorting Algorithms', () => {
  const unsorted = [3, 1, 4, 1, 5, 9, 2, 6];
  const sorted = [1, 1, 2, 3, 4, 5, 6, 9];
  
  test('quickSort sorts correctly', () => {
    expect(quickSort(unsorted)).toEqual(sorted);
  });
  
  test('mergeSort sorts correctly', () => {
    expect(mergeSort(unsorted)).toEqual(sorted);
  });
  
  test('handles empty arrays', () => {
    expect(quickSort([])).toEqual([]);
    expect(mergeSort([])).toEqual([]);
  });
});
