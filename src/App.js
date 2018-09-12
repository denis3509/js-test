import React, {Component} from 'react';

import './App.css';
import TableMain from './components/table/TableMain'
import {api} from "./network/api";
import Input from '@material-ui/core/Input';
import Header from'./components/Header';
import MenuItem from '@material-ui/core/MenuItem';
import  {createStore} from 'redux'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],

      loading: true,
      dataSet: 'little'
    }
  }

  getBigDataSet = () => {
    this.setState({
      loading: true,
    });
    api.getBigData()
      .then((res) => {
        console.log(res.data);
        this.setState({
          dataArray: res.data,
          loading: false,

        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getLittleDataSet = () => {
    this.setState({
      loading: true,
    });
    api.getLittleData()
      .then((res) => {
        console.log(res.data);
        this.setState({
          dataArray: res.data,
          loading: false,
          filteredAndSorted: undefined,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleChangeDataSet = (event) => {
    switch (event.target.value) {
      case ('little') : {
        this.setState({
          dataSet: 'little'
        }, () => this.getLittleDataSet());
        break;
      }
      case ('big') : {
        this.setState({
          dataSet: 'big'
        }, () => this.getBigDataSet());
        break;
      }
    }


  };

  componentDidMount() {
    console.log('App mounted');
    api.getLittleData()
      .then((res) => {
        console.log(res.data);
        this.setState({
          dataArray: res.data,

          loading: false
        })
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    let fieldSet = ['id', 'firstName', 'lastName', 'email', 'phone'];
    return (
      <div className="App">
        <Header/>
        <FormControl>

          <Select
            value={this.state.dataSet}
            onChange={this.handleChangeDataSet}
            input={<Input name="age" id="age-label-placeholder"/>}
            displayEmpty


          >
            <MenuItem value={'little'}>Маленький объем</MenuItem>
            <MenuItem value={'big'}>Большой объем</MenuItem>

          </Select>

        </FormControl>
        <TableMain
          dataArray={this.state.dataArray}

          fieldSet={fieldSet}
          loading={this.state.loading}
        />

      </div>
    );
  }
}

export default App;
