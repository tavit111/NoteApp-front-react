import React from 'react';
import _ from 'lodash';
import pagination from '../../utils/pagination';

const Pagination = ({pageSize, currentPage, itemsCount, onPageChange}) => {

    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pageNumbers = _.range(1, pageCount + 1);

    const isActive = pageNumber => pageNumber === currentPage ? 'active' : '';

    return <nav aria-label="Page navigation">
    <ul className="pagination justify-content-center">
      {pageNumbers.map(pageNumber => <li onClick={()=> onPageChange(pageNumber)} key={pageNumber} style={{cursor: "pointer"}} className={`page-item ${isActive(pageNumber)}`}><a className="page-link">{pageNumber}</a></li>)}
    </ul>
  </nav>
}
 
export default Pagination;