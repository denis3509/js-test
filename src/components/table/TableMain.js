import React from 'react'
import Table from './Table'
import ChosenRow from './ChosenRow'
import Pagination from './Pagination'
import {api} from '../../network/api'
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {
  setDataArray, changeLoading, changeCurrentSortField,
  changeSortOrder, changeFiltered, changeFilterInput,
  changeFilteredAndSorted, changePageNumber, setChosenRow
} from "../../actions/tableActions";

const mapStateToProps = (state) => {
  return {
    filtered: state.filtered,
    chosenRow: state.chosenRow,
    pageNumber: state.pageNumber,
    filterInput: state.filterInput,
    currentSortField: state.currentSortField,
    sortOrder: state.sortOrder,
    filteredAndSorted: state.filteredAndSorted,
    loading: state.loading,
    dataArray: state.dataArray,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setDataArray: (dataArray) => {
      dispatch(setDataArray(dataArray));
    },
    changeLoading: () => {
      dispatch(changeLoading())
    },
    changeCurrentSortField: (sortField) => {
      dispatch(changeCurrentSortField(sortField))
    },
    changeSortOrder: (sortOrder) => {
      dispatch(changeSortOrder(sortOrder))
    },
    changePageNumber: (pageNumber)=>{
      dispatch(changePageNumber(pageNumber));
    },
    changeFiltered : ()=>{
      dispatch(changeFiltered());
    },
    changeFilterInput: (filterInput) =>{
      dispatch(changeFilterInput(filterInput));
    },
    changeFilteredAndSorted : (filteredAndSorted)=> {
      dispatch(changeFilteredAndSorted(filteredAndSorted));
    },
    setChosenRow : (chosenRow)=>{
      dispatch(setChosenRow(chosenRow))
    },
  }
};


class TableMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    api.getLittleData()
      .then((res) => {
        console.log(res.data);
        this.props.setDataArray(res.data);
        this.props.changeLoading();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {

    if (this.props.dataArray !== prevProps.dataArray) {
      this.setState({
        sortOrder: undefined,
        filteredAndSorted: undefined,
        filtered: false,
        chosenRow: undefined,
        filterInput: '',
      })
    }
  }

  sortByField = (field, order) => {
    let newArr;
    let oldArr;
    let sortOrder;

    if (order === 'UP') sortOrder = '↑';
    else sortOrder = '↓';

    this.props.filtered
      ? oldArr = this.props.filteredAndSorted
      : oldArr = this.props.dataArray;

    switch (order) {
      case 'UP' : {
        newArr = oldArr.slice();
        newArr.sort(function compare(a, b) {
          if (a[field] > b[field]) return 1;
          if (a[field] < b[field]) return -1;
          return 0;
        });
        break;
      }

      case 'DOWN' : {
        newArr = oldArr.slice();
        newArr.sort(function compare(a, b) {
          if (a[field] < b[field]) return 1;
          if (a[field] > b[field]) return -1;
          return 0;
        });
        break;
      }

      default : {
      }

    }
    console.log('newArr', newArr);
    this.setState({
      filteredAndSorted: newArr,
      sortOrder: sortOrder
    });

  };

  handleClickRow = (chosenRow) => {
    this.setState({
      chosenRow
    })
  };

  handleChangeFilterInput = (event) => {
    this.setState({
      filterInput: event.target.value
    })
  };

  handleClickSearch = () => {
    if (this.state.searchInput === '') {
      this.setState({
        filteredAndSorted: undefined,
        filtered: false,
      })

    } else {
      let newArr = this.props.dataArray.filter((item) => {
        let found = false;

        this.props.fieldSet.map((field) => {
          if (String(item[field]).toUpperCase().indexOf(this.state.filterInput.toUpperCase()) > -1)
            found = true;
        });

        return found;
      });
      console.log('filtered arr', newArr);
      this.setState({
        sortOrder: undefined,
        filteredAndSorted: newArr,
        filtered: true,
      })
    }

  };

  handleClickHeaderCell = (sortField) => {
    if (this.props.currentSortField === sortField) {
      if (this.props.sortOrder === '↑') {
        this.sortByField(sortField, 'DOWN');
        this.props.changeCurrentSortField(sortField);
      } else {
        this.sortByField(sortField, 'UP');
        this.props.changeCurrentSortField(sortField);
      }
    } else {

      this.sortByField(sortField, 'UP');
      this.props.changeCurrentSortField(sortField);

    }

  };

  handleChangePageNumber = (pageNumber) => {
   this.props.changePageNumber(pageNumber);
  };


  render() {
    const {chosenRow, pageNumber,currentSortField,
    filterInput,fieldSet,sortOrder,loading,
    dataArray,filteredAndSorted} = this.props;
    let dataArrayShown;
     filteredAndSorted
      ? dataArrayShown =  filteredAndSorted.slice((pageNumber - 1) * 50, pageNumber * 50 - 1)
      : dataArrayShown =  dataArray.slice((pageNumber - 1) * 50, pageNumber * 50 - 1);

    return (
      <div>
        <Input
          value={ filterInput}
          onChange={this.handleChangeFilterInput}
        />
        <Button
          onClick={this.handleClickSearch}
        >
          Найти
        </Button>
        <Table
          handleClickHeaderCell={this.handleClickHeaderCell}
          fieldSet={ fieldSet}
          sortOrder={ sortOrder}
          dataArray={dataArrayShown}
          sortByField={this.sortByField}
          loading={ loading}
          handleClickRow={this.handleClickRow}
          currentSortField={currentSortField}
        />
        <Pagination
          pageNumber={ pageNumber}
          handleChangePageNumber={this.handleChangePageNumber}
          countPages={Math.floor(dataArray.length / 50) + 1}
        />
        {chosenRow && <ChosenRow
          chosenRow={chosenRow}
        />}
        {/*<Controls
          currentPage={this.state.pageNumber}
          onClickPage={this.onClickPage}
        />*/}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableMain)
//export default TableMain