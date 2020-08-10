import React from 'react';
import Box from './Box.js';

function Row(props) {
  const boxArr = [];
  for (let i = 0; i < 3; i++) {
    boxArr.push(<Box key={i} id={i} boxText={props.rowTextArray[i]} />);
  }
  return <div id={props.id}>{boxArr}</div>;
}

export default Row;
