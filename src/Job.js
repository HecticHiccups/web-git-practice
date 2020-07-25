import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import ReactMarkDown from 'react-markdown';

//jobs properties are passsed obtain from parent component job data
export default function Job({ job }) {
  return (
    <Card>
      <Card.Body>
        <div className='d-flex justify-content-between'>
          <div>
            <Card.Title>
              {job.title} -{' '}
              <span className='text-muted font-weight-light'>
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className='text-muted mb-2'>
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant='secondary' className='mr-2'>
              {' '}
              {job.type}
            </Badge>
            <Badge variant='secondary'>{job.location}</Badge>
            <div>
              <div style={{ wordBreak: 'break-all' }}>
                <ReactMarkDown source={job.how_to_apply}></ReactMarkDown>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
