import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import '../../css/pagination.css'

const Pagination = (props) => {
  const {itemsCount, pageSize, currentPage, onPageChange} = props
  const pageCount = Math.ceil(itemsCount / pageSize)

  if (pageCount === 1 || !pageCount) return null

  const pages = _.range(1, pageCount + 1)

  return (
    <>
      <nav aria-label=" navigation example" className="pager">
        <ul className="pagination pagination-sm  justify-content-center">
          {pages.map((page) => (
            <li
              key={page}
              className={'page-item ' + (currentPage === page ? ' active' : '')}
              aria-current="page_"
            >
              <a className="page-link " onClick={() => onPageChange(page)}>
                {/* {page} */}
                <span className="sr-only"> {page}</span>
              </a>
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
