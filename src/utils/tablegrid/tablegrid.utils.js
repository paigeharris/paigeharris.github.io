import { isArrayDeepDifferent } from '..';

export const shouldTableGridReload = (currentRecords, previousRecords, records_per_page = 100, currentPage = 0, prevOnFirstRecord = false) => {

  const recordsHaveChanged = isArrayDeepDifferent(currentRecords, previousRecords);


  const update = recordsHaveChanged;

  if (currentRecords && records_per_page && update) {

    const addedOneRecord = currentRecords.length === previousRecords.length + 1;
    const onFirstRecord = currentRecords.length === 1;

    if (addedOneRecord) {
      if ((onFirstRecord && !prevOnFirstRecord)) {
        return { shouldReload: false, shouldLoad: true, onFirstRecord: true };
      } else {
        return { shouldReload: true, shouldLoad: false, onFirstRecord: false };
      }

    } else {
      return { shouldReload: false, shouldLoad: true, onFirstRecord: false };
    }
  }

  return { shouldReload: false, shouldLoad: false, onFirstRecord: prevOnFirstRecord };
};

export const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getSorting = (order, orderBy) => {
  const isAsc = order === 0;
  return isAsc ? (a, b) => -desc(a, b, orderBy) : (a, b) => desc(a, b, orderBy);
};

export const stableSort = (array, cmp) => {
  if (!array || !cmp) return [];
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

export const sortRecords = (records, sort_order, sort_field) => {
  return stableSort(records, getSorting(sort_order, sort_field));
};

export const markDeleted = (records, deletedRecordIds) => {
  if (!records) return [];
  if (!deletedRecordIds) return records; //nothing to iterate through
  let markedDeletedRecords = records.map(record => {
    if (deletedRecordIds.some(id => id === record.id)) {
      let deletedRecord = { ...record, deleted: true };
      return deletedRecord;
    } else {
      return record;
    }
  });
  return markedDeletedRecords;
};
