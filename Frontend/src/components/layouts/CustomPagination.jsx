import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
const CustomPagination = ({resultsPerPage, filteredProductsCount}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    useEffect(() => {
        setCurrentPage(page);
    }, [page]);
  return (
    <div>
      {filteredProductsCount > resultsPerPage && 
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={resultsPerPage}
        totalItemsCount={filteredProductsCount}
        onChange={(pageNumber) => setCurrentPage(pageNumber)}
        nextPageText={'Next'}
        prevPageText={'Previous'}
        firstPageText={'First'}
        lastPageText={'Last'}
      />}
    </div>
  )
}

export default CustomPagination
