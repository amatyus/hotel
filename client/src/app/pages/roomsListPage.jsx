import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {paginate} from '../utils/paginate'
import Pagination from '../components/pagination'
import RoomsPage from './roomsPage'
import Loader from '../components/common/form/loader'
import {useRooms} from '../hooks/useRooms'
import GroupList from '../components/ui/groupList'
import Button from '../components/common/button'
import _ from 'lodash'
import DataForm from '../components/ui/dataForm'
import {useSelector} from 'react-redux'
import {getCategory} from '../store/category'

const RoomsListPage = () => {
  const {rooms} = useRooms()
  const {start: startQuery, end: endQuery, count: countQuery} = useParams()
  const category = useSelector(getCategory())
  const [selectedCategory, setSelectedCategory] = useState()
  const [sortBy, setSortBy] = useState({path: 'rating', order: 'desc'})
  //   console.log(sortBy)

  const pageSize = 6

  useEffect(() => {
    // request to back
    // console.log(startQuery, endQuery, countQuery)
  }, [startQuery, endQuery, countQuery])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleCategorySelect = (item) => {
    setSelectedCategory(item)
  }
  const filteredRooms = selectedCategory
    ? rooms.filter((room) => room.category === selectedCategory.id)
    : rooms

  const count = filteredRooms.length

  const sortedRooms = _.orderBy(filteredRooms, [sortBy.path], [sortBy.order])

  const pageRooms = paginate(sortedRooms, currentPage, pageSize)

  const handleSort = (item) => {
    setSortBy((prevState) => ({
      ...prevState,
      order: prevState.order === 'asc' ? 'desc' : 'asc'
    }))
  }

  const clearFilter = () => {
    setSelectedCategory()
  }
  const rendeSortArrow = (sortBy, currentPath) => {
    if (sortBy.order === 'asc') {
      return <i className="bi bi-caret-down-fill"></i>
    } else {
      return <i className="bi bi-caret-up-fill"></i>
    }
  }

  if (pageRooms.length) {
    return (
      <>
        <div className="row align-items-center mx-5 px-5 mt-5">
          <div className="col-2">
            {category && (
              <>
                <div className="d-inline-flex flex-column ">
                  <GroupList
                    onItemSelect={handleCategorySelect}
                    selectedItem={selectedCategory}
                  />

                  <Button
                    text="Очистить"
                    type="button"
                    onClick={clearFilter}
                    className={'mt-1'}
                  />
                </div>
              </>
            )}
          </div>
          <div className="col-1">
            <h5
              className="d-inline card-rating m-1"
              onClick={() => handleSort('rate')}
            >
              Rate
            </h5>
            {rendeSortArrow(sortBy, 'rate')}
          </div>
          <div className="col-6 px-4">
            <DataForm />
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 mx-5 px-5 my-4  ">
          {pageRooms &&
            pageRooms.map((room) => <RoomsPage key={room.id} {...room} />)}
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
    )
  }
  return <Loader />
}

export default RoomsListPage
