import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Map from "../Map/Map";
import classes from "./MyCard.module.css";
import { ICandidateProps, Candidate } from "../../types";


//TODO: add img
const CandidateCard = ({ candidate }: ICandidateProps) => {
  const [showModal, setShowModal] = useState<Candidate | null>(null);

  const renderTooltip = (props: any) => <Tooltip {...props}>{props}</Tooltip>;

  return (
    <>
      <Card className={`${classes.Mycard} d-flex m-3 text-left shadow-sm`}>
        <Card.Header className="d-flex align-items-center">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(candidate.name)}
          >
            <Card.Title className={`${classes.Title} text-info mb-0`}>{candidate.name}</Card.Title>
          </OverlayTrigger>
        </Card.Header>
        <p className={classes.SubTitle}>{candidate.jobs}</p>
        {/* <Card.Img className={`${classes.Image} my-2`} src={candidate.company_logo} /> */}
        <Card.Body>
          <Card.Subtitle className={`${classes.BodyText} mb-2`}>{candidate.yearsOfExperience}</Card.Subtitle>
          <Card.Subtitle className={`${classes.BodyText} mb-2`}>{candidate.location}</Card.Subtitle>
          <Card.Subtitle className={`${classes.BodyText} mb-2`}>{candidate.created_at.split(' ').slice(0,3).join(' ')}</Card.Subtitle>
        </Card.Body>
        <Button className="align-self-end m-2" variant="info" onClick={() => setShowModal(candidate)}>
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
						{candidate.name}
					</Modal.Title>
				</Modal.Header>

        <div className={classes.CardMapContainer}>
          <Map address={candidate.location}/>
        </div>

        <Card.Body>
            <Card.Subtitle className={`${classes.BodyText} mb-2`}>{candidate.description}</Card.Subtitle>
        </Card.Body>

        <Modal.Footer>
          <Button as="a" bsPrefix="unset" disabled={!candidate.url} href={candidate?.url} target="_blank">
            CONTACT INFO
            </Button>
        </Modal.Footer>

    </Modal>
    </>
  );
};

export default CandidateCard;
