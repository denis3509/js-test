import React from 'react'
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'


const ChosenRow = (props) => {
  const {firstName, lastName, description, address} = props.chosenRow;

  return (
    <Paper style={{padding: 5}}>
      <Typography component="p">
        Выбран пользователь <b>{firstName + ' ' + ' ' + lastName}</b>
      </Typography>
      <Typography component="p">Описание:
        {description}
      </Typography>
      <Typography component="p">Адрес проживания: <b> {address.streetAddress}</b> </Typography>
      <Typography component="p">Город: <b>{address.city}</b></Typography>
      <Typography component="p">Провинция/штат: <b>{address.state}</b></Typography>
      <Typography component="p">Индекс: <b>{address.zip}</b></Typography>
    </Paper>
  )
};
ChosenRow.propTypes = {
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  description: PropTypes.string,
  address: PropTypes.object,

};

ChosenRow.defaultProps = {
  name: '',
  description: '',
  address: '',
  city: '',
  state: '',
  index: '',
};

export default ChosenRow;