import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import data from './data';

function App() {
  const [loadedData, setloadedData] = useState({});
  const [userRewards, setCalcRewards] = useState({});
  const [userTransactions, setUserTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [newTransaction, setNewTransaction] = useState({ date: new Date(), amount: 0 });

  useEffect(() => {
    setloadedData({ ...data });
    setUsers([...Object.keys(data)]);
  }, []);


  const handleUserSelect = (value) => {
    setCurrentUser(value);
    let userData = loadedData[value];

    let monthT = {
      1: {
        amounts: [],
        rewards: 0,
      },
      2: {
        amounts: [],
        rewards: 0,
      },
      3: {
        amounts: [],
        rewards: 0,
      },
      4: {
        amounts: [],
        rewards: 0,
      },
      5: {
        amounts: [],
        rewards: 0,
      },
      6: {
        amounts: [],
        rewards: 0,
      },
      7: {
        amounts: [],
        rewards: 0,
      },
      8: {
        amounts: [],
        rewards: 0,
      },
      9: {
        amounts: [],
        rewards: 0,
      },
      10: {
        amounts: [],
        rewards: 0,
      },
      11: {
        amounts: [],
        rewards: 0,
      },
      12: {
        amounts: [],
        rewards: 0,
      },
    };
    for (