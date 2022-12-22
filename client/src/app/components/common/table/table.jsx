import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({data, onRemove}) => {
  const columns = {
    roomId: {
      path: 'roomId.title',
      name: 'Комната'
    },
    totalPrice: {
      path: 'totalPrice',
      name: 'Цена'
    },
    arrivalDate: {
      path: 'arrivalDate',
      name: 'Заезд'
    },
    departureDate: {
      path: 'departureDate',
      name: 'Отъезда'
    },
    adults: {
      path: 'adults',
      name: 'Взрослые'
    },
    children: {
      path: 'children',
      name: 'Дети'
    },
    delete: {
      component: (room) => (
        <button onClick={() => onRemove(room._id)} className="btn btn-danger">
          delete
        </button>
      )
    }
  }
  return (
    <>
      {data.length > 0 ? (
        <table className="table">
          <TableHeader columns={columns} />
          <TableBody {...{columns, data}} />
        </table>
      ) : (
        <h3 className="text-dark">
          Похоже, у вас пока нет забронированных номеров...
        </h3>
      )}
    </>
  )
}
Table.propTypes = {
  booking: PropTypes.array,
  columns: PropTypes.object,
  data: PropTypes.array,
  onRemove: PropTypes.func
}

export default Table
