import React from 'react';
import './App.css';
import Board from './Board';
import { RecoilRoot } from 'recoil';
import TestRenderer from 'react-test-renderer';

function App() {
  return (
    <RecoilRoot>
      <Board />
    </RecoilRoot>
  );
}

export default App;

const testRenderer = TestRenderer.create(<App />);
console.log(testRenderer.toJSON());
