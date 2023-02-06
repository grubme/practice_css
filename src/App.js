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
    for (let i = 0; i < userData.length; i++) {
      let month = new Date(userData[i]['date']);
        monthT[month.getMonth() + 1]['amounts'].push(userData[i]['amount']);
    }
    for (let key in monthT) {
      let total_month_rewards = 0;
      for (let i = 0; i < monthT[key]['amounts'].length; i++) {
        let price = monthT[key]['amounts'][i];

        total_month_rewards = total_month_rewards + handleRewardCalculation(price);
      }
      monthT[key]['rewards'] = total_month_rewards;
    }
    console.log(monthT)
    setCalcRewards({ ...monthT });
    setUserTransactions([...userData]);
  };

  const updateInput = (e) => {
    if (e.target.name === "date") {
      setNewTransaction({ ...newTransaction, ...{ date: e.target.value } });
    }
    if (e.target.name === "amount") {
      setNewTransaction({ ...newTransaction, ...{ amount: e.target.value } });
    }
  }

  const handleAddingTransaction = () => {
    let data = { ...loadedData };
    let month = new Date(newTransaction['date']);

      data[currentUser].push(newTransaction);
      console.log(data)
      setloadedData({ ...data });

      handleUserSelect(currentUser);

    setNewTransaction({ date: new Date(), amount: 0 });
  }
  return (
    <div style={{
      marginTop: "20px",
      marginBottom: "50px",
      fontSize: "20px",

    }}>
      <h2 style={{ textAlign: "center" }}>Reward Points System</h2>
      <div className="multi-choice">
        <select onChange={e => handleUserSelect(e.target.value)} value={currentUser} >
          <option value="" disabled>Select</option>
          {users.map((item, index) => {
            return (
              <option key={index} value={item}> {item} </option>
            );
          })}
        </select>
      </div>

      {Object.keys(userRewards).length > 0 &&
        <div className="month-transaction">
          <table className="customers">
            <thead>
              <tr>
                <th>Month</th>
                <th>Rewards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>January</td>
                <td>{userRewards[1]["rewards"]}</td>
              </tr>
              <tr>
                <td>February</td>
                <td>{userRewards[2]["rewards"]}</td>
              </tr>
              <tr>
                <td>March</td>
                <td>{userRewards[3]["rewards"]}</td>
              </tr>
              <tr>
                <td>April</td>
                <td>{userRewards[4]["rewards"]}</td>
              </tr>
              <tr>
                <td>May</td>
                <td>{userRewards[5]["rewards"]}</td>
              </tr>
              <tr>
                <td>June</td>
                <td>{userRewards[6]["rewards"]}</td>
              </tr>
              <tr>
                <td>July</td>
                <td>{userRewards[7]["rewards"]}</td>
              </tr>
              <tr>
                <td>August</td>
                <td>{userRewards[8]["rewards"]}</td>
              </tr>
              <tr>
                <td>September</td>
                <td>{userRewards[9]["rewards"]}</td>
              </tr>
              <tr>
                <td>October</td>
                <td>{userRewards[10]["rewards"]}</td>
              </tr>
              <tr>
                <td>November</td>
                <td>{userRewards[11]["rewards"]}</td>
              </tr>
              <tr>
                <td>December</td>
                <td>{userRewards[12]["rewards"]}</td>
              </tr>
              <tr>
                <td style={{fontWeight: "bold"}}>Total Reward</td>
                <td>{userRewards[1]["rewards"] + userRewards[2]["rewards"] + userRewards[3]["rewards"] +
                    userRewards[4]["rewards"] +  userRewards[5]["rewards"] + userRewards[6]["rewards"] +
                    userRewards[7]["rewards"] + userRewards[8]["rewards"] + userRewards[9]["rewards"] +
                    userRewards[10]["rewards"] + userRewards[11]["rewards"] + userRewards[12]["rewards"]}</td>
              </tr>
            </tbody>
          </table>

          <div className="transactions-container">
          <h4>User Transactions</h4>
          {userTransactions.length > 0 ?
            <table className="customers">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Rewards</th>
                </tr>

              </thead>
              <tbody>
                {userTransactions.map((item, index) => {
                  return <tr key={index}>
                    <td>{item["date"]}</td>
                    <td>{item["amount"]}</td>
                    <td>{handleRewardCalculation(item["amount"])}</td>
                  </tr>
                })}
              </tbody>
            </table>
            : <div>No Transactions Found</div>}
          <div>
            <h4>Add Transactions</h4>

            <div className="add-transaction">
            <label>Date : </label><input type="date" name="date" value={newTransaction.date} onChange={(e) => updateInput(e)}></input>
            <label>Amount :</label><input type="number" name="amount" value={newTransaction.amount} onChange={(e) => updateInput(e)}></input>
            <button onClick={() => handleAddingTransaction()}>Add Transaction</button>
            </div>
          </div>
          </div>
        </div>
      }


    </ div >
  );
}

export default App;

function handleRewardCalculation(price) {
  let rewards = 0;
  if (price > 100) {
    rewards = (price - 100) * 2;
    rewards += 50;
  } else if (price > 50) {
    rewards += (price - 50);
  }
  return rewards;

}
