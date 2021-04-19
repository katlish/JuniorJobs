import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, toggleIsRemote, setQuery } from "../store/actions/jobs";
import { Spinner, Form } from "react-bootstrap";
import { filterJobs } from '../store/selectors/jobs';
import JobsList from "../components/JobsList/JobsList";

const JobsPage = () => {
  const visibleJobs = useSelector(filterJobs);
  const isLoading = useSelector((state: any) => state.jobs.isLoading);
  const isRemote = useSelector((state: any) => state.jobs.isRemote);
  const query = useSelector((state: any) => state.jobs.query);
  const error = useSelector((state: any) => state.jobs.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
  }, []);

  const onChange = () => {
    console.log("onChange with isRemote = ", isRemote);
    dispatch(toggleIsRemote());
    if (isRemote){
      dispatch(setQuery(""));
    }else{
      dispatch(setQuery("remote"));
    }
  };

  return (
    <div className="py-4">
      <Form className="text-center my-4">
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Remote jobs only"
          onChange={onChange}
          checked={isRemote}
        />
      </Form>
      <p className="text-center">
        {visibleJobs?.length} Entry Level Software Jobs Found
        {isLoading && <Spinner as="span" variant="info" animation="border" />}
      </p>
      <JobsList jobs={visibleJobs} />
      <h3 className="text-left mb-4">{error && `Error: ${error}`}</h3>
    </div>
  );
};

export default JobsPage;
