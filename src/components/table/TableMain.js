import React from 'react'
import Table from './Table'
import ChosenRow from './ChosenRow'
import Pagination from './Pagination'
import {api} from '../../network/api'
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class TableMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      filtered: false,
      chosenRow: undefined,
      pageNumber: 1,
      filterInput: '',
      sortOrder: undefined,
      filteredAndSorted: undefined,
    }
  }

  componentDidUpdate(prevProps) {

    if (this.props.dataArray !== prevProps.dataArray) {
      this.setState({
        sortOrder: undefined,
        filteredAndSorted: undefined,
        filtered: false,
        chosenRow: undefined,
      })
    }
  }


  sortByField = (field, order) => {
    let newArr;
    let oldArr;
    let sortOrder;

    if (order === 'UP') sortOrder = '↑';
    else sortOrder = '↓';

    this.state.filtered
      ? oldArr = this.state.filteredAndSorted
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
    this.setState ({
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

  handleChangePageNumber = (pageNumber) => {
    this.setState({pageNumber})
  };


  render() {
    const {chosenRow, pageNumber} = this.state;
    let dataArrayShown;
    this.state.filteredAndSorted
      ? dataArrayShown = this.state.filteredAndSorted.slice((pageNumber - 1) * 50, pageNumber * 50 - 1)
      : dataArrayShown = this.props.dataArray.slice((pageNumber - 1) * 50, pageNumber * 50 - 1);

    return (
      <div>
        <Input
          value={this.state.filterInput}
          onChange={this.handleChangeFilterInput}
        />
        <Button
          onClick={this.handleClickSearch}
        >
          Найти
        </Button>
        <Table
          fieldSet={this.props.fieldSet}
          sortOrder={this.state.sortOrder}
          dataArray={dataArrayShown}
          sortByField={this.sortByField}
          loading={this.props.loading}
          handleClickRow={this.handleClickRow}
        />
        <Pagination
          pageNumber={this.state.pageNumber}
          handleChangePageNumber={this.handleChangePageNumber}
          countPages={Math.floor(this.props.dataArray.length/50)+1}
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

export default TableMain