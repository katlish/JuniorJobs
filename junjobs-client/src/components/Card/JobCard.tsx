import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import classes from "./MyCard.module.css";
import { IJobProps, Job } from "../../types";

const JobCard = ({ job }: IJobProps) => {
  const [showModal, setShowModal] = useState<Job | null>(null);

  const renderTooltip = (props: any) => <Tooltip {...props}>{props}</Tooltip>;

  return (
    <>
      <Card className={`${classes.Mycard} d-flex m-3 text-left shadow-sm`}>
        <Card.Header className="d-flex align-items-center">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(job.title)}
          >
            <Card.Title className={`${classes.Title} text-info mb-0`}>{job.title}</Card.Title>
          </OverlayTrigger>
        </Card.Header>
        <Card.Img className={`${classes.Image} my-2`} src={job.company_logo} />
        <Card.Body>
          <Card.Subtitle className="mb-2">{job.company}</Card.Subtitle>
          <Card.Subtitle className="mb-2">{job.location}</Card.Subtitle>
          <Card.Subtitle className="mb-2">{job.created_at.split(' ').slice(0,3).join(' ')}</Card.Subtitle>
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
        <Card.Img className={`${classes.Image} my-2`} src={job.company_logo} />
				<Card.Body>
          <div dangerouslySetInnerHTML={{__html: job.description}} 
            />
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
