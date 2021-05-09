import React, { useState } from "react";
import { Card, Button, Modal} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Map from "../Map/Map";
import classes from "./MyCard.module.css";
import { IJobProps, Job } from "../../types";

const JobCard = ({ job, withAdd, isChecked, addJob, removeJob }: IJobProps) => {
  const [showModal, setShowModal] = useState<Job | null>(null);
  const [isAdded, setIsAdded] = useState(isChecked);

  const renderTooltip = (props: any) => <Tooltip {...props}>{props}</Tooltip>;

  const addItem = () => {
    setIsAdded(!isAdded);
    (!isAdded) ? addJob(job.externalId) : removeJob(job.externalId);
  }

  return (
    <>
      <Card  className={`${classes.Mycard} d-flex m-3 text-left shadow-sm`}>
        <Card.Header className="d-flex align-items-center">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(job.title)}
          >
            <Card.Title className={`${classes.Title} text-info mb-0`}>{job.title}</Card.Title>
          </OverlayTrigger>
          {withAdd && (<div className="ml-auto">
                        <input type="checkbox" id={job.externalId} name="Add" onChange={addItem}/>
                      </div>)
          }
          
        </Card.Header>
        <p className={classes.SubTitle}>{job.company}</p>
        <Card.Img className={`${classes.Image} my-2`} src={job.company_logo} />
        <Card.Body>
          <Card.Subtitle className={`${classes.BodyText} mb-2`}>{job.location}</Card.Subtitle>
          <Card.Subtitle className={`${classes.BodyText} mb-2`}>{job.createdAt}</Card.Subtitle>
        </Card.Body>
        <Button className="align-self-end m-2" variant="info" onClick={() => setShowModal(job)}>
          MORE INFO
        </Button>
      </Card>

      <Modal
				show={Boolean(showModal)}
				centered
				onHide={() => setShowModal(null)}
			>
				<Modal.Header>
					<Modal.Title>
						{job.title}
					</Modal.Title>
				</Modal.Header>

        <div className={classes.CardMapContainer}>
          <Map address={job.location}/>
          <Card.Img className={classes.CardLogoRound} src={job.company_logo} />
        </div>

        <Card.Body>
          {job.description}
        </Card.Body>

        <Modal.Footer>
          <Button as="a" bsPrefix="unset" disabled={!job.url} href={job?.url} target="_blank">
            CONTACT INFO
					</Button>
				</Modal.Footer>

			</Modal>
    </>
  );
};

export default JobCard;
