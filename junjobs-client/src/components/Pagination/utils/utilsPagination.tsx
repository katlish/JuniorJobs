export const whichBlockPages = (currentPage: number, totBlocks: number, pagesPerBlock: number, veryLastPage: number) => {
    for (let block = 1; block <= totBlocks; block++){
        let lastPage = block * pagesPerBlock;
        let firstPage = lastPage - pagesPerBlock + 1;
        if (currentPage <= lastPage && currentPage >= firstPage){
            return {
                block,
                firstPage,
                lastPage: (lastPage>veryLastPage) ? veryLastPage : lastPage
            }
        }
    }
    return {
        block: 0,
        firstPage: 0,
        lastPage: 0
    }
}