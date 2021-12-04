import React from 'react';
import pagination from '../../utils/pagination';

const Pagination = ({pageSize, currentPage, itemsCount, onPageChange}) => {

   
    const pageNumbers = pagination.getPages(pageSize, itemsCount);

    const isActive = pageNumber => pageNumber === currentPage ? 'active' : '';

    return <nav aria-label="Page navigation">
    <ul className="pagination justify-content-center">
      {pageNumbers.map(pageNumber => <li onClick={()=> onPageChange(pageNumber)} key={pageNumber} style={{cursor: "pointer"}} className={`page-item ${isActive(pageNumber)}`}><a className="page-link">{pageNumber}</a></li>)}
    </ul>
  </nav>
}
 
export default Pagination;