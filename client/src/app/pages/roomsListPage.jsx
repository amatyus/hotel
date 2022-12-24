import React, {useState, useEffect} from 'react'
import Pagination from '../components/pagination'
import RoomsPage from './roomsPage'
import Loader from '../components/common/form/loader'
import FilterFullRooms from '../components/ui/filterFullRooms'
import queryString from 'query-string'
import {useRooms} from '../hooks/useRooms'
import {useLocation} from 'react-router-dom'
import _ from 'lodash'

const oneDay = 86000000

const getInitForm = (query) => {
  const {start, end, adults, children, category} = query

  return {
    start: start ? new Date(Number(query.start)) : new Date(Date.now()),
    end: end ? new Date(Number(query.end)) : new Date(Date.now() + oneDay),
    adults: adults ? Number(query.adults) : 2,
    children: children ? Number(query.children) : 0,
    category: category || '',
    rate: 'asc'
  }
}

const pageSize = 2

const RoomsListPage = () => {
  const {rooms, fetchRooms, isLoading, count} = useRooms()
  const {search} = useLocation()
  const query = queryString.parse(search)
  const initFormData = getInitForm(query)
  console.log(rooms)

  const [currentFilters, setCurrentFilters] = useState(initFormData)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchRoomsByFilter = (currentFilters, currentPage) => {
    const queryParams = {
      ...currentFilters,
      category: currentFilters.category === '' ? null : currentFilters.category,
      start: currentFilters.start.setHours(0, 0, 0, 0),
      end: currentFilters.end.setHours(23, 59, 59, 999),
      page: currentPage,
      limit: pageSize
    }

    fetchRooms(queryParams)
  }

  useEffect(() => {
    fetchRoomsByFilter(currentFilters, 1)
  }, [])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
    fetchRoomsByFilter(currentFilters, pageIndex)
  }

  const onSubmit = (filters) => {
    setCurrentFilters(filters)
    setCurrentPage(1)

    fetchRoomsByFilter(filters, 1)
  }

  return (
    <>
      <FilterFullRooms initFormData={initFormData} onSubmit={onSubmit} />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 mx-5 px-5 my-4  ">
            {rooms?.map((room) => (
              <RoomsPage key={room._id} {...room} />
            ))}
          </div>
          <div className="row">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  )
}

export default RoomsListPage
