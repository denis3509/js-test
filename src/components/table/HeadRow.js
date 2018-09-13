import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types'

const HeadRow = (props)=> {

  const {fieldSet,handleClickHeaderCell,currentSortField,sortOrder} = props;
  return (

      <TableRow>
        {fieldSet.map((field) => {
          return <TableCell key={field}
                            onClick={() => handleClickHeaderCell(field)}
          >{field} {( currentSortField === field) && <span>{sortOrder}</span>} </TableCell>

        })}

      </TableRow>

  )
};

HeadRow.propTypes = {
  fieldSet : PropTypes.array.isRequired,
  handleClickHeaderCell : PropTypes.func.isRequired,
  currentSortField : PropTypes.string.isRequired,
  sortOrder : PropTypes.string
};

export default HeadRow