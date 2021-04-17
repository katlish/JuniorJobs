import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "./MyCard.css";
import { IJobProps } from "../../types";

const JobCard = ({ job }: IJobProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(null);
  return (
    <>
      <Card className="mycard d-flex m-2 text-left shadow-sm">
        <Card.Header className="d-flex align-items-center">
          <Card.Title className="text-info mb-0">{job.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2">{job.company}</Card.Subtitle>
          <Card.Img variant="top" src={job.company_logo} />
          <Card.Subtitle className="mb-2">{job.location}</Card.Subtitle>
          <Card.Subtitle className="mb-2">{job.created_at}</Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
};

export default JobCard;
