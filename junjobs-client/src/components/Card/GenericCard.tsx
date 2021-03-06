import React, { useState } from "react";
import { Card, Modal} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Map from "../Map/Map";
import LazyImage from "../LazyImage/LazyImage";
import classes from "./MyCard.module.css";
import { IGenericCardProps, ItemCard } from "../../types";
import placeholder from "../../imgs/placeholder2.gif";


const GenericCard = ({ item, withAdd, isChecked, addToFavourites, removeFromFavourites }: IGenericCardProps) => {
  const [showModal, setShowModal] = useState<ItemCard | null>(null);
  const [isAdded, setIsAdded] = useState(isChecked);

  const renderTooltip = (title: string) => <Tooltip id={title}>{title}</Tooltip>;

  const addItem = () => {
    setIsAdded(!isAdded);
    (!isAdded) ? addToFavourites(item.externalId) : removeFromFavourites(item.externalId);
  }

  const fromatDate = (date: string): string => new Date(date).toDateString().toString();

  const onMoreInfoClick = (e: any) => {
    e.preventDefault();
    setShowModal(item);
  }

  return (
    <>
    <div key={item.externalId} className="card bg-dark shadow-3-strong" style={{width: "22rem"}}>
        <div className="card-header p-3 d-flex justify-content-between">
          <div className="rounded p-1 bg-light ms-auto" style={{width: "5rem", height: "5rem"}}>
            <LazyImage
                  className="card-img rounded" 
                  style={{width: "100%", height: "100%", objectFit: "contain"}}
                  errorImg="https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
                  placeholderImg={placeholder}
                  src={item.logo}
              />
          </div>
            
          {/* <img src={item.logo}
                className="card-img rounded p-1 bg-light ms-auto" 
                style={{width: "5rem", height: "5rem", objectFit: "contain"}}
                alt="logo"
          /> */}
          {withAdd && (<div className="ms-auto">
                            <input 
                              type="checkbox" 
                              id={item.externalId} 
                              name="Add" 
                              onChange={addItem} 
                              checked={isChecked}
                            />
                        </div>)
          }  
        </div>
        <div className="card-body text-light text-center ">
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip(item.title)}
            >  
                <h5 className={`${classes.Title} card-title`}>{item.title}</h5>
            </OverlayTrigger>
            <h6 className="card-subtitle mb-2 text-muted">{item.subtitle}</h6>
            <ul className="list-group list-group-flush ">
                <li className="list-group-item bg-dark text-white">{item.location}</li>
                <li className="list-group-item bg-dark text-white">{fromatDate(item.createdAt)}</li>
            </ul>
            <div className="d-flex flex-wrap mt-3">
              {item.tags.map((tag: String, i) => 
                <h5 key={i}><span className="badge bg-black mx-2">{tag}</span></h5>
              )}
            </div>
        </div>
        <div className="card-footer text-muted text-center mb-4">
          <div className="btn btn-secondary" onClick={onMoreInfoClick}>More info</div>
        </div>
      </div>

      <Modal
        show={Boolean(showModal)}
        centered
        onHide={() => setShowModal(null)}>

        <Modal.Header closeButton>
            <Modal.Title className={classes.CardTitle}>
                {item.title}
            </Modal.Title>
        </Modal.Header>

        <div className={classes.CardMapContainer}>
          <Map address={item.location}/>
          <Card.Img className={classes.CardLogoRound} src={item.logo} />
        </div>
        
        {/* TODO: parser for dangerouslySetInnerHTML */}
        <Card.Body>
          <div dangerouslySetInnerHTML={{__html: item.description}} />
        </Card.Body>

        <Modal.Footer>
          <a className="btn btn-secondary btn-lg" href={item?.url} target="_blank" rel="noreferrer">
            CONTACT INFO
          </a>
        </Modal.Footer>

    </Modal>
    </>
  );
};

export default GenericCard;
