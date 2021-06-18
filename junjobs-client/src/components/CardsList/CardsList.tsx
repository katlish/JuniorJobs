import GenericCard from "../Card/GenericCard";
import { ICardsListProps, ItemCard } from "../../types";


const CardsList = ({ items, withAdd, checkedFavourites, addToFavourites, removeFromFavourites }: ICardsListProps) => {
  if (!items?.length) return null;
  return (
    <section className="container">
      <div className="row gy-5">
      {
        items.map((item: ItemCard) => {
              return (
                <div className="col-xl-4 col-lg-6 col-sm-12 mb-4 d-flex justify-content-center" key={item.externalId}>
                  <GenericCard 
                    item={item} 
                    withAdd={withAdd} 
                    isChecked={isChecked(checkedFavourites, item.externalId)}
                    addToFavourites={addToFavourites} 
                    removeFromFavourites={removeFromFavourites}
                  />
                </div>
              )
        })
      }
      </div>
    </section>
  );
};

const isChecked = (jobs: string[], jobid: string) => {
  if (jobs){
    const index = jobs.indexOf(jobid);
    if(index !== -1){
      return true;
    }
  }
  return false;
}

export default CardsList;
