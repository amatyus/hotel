import React, {useState, useEffect, useMemo} from 'react'
import {useLocation} from 'react-router-dom'
import {paginate} from '../utils/paginate'
import Pagination from '../components/pagination'
import RoomsPage from './roomsPage'
import Loader from '../components/common/form/loader'
import {useRooms} from '../hooks/useRooms'
import GroupList from '../components/ui/groupList'
import Button from '../components/common/button'
import _ from 'lodash'
import FilterFullRooms from '../components/ui/filterFullRooms'
import {useSelector} from 'react-redux'
import {getCategory} from '../store/category'
import queryString from 'query-string'

const oneDay = 86000000

const getInitForm = (query) => {
  const {start, end, adult, children} = query

  return {
    start: start ? new Date(Number(query.start)) : new Date(Date.now()),
    end: end ? new Date(Number(query.end)) : new Date(Date.now() + oneDay),
    adult: adult ? Number(query.adult) : 2,
    children: children ? Number(query.children) : 0,
    category: null,
    rate: 'asc'
  }
}

const pageSize = 2

const RoomsListPage = () => {
  const {rooms, getRooms, isLoading, count} = useRooms()
  const {search} = useLocation()
  const query = queryString.parse(search)
  const initFormData = getInitForm(query)

  const [currentFilters, setCurrentFilters] = useState(initFormData)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchRoomsByFilter = () => {
    const queryParams = {
      ...currentFilters,
      start: currentFilters.start.setHours(0, 0, 0, 0),
      end: currentFilters.end.setHours(23, 59, 59, 999),
      page: currentPage,
      limit: pageSize
    }

    getRooms(queryParams)
  }

  useEffect(() => {
    fetchRoomsByFilter()
  }, [])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
    fetchRoomsByFilter()
  }

  const onSubmit = (filters) => {
    setCurrentFilters(filters)
    setCurrentPage(1)

    fetchRoomsByFilter()
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
