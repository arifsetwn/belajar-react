import { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  return (
    <div>
      <div>
        {left}
        <button onClick={() => setLeft(left + 1)}>kiri</button>
        <button onClick={() => setRight(right + 1)}>kanan</button>
        {right}
      </div>
    </div>
  );
};


export default App