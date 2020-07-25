import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './Job';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  //destructuring return object from fetchjobs component
  //jobs data is taken from axios request res.data
  const { jobs, loading, error } = useFetchJobs(params, page);

  //Every job component has a unique identifier & each job has it's own properties passed.

  return (
    <Container>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error... Trying refreshing</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job}></Job>;
      })}
    </Container>
  );
}

export default App;
