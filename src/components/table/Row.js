import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types'

const Row = (props)=>{
  return (
    <TableRow
              onClick={() => props.handleClickRow(props.item)}
    >
      {
        props.fieldSet.map((field) => {
          return <TableCell component="th" scope="row">
            {props.item[field]}
          </TableCell>
        })
      }

    </TableRow>
  )
};

Row.propTypes = {
  handleClickRow : PropTypes.func.isRequired,
  fieldSet : PropTypes.array.isRequired,
  item : PropTypes.object.isRequired,
};


export default Row