import React, { useState } from 'react';

const VALID_TOKEN = 'valid_token';

const InvestmentApp = () => {
    const [token, setToken] = useState('');
    const [planName, setPlanName] = useState('');
    const [initialInvestment, setInitialInvestment] = useState('');
    const [amount, setAmount] = useState('');
    const [investorAddress, setInvestorAddress] = useState('');
    const [neuralNetworkResult, setNeuralNetworkResult] = useState(null);

    const calculateNeuralNetwork = (data) => {
        // Simulating a neural network feedforward calculation
        const weights = [0.5, 0.3, 0.2]; // Example weights
        const weightedSum = data.reduce((sum, value, index) => sum + value * weights[index], 0);
        return 1 / (1 + Math.exp(-weightedSum)); // Sigmoid function
    };

    const handleInvestment = () => {
        // Validate the token
        if (token !== VALID_TOKEN) {
            alert('Invalid NSC token');
            return;
        }

        // Simulating neural network processing
        const crmData = [parseFloat(initialInvestment), parseFloat(amount), 5.0]; // Example data
        const result = calculateNeuralNetwork(crmData);
        setNeuralNetworkResult(result);

        // Simulating adding plan and investing
        addPlan({ planName, initialInvestment });
        invest({ planName, amount, investorAddress });
    };

    const addPlan = ({ planName, initialInvestment }) => {
        // Simulate running the Lua contract
        console.log(`Adding plan: ${planName} with initial investment: ${initialInvestment}`);
    };

    const invest = ({ planName, amount, investorAddress }) => {
        // Simulate running the Lua contract
        console.log(`Investing ${amount} in plan: ${planName} for address: ${investorAddress}`);
    };

    return (
        <div>
            <h1>Investment Application</h1>
            <div>
                <label>
                    Token:
                    <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
                </label>
                <br />
                <label>
                    Plan Name:
                    <input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} />
                </label>
                <br />
                <label>
                    Initial Investment:
                    <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} />
                </label>
                <br />
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
                <br />
                <label>
                    Investor Address:
                    <input type="text" value={investorAddress} onChange={(e) => setInvestorAddress(e.target.value)} />
                </label>
                <br />
                <button onClick={handleInvestment}>Invest</button>
            </div>
            {neuralNetworkResult !== null && (
                <div>
                    <h2>Neural Network Result: {neuralNetworkResult.toFixed(2)}</h2>
                </div>
            )}
        </div>
    );
};

export default InvestmentApp;
