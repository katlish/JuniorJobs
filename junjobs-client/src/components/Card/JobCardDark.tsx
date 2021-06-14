import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Modal} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Map from "../Map/Map";
import classes from "./MyCard.module.css";
import { IJobProps, Job } from "../../types";

const JobCardDark = ({ job, withAdd, isChecked, addJob, removeJob }: IJobProps) => {
  const [showModal, setShowModal] = useState<Job | null>(null);
  const [isAdded, setIsAdded] = useState(isChecked);

  const renderTooltip = (title: string) => <Tooltip id={title}>{title}</Tooltip>;

  const addItem = () => {
    setIsAdded(!isAdded);
    (!isAdded) ? addJob(job.externalId) : removeJob(job.externalId);
  }

  return (
    <>
    <div key={job.externalId} className="card bg-dark shadow-3-strong" style={{width: "22rem"}}>
        <div className="card-header p-3 d-flex justify-content-between">
          <img src={job.company_logo}
                className="card-img rounded p-1 bg-light ms-auto" 
                style={{width: "5rem", height: "5rem", objectFit: "contain"}}
                alt="logo"
          />
          {withAdd && (<div className="ms-auto">
                            <input 
                              type="checkbox" 
                              id={job.externalId} 
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
                overlay={renderTooltip(job.title)}
            >  
                <h5 className={`${classes.Title} card-title`}>{job.title}</h5>
            </OverlayTrigger>
            <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
            <ul className="list-group list-group-flush ">
                <li className="list-group-item bg-dark text-white">{job.location}</li>
                <li className="list-group-item bg-dark text-white">{job.createdAt}</li>
            </ul>
        </div>
        <div className="card-footer text-muted text-center mb-4">
          <a href="#" className="btn btn-secondary" onClick={() => setShowModal(job)}>More info</a>
        </div>
      </div>

      <Modal
        show={Boolean(showModal)}
        centered
        onHide={() => setShowModal(null)}
        >
				<Modal.Header closeButton>
					<Modal.Title className={classes.CardTitle}>
						{job.title}
					</Modal.Title>
				</Modal.Header>

        <div className={classes.CardMapContainer}>
          <Map address={job.location}/>
          <Card.Img className={classes.CardLogoRound} src={job.company_logo} />
        </div>
        
        {/* TODO: parser for dangerouslySetInnerHTML */}
        <Card.Body>
          <div dangerouslySetInnerHTML={{__html: job.description}} />
        </Card.Body>

        <Modal.Footer>
          <a className="btn btn-secondary btn-lg" href={job?.url} target="_blank">
            CONTACT INFO
          </a>
				</Modal.Footer>

			</Modal>
    </>
  );
};

export default JobCardDark;
