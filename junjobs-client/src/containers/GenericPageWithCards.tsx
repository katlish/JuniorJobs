import {useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { IGenericPageWithCardsProps, Country } from "../types";
import CardsList from "../components/CardsList/CardsList";
import Pagination from "../components/Pagination/Pagination";
import { PAGINATION_ITEMS_PER_PAGE, PAGINATION_PAGES_PER_BLOCK } from "../store/constants/constants";
import FiltersBar from "../components/FiltersBar/FiltersBar";

const GenericPageWithCards = ({
    visibleItems, 
    isLoading, 
    isRemote, 
    isFavourite, 
    country,
    error,
    userFavourites,
    role,
    toggleIsRemoteAction,
    toggleIsBackendAction,
    toggleIsFrontendAction,
    toggleIsFullstackAction,
    toggleIsFavouriteAction,
    addToFavouritesAction,
    removeFromFavouritesAction,
    setCountryAction,
    remoteLabel,
    selectedItemsLabel,
    isFilterHidden,
    resultsText,
    resultsTextForFavourites,
    cardsWithAddCheckbox
}: IGenericPageWithCardsProps) => {
  const dispatch = useDispatch();

  const onRemoteChange = () => {
    dispatch(toggleIsRemoteAction());
    paginate(1);
  };

  const onBackendChange = () => {
    dispatch(toggleIsBackendAction());
    paginate(1);
  };

  const onFrontendChange = () => {
    dispatch(toggleIsFrontendAction());
    paginate(1);
  };

  const onFullstackChange = () => {
    dispatch(toggleIsFullstackAction());
    paginate(1);
  };

  const onFavouritesChange = () => {
    dispatch(toggleIsFavouriteAction());
    paginate(1);
    
  };


  const addToFavourites = (itemID: string) => {
    dispatch(addToFavouritesAction(itemID, userFavourites));
  }

  const removeFromFavourites = (itemId: string) => {
    dispatch(removeFromFavouritesAction(itemId, userFavourites));
  }

  const onCountryChange = (country: Country | null) => {
    dispatch(setCountryAction(country))
    paginate(1);
  }

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = PAGINATION_ITEMS_PER_PAGE;
  const pagesPerBlock = PAGINATION_PAGES_PER_BLOCK;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsOnPage = visibleItems?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (curPage: number) => setCurrentPage(curPage);

  return (
    <div className="text-white-50">
      <FiltersBar 
        country={country} 
        onCountryChange={onCountryChange} 
        onFavouritesChange={onFavouritesChange}
        isFavourite={isFavourite}
        role={role}
        onRemoteChange={onRemoteChange}
        onBackendChange={onBackendChange}
        onFrontendChange={onFrontendChange}
        onFullstackChange={onFullstackChange}
        isRemote={isRemote}
        remoteLabel={remoteLabel}
        selectedItemsLabel={selectedItemsLabel}
        isFilterHidden={isFilterHidden}
      />

      <div className="my-5">
        <p className="text-center">
          {visibleItems?.length}
          {isFavourite ? ` ${resultsTextForFavourites}` : ` ${resultsText}`} 
          {isLoading && <Spinner as="span" variant="primary" animation="border" />}
        </p>
      </div>

      <CardsList 
        items={currentItemsOnPage} 
        withAdd={cardsWithAddCheckbox} 
        checkedFavourites={userFavourites} 
        addToFavourites={(itemId: string) => addToFavourites(itemId)} 
        removeFromFavourites={(itemId: string) => removeFromFavourites(itemId)}
      />

      {
        visibleItems?.length > 0 &&
          <div className="my-5">
            <Pagination totalItems={visibleItems?.length}
                itemsPerPage={itemsPerPage}
                paginate={paginate}
                currentPage={currentPage}
                pagesPerBlock={pagesPerBlock}
            />
          </div>
      }


      <h3 className="text-center mb-4">{error && `Error: ${error}`}</h3>
    </div>
  );
};

export default GenericPageWithCards;
