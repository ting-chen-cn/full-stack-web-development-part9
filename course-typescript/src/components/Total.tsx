import React from 'react';
import { courseParts } from '../type';
const Total: React.FC<{ parts: Array<courseParts> }> = ({
  parts,
}) => {
  const initialValue = 0;
  const total = parts.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.exerciseCount,
    initialValue
  );
  return <p>Number of exercises {total}</p>;
};
export default Total;
