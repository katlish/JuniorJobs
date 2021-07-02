import { Pagination } from "react-bootstrap";
import { whichBlockPages } from "./utils/utilsPagination";
import { IPaginationProps } from "../../types";
import "./Pagination.css";

const PaginationWrapper = ({totalItems,
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
            <Pagination.Item key={i} onClick={(e) => onPaginate(e, i)} active={i === currentPage}>
                {i}
            </Pagination.Item>,
        );
    }

    console.log({currentPage});

    const onPaginate = (e: any, page: number) => {
        e.preventDefault();
        paginate(page);
        window.scrollTo(0, 0);
    }

    return (
            <Pagination className="d-flex flex-row justify-content-center">
                {currentPage>pagesPerBlock && <Pagination.First onClick={(e) => onPaginate(e, 1)}/>} 
                {currentPage>pagesPerBlock && <Pagination.Prev onClick={(e) => onPaginate(e, currentBlock.firstPage-1)}/>}
                {pages}
                {currentBlock.lastPage<totPages && <Pagination.Next onClick={(e) => onPaginate(e, currentBlock.lastPage+1)}/>}
                {currentBlock.lastPage<totPages && <Pagination.Last onClick={(e) => onPaginate(e, totPages)}/>}
            </Pagination>
    );
}
export default PaginationWrapper;