import React, { useEffect, useState } from 'react';
import Row from './Row';
import {
  useRecoilValue,
  useRecoilCallback,
  useRecoilSnapshot,
  useRecoilTransactionObserver_UNSTABLE,
  useGotoRecoilSnapshot,
} from 'recoil';
import { boardState } from './Recoil/Atoms';

function Board(props) {
  const boardMatrix = useRecoilValue(boardState);
  const [snapshotArchive, setSnapshotArchive] = useState([]);
  const [snapshotValues, setSnapshotValues] = useState([]);

  const getBoardSnap = useRecoilCallback(({ snapshot }) => async () => {
    const boardStateSnap = await snapshot.getPromise(boardState);

    const newSnapShotArchive = [...snapshotArchive, snapshot];
    const newSnapshotValues = [...snapshotValues, boardStateSnap];
    setSnapshotArchive(newSnapShotArchive);
    setSnapshotValues(newSnapshotValues);
  });

  useEffect(() => {
    getBoardSnap();
  }, [boardMatrix]);

  //maybe can use to specify certain elements to watch for as stretch

  const observer = new MutationObserver((recordArr) => console.log(recordArr));
  observer.observe(document, {
    subtree: true,
    childList: true,
    characterData: true,
  });

  const rowArr = [];
  for (let i = 0; i < 3; i++) {
    rowArr.push(
      <Row
        classname="rows"
        id={`row${i}`}
        key={`row${i}`}
        rowTextArray={boardMatrix[i]}
      />
    );
  }

  // useRecoilTransactionObserver_UNSTABLE(({ snapshot, previousSnapshot }) => {
  //   console.log('transaction current', snapshot);
  //   console.log('transaction previous', previousSnapshot);
  // });

  const goToSnapshot = useGotoRecoilSnapshot();

  return (
    <div>
      {rowArr}
      <select
        name="Snapshots"
        onChange={(e) => goToSnapshot(snapshotArchive[e.target.value])}
      >
        <option value="">Select Snapshot Below</option>
        {snapshotArchive.map((snapshot, idx) => (
          <option key={idx} value={idx}>
            {JSON.stringify(snapshotValues[idx])}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Board;
