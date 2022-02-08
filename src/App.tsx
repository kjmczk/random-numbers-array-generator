import React, { useEffect, useState } from 'react';
import './App.css';

const initialValues = {
  startNum: '',
  endNum: '',
  stepNum: '1',
  resultNum: '',
};

function App() {
  const [values, setValues] = useState(initialValues);
  const [numbers, setNumbers] = useState<string[]>([]);

  const range = (start: number, end: number, step: number) =>
    Array.from(
      { length: (end - start) / step + 1 },
      (_, i) => start + i * step
    );

  function getRandom(start: number, end: number, step: number, n: number) {
    const arr = range(start, end, step);

    let result: number[] = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    const sorted = result.sort((a, b) => a - b);
    setNumbers(sorted.map(String));
  }

  function generate() {
    try {
      getRandom(
        Number(values.startNum),
        Number(values.endNum),
        Number(values.stepNum),
        Number(values.resultNum)
      );
    } catch (error) {
      console.error(error);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
  }

  useEffect(() => {
    if (numbers.length > 0) {
      console.log(numbers);
    }
  }, [numbers]);

  return (
    <div className="App">
      <div>
        <label htmlFor="startNum">Start Number:</label>
        <input
          type="text"
          id="startNum"
          name="startNum"
          defaultValue={values.startNum}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="endNum">End Number:</label>
        <input
          type="text"
          id="endNum"
          name="endNum"
          defaultValue={values.endNum}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="stepNum">Step Number:</label>
        <input
          type="text"
          id="stepNum"
          name="stepNum"
          defaultValue={values.stepNum}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="resultNum">Result Number:</label>
        <input
          type="text"
          id="resultNum"
          name="resultNum"
          defaultValue={values.resultNum}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={generate}>Generate</button>
    </div>
  );
}

export default App;
