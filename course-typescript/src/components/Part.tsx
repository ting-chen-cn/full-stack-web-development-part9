import React from 'react';
import { CoursePart } from '../type';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      );
      break;
    case 'Using props to pass data':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      );
      break;
    case 'Deeper type usage':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}{' '}
          {part.exerciseSubmissionLink}
        </p>
      );
      break;
    case 'Computer Vision':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}{' '}
        </p>
      );
      break;
    default:
      return assertNever(part);
  }
};

export default Part;
