import React from "react";
import CandidateCard from "../Card/CandidateCard";
import { ICandidatesListProps } from "../../types";

const CandidatesList = ({ candidates }: ICandidatesListProps) => {
  if (!candidates.length) return null;
  return (
    <div className="d-flex flex-wrap justify-content-md-center">
      {candidates.map((candidate, i) => (
        <CandidateCard candidate={candidate} key={i} />
      ))}
    </div>
  );
};

export default CandidatesList;
