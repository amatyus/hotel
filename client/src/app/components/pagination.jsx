import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Pagination = (props) => {
  const {itemsCount, pageSize, currentPage, onPageChange} = props
  const pageCount = Math.ceil(itemsCount / pageSize)

  if (pageCount === 1) return null

  const pages = _.range(1, pageCount + 1)

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {pages.map((page) => (
            <li
              key={page}
              className={'page-item' + (currentPage === page ? ' active' : '')}
              aria-current="page"
            >
              <span className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func
}

export default Pagination
