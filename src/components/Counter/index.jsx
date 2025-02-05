import { useState } from 'react';

export default function Counter() {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <h1>Counter</h1>
            <p>Count is currently {counter}</p>
            <button onClick={() => setCounter((count) => count + 1)}>Count</button>
        </div>
    );
}
