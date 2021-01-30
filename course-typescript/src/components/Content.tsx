import React from 'react';
import Part from './Part';
import { CoursePart } from '../type';

const Content: React.FC<{ parts: Array<CoursePart> }> = ({
  parts,
}) => {
  return (
    <div>
      {parts.map((c, index) => (
        <Part key={index} part={c} />
      ))}
    </div>
  );
};
export default Content;
