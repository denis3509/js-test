import * as tableConstants from '../constants/tableConstants'

export const setDataArray = (dataArray) =>{
  return {
    type :tableConstants.SET_DATA_ARRAY,
    dataArray,
  }
};

export const changeSortOrder = (sortOrder) => {
  return {
    type : tableConstants.CHANGE_SORT_ORDER,
    sortOrder
  }
};

export const changeCurrentSortField = (currentSortField) =>{
  return {
    type: tableConstants.CHANGE_CURRENT_SORT_FIELD,
    currentSortField
  }
};

export const changeFiltered= () =>{
  return {
    type: tableConstants.CHANGE_FILTERED,
  }
};

export const changeFilterInput =(filterInput) =>{
  return {
     type: tableConstants.CHANGE_FILTER_INPUT,
      filterInput
  }
};

export const changePageNumber =(pageNumber)=>{
  return {
    type : tableConstants.CHANGE_PAGE_NUMBER,
    pageNumber,
  }
};

export const setChosenRow = (chosenRow) => {
  return {
    type: tableConstants.SET_CHOSEN_ROW,
    chosenRow
  }
};

export const changeFilteredAndSorted =(filteredAndSorted)=>{
  return {
    type : tableConstants.CHANGE_FILTERED_AND_SORTED,
    filteredAndSorted
  }
};