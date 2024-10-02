import React, { useState } from 'react';

const BUFFER_SIZE = 213;

const NoxusAI = () => {
    const [buffer, setBuffer] = useState(new Uint8Array(BUFFER_SIZE));
    const [bufferSize, setBufferSize] = useState(0);
    const [digest, setDigest] = useState('');

    // Update the digest with a single byte
    const update = (value) => {
        if (bufferSize >= BUFFER_SIZE) {
            throw new Error("Buffer overflow");
        }
        const newBuffer = new Uint8Array(buffer);
        newBuffer[bufferSize] = value;
        setBuffer(newBuffer);
        setBufferSize(bufferSize + 1);
    };

    // Update the digest with an array of bytes
    const updateBytes = (bytes) => {
        for (const b of bytes) {
            update(b);
        }
    };

    // Update the digest with a big-endian integer
    const updateBigEndianInt = (value) => {
        const byteBuffer = new Uint8Array(4);
        byteBuffer[0] = (value >> 24) & 0xFF;
        byteBuffer[1] = (value >> 16) & 0xFF;
        byteBuffer[2] = (value >> 8) & 0xFF;
        byteBuffer[3] = value & 0xFF;
        updateBytes(byteBuffer);
    };

    // Reset the buffer
    const reset = () => {
        setBuffer(new Uint8Array(BUFFER_SIZE));
        setBufferSize(0);
        setDigest('');
    };

    // Calculate the SHA-256 digest
    const digest = async () => {
        if (bufferSize !== BUFFER_SIZE) {
            throw new Error(`Buffer not filled with ${BUFFER_SIZE} bytes`);
        }

        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hexDigest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setDigest(hexDigest);
    };

    const handleComputeDigest = () => {
        reset(); // Reset buffer before filling
        for (let i = 0; i < BUFFER_SIZE; i++) {
            update(0); // Fill with zeroes
        }
        digest().catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Noxus AI Digest Calculator</h1>
            <button onClick={handleComputeDigest}>Compute Digest</button>
            {digest && (
                <div>
                    <h2>SHA-256 Digest:</h2>
                    <p>{digest}</p>
                </div>
            )}
        </div>
    );
};

export default NoxusAI;
import React from 'react';
import NoxusAI from './NoxusAI';

function App() {
    return (
        <div className="App">
            <NoxusAI />
        </div>
    );
}

export default App;
