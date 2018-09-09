import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSortField: '',

    }
  }

  handleClickHeaderCell = (sortField) => {
    if (this.state.currentSortField === sortField) {
      if (this.props.sortOrder === '↑') {
        this.props.sortByField(sortField, 'DOWN');
        this.setState({
          currentSortField: sortField,

        });
      } else {
        this.props.sortByField(sortField, 'UP');
        this.setState({
          currentSortField: sortField,

        });
      }
    } else {

      this.props.sortByField(sortField, 'UP');
      this.setState({
        currentSortField: sortField,

      });

    }

  };

  render() {
    const {dataArray} = this.props;
    return (
      <Paper style={{minHeight: 30}}>
        <Table>
          <TableHead>
            <TableRow>
              {this.props.fieldSet.map((field) => {
                return <TableCell key={field}
                                  onClick={() => this.handleClickHeaderCell(field)}
                >{field} {(this.state.currentSortField === field) && <span>{this.props.sortOrder}</span>} </TableCell>

              })}

            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.loading
              ? <div>загрузка...</div>
              : dataArray.map((item, index) => {
                  return (
                    <TableRow key={index + 'tableRow'}
                              onClick={()=> this.props.handleClickRow(item)}
                    >
                      {
                        this.props.fieldSet.map((field) => {
                          return <TableCell component="th" scope="row">
                            {item[field]}
                          </TableCell>
                        })
                      }

                    </TableRow>
                  )

                }
              )
            }
          </TableBody>

        </Table>
      </Paper>
    )
  }
};

export default TableData