import React from 'react';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
const Pagination = (props) => {
  const pageArray = [];

  for (let i = 0; i < props.countPages; i++) {
    pageArray[i] = i + 1
  }

  return (
    <Paper>
      {
        (props.pageNumber === 1)
        ? <Button disabled>←</Button>
        : <Button
          onClick={() => props.handleChangePageNumber(props.pageNumber-1)}
        >←</Button>
      }
      {
        pageArray.map((pageNumber) => {

          if (props.pageNumber === pageNumber) {
            return <Button disabled >{pageNumber}</Button>
          } else
            return (
              <Button
                onClick={() => props.handleChangePageNumber(pageNumber)}
              >  {pageNumber}  </Button>)

        })
      }
      {
        (props.pageNumber === props.countPages)
          ? <Button disabled>→</Button>
          : <Button
            onClick={() => props.handleChangePageNumber(props.pageNumber+1)}
          >→</Button>
      }


    </Paper>
  )

};

export default Pagination