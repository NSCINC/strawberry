import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, FlatList, Alert } from 'react-native';

const API_URL = 'http://localhost:5000'; // Change to your server's IP address if testing on a physical device

export default function App() {
  const [investorName, setInvestorName] = useState('');
  const [investorBalance, setInvestorBalance] = useState('');
  const [amount, setAmount] = useState('');
  const [investmentPlan, setInvestmentPlan] = useState('');
  const [plans, setPlans] = useState([]);

  const fetchBalance = async () => {
    try {
      const response = await fetch(`${API_URL}/balance/${investorName}`);
      const data = await response.json();
      if (response.ok) {
        setInvestorBalance(data.balance);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch balance');
    }
  };

  const invest = async () => {
    try {
      const response = await fetch(`${API_URL}/invest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ investor: investorName, amount: Number(amount), plan: investmentPlan }),
      });
      const data = await response.json();
      Alert.alert('Investment Status', data.message);
    } catch (error) {
      Alert.alert('Error', 'Failed to invest');
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${API_URL}/investment_plan`);
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch plans');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Investment App</Text>
      
      <TextInput
        placeholder="Investor Name"
        value={investorName}
        onChangeText={setInvestorName}
        style={styles.input}
      />

      <Button title="Fetch Balance" onPress={fetchBalance} />
      <Text>Balance: {investorBalance}</Text>

      <TextInput
        placeholder="Amount to Invest"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <TextInput
        placeholder="Investment Plan"
        value={investmentPlan}
        onChangeText={setInvestmentPlan}
        style={styles.input}
      />
      
      <Button title="Invest" onPress={invest} />
      <Button title="Fetch Plans" onPress={fetchPlans} />

      <FlatList
        data={plans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.planItem}>
            <Text>{item.name}: Initial Investment {item.initial_investment}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  planItem: {
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
});
