import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Row from './Row'
import HeadRow from './HeadRow'



const TableData = (props)=> {

    const {dataArray,fieldSet,sortOrder,
      handleClickHeaderCell,currentSortField,loading,handleClickRow} =  props;
    return (
      <Paper style={{minHeight: 30}}>
        <Table>
          <TableHead>
            <HeadRow
              currentSortField={currentSortField}
              sortOrder={sortOrder}
              handleClickHeaderCell={handleClickHeaderCell}
              fieldSet={fieldSet}
            />
          </TableHead>
          <TableBody>
            {loading
              ? <div>загрузка...</div>
              : dataArray.map((item, index) => {
                  return (
                    <Row key={index + 'tableRow'}
                         handleClickRow={handleClickRow}
                         fieldSet={fieldSet}
                         item={item}
                    />
                  )

                }
              )
            }
          </TableBody>

        </Table>
      </Paper>
    )
  };


Table.propsType={
  currentSortField: PropTypes.string.isRequired,
  filedSet : PropTypes.array.isRequired,
  dataArray : PropTypes.array.isRequired,
  loading : PropTypes.bool.isRequired,
  sortOrder : PropTypes.string,
  handleClickRow : PropTypes.func.isRequired,
  handleClickHeaderCell : PropTypes.func.isRequired,
};


export default TableData