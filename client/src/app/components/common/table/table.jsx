import React from 'react'
import {useSelector} from 'react-redux'
import {getBookings} from '../../../store/booking'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import RoomsList from '../../ui/roomsList'

const Table = ({data, onRemove}) => {
  const columns = {
    roomId: {
      path: 'roomId',
      name: 'Комната'
      //   component: (room) => <RoomsList rooms={room.roomId} />
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
      {data.length > 0 && (
        <table className="table">
          <TableHeader columns={columns} />
          <TableBody {...{columns, data}} />
          {/* <tbody>
            {booking.map((book) => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{`${book.totalPrice}$`}</td>
                <td>{`${book.arrivalDate}-${book.departureDate}`}</td>
                <td>{`adults:${book.adults}  children:${book.children}`}</td> */}

          {/* <td>
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={() => onRemove(book._id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </td> */}
          {/* </tr>
            ))}
          </tbody> */}
        </table>
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
