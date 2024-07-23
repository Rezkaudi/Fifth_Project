import './Pagination.css'

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    return (
        <div className="pagination">
            <nav className="paginationButtons">
                <button className={currentPage === 1 ? 'noneCursor' : ''} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button>{currentPage}</button>
                <button className={currentPage === totalPages ? 'noneCursor' : ''} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </nav>
        </div>
    )
}

export default Pagination