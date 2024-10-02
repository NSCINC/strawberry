import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// Função para abrir o banco de dados
const openDatabase = () => {
  return SQLite.openDatabase(
    {
      name: 'iron_whale.db',
      location: 'default',
    },
    () => {
      console.log('Database opened successfully');
    },
    error => {
      console.log('Error opening database:', error);
    }
  );
};

// Função para criar tabelas
const createTables = (db) => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        token TEXT NOT NULL
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS CrmData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        data TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES Users(id)
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ErpData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        data TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES Users(id)
      );`
    );
  },
  error => {
    console.log('SQL error:', error);
  },
  () => {
    console.log('Tables created successfully');
  });
};

const App = () => {
  useEffect(() => {
    const db = openDatabase();
    createTables(db);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SQLite Database Setup in React Native for Desktop</Text>
      <Button title="Create Tables" onPress={() => createTables(openDatabase())} />
    </View>
  );
};

export default App;
