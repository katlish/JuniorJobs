import { Pagination } from "react-bootstrap";
import { whichBlockPages } from "./utils/utilsPagination";
import { IPaginationProps } from "../../types";
import "./Pagination.css";

const Paginaion = ({totalItems,
        itemsPerPage,
        paginate,
        currentPage,
        pagesPerBlock
}: IPaginationProps) => {
    const pages = [];
    const totPages = Math.ceil(totalItems/itemsPerPage);
    const totBlocks = Math.ceil(totPages/pagesPerBlock);
    const currentBlock = whichBlockPages(currentPage, totBlocks, pagesPerBlock, totPages)
    
    for (let i=currentBlock.firstPage; i<= currentBlock.lastPage; i++){
        pages.push(
            <Pagination.Item key={i} onClick={() => paginate(i)} active={i === currentPage}>
                {i}
            </Pagination.Item>,
        );
    }

    console.log({currentPage});
    return (
            <Pagination className="d-flex flex-row justify-content-center">
                {currentPage>pagesPerBlock && <Pagination.First onClick={() => paginate(1)}/>} 
                {currentPage>pagesPerBlock && <Pagination.Prev onClick={() => paginate(currentBlock.firstPage-1)}/>}
                {pages}
                {currentBlock.lastPage<totPages && <Pagination.Next onClick={() => paginate(currentBlock.lastPage+1)}/>}
                {currentBlock.lastPage<totPages && <Pagination.Last onClick={() => paginate(totPages)}/>}
            </Pagination>
    );
}
export default Paginaion;