import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';

// Função para adicionar um plano de investimento via API
const addPlan = async (plan) => {
    try {
        const response = await fetch('http://<your-ip>:8080/addPlan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(plan),
        });
        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error('Error adding plan:', error);
    }
};

// Função para realizar um investimento via API
const invest = async (investment) => {
    try {
        const response = await fetch('http://<your-ip>:8080/invest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(investment),
        });
        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error('Error making investment:', error);
    }
};

const Init = () => {
    useEffect(() => {
        // Definindo um plano de investimento de exemplo
        const plan = {
            planName: 'economicPlan',
            initialInvestment: 500,
            monthlyReturn: 5,
            annualReturn: 60,
            netAnnualReturn: 300,
            slots: 500,
        };

        // Adicionar o plano ao iniciar o componente
        addPlan(plan);
    }, []);

    const handleInvestment = () => {
        // Definindo um investimento de exemplo
        const investment = {
            planName: 'economicPlan',
            amount: 100,
            investorAddress: '0x3333333333333333333333333333333333333333',
        };

        // Realizar investimento
        invest(investment);
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>API Initialization Example</Text>
            <Button title="Invest in Economic Plan" onPress={handleInvestment} />
        </View>
    );
};

export default Init;
