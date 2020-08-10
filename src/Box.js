import React from 'react';
import { useRecoilState } from 'recoil';
import { boardState } from './Recoil/Atoms';
import { cloneDeep } from 'lodash';

function Box(props) {
  const [boardMatrix, setBoardMatrix] = useRecoilState(boardState);

  const handleBoxClick = (e) => {
    const rowId = e.target.parentNode.id[e.target.parentNode.id.length - 1];
    // Access box's DOM node
    const boxId = e.target.id;
    const newBoard = cloneDeep(boardMatrix);

    if (newBoard[rowId][boxId] === 'O' || newBoard[rowId][boxId] === '-')
      newBoard[rowId][boxId] = 'X';
    else newBoard[rowId][boxId] = 'O';

    setBoardMatrix(newBoard);
  };
  return (
    <button id={props.id} className="box" onClick={handleBoxClick}>
      {props.boxText}
    </button>
  );
}

export default Box;
