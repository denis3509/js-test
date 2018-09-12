import * as tableConstants from '../constants/tableConstants'

const initialState = {
  filtered: false,
  chosenRow: undefined,
  pageNumber: 1,
  filterInput: '',
  sortOrder: undefined,
  filteredAndSorted: undefined,
  currentSortField: '',
  dataArray: [],
  loading: true,
};



function table(state = initialState, action) {
  switch (action.type) {
    case (tableConstants.SET_DATA_ARRAY) :
      return Object.assign({}, state, {
        dataArray: action.dataArray,
      });
    case  (tableConstants.CHANGE_SORT_ORDER) :
      return Object.assign({}, state, {
        sortOrder: action.sortOrder
      });
    case (tableConstants.CHANGE_CURRENT_SORT_FIELD) :
      return Object.assign({}, state, {
        sortField: action.currentSortField
      });
    case (tableConstants.CHANGE_FILTERED) :
      return Object.assign({}, state, {
        filtered: !state.filtered,
      });
    case (tableConstants.CHANGE_FILTER_INPUT) :
      return Object.assign({},state,{
        filterInput : action.filterInput,
      });
    case (tableConstants.CHANGE_PAGE_NUMBER) :
      return Object.assign({},state, {
        pageNumber : action.pageNumber,
      });
    case (tableConstants.SET_CHOSEN_ROW) :
      return Object.assign({},state,{
        chosenRow : action.chosenRow,
      });
    case (tableConstants.CHANGE_FILTERED_AND_SORTED) :
      return Object.assign({},state,{
        filteredAndSorted : action.filteredAndSorted
      });
    default :
      return state;
  }
}




export default table;