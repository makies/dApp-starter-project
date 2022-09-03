import React, {useEffect, useState} from "react";
// eslint-disable-next-line
import './App.css';

const App = () => {
  const wave = () => {
  }

  // ユーザーのパブリックウォレットを保存するために使用する状態変数を定義
  const [currentAccount, setCurrentAccount] = useState("");
  console.log("currentAccount", currentAccount);

  // window.ethereumにアクセスできることを確認
  const checkIfWalletIsConnected = async () => {
    try {
      const {ethereum} = window;
      if (!ethereum) {
        console.log("Make sure you have Metamask.");
      } else {
        console.log("We have hte ethereum object", ethereum);
      }
      // ユーザーのウォレットへのアクセスが許可されているかどうかを確認
      const accounts = await ethereum.request({method: 'eth_accounts'});
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("found an authorized account", account);
        setCurrentAccount(account);
      } else {
        console.log("No Authorized account found.");
      }

    } catch (error) {
      console.error(error);
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;
      if (!ethereum) {
        alert("Get Metamask!");

      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  // Webページがロードされたときに下記の関数を実行する
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          <span role="img" aria-label="hand-wave">👋</span> WELCOME!
        </div>

        <div className="bio">
          イーサリアムウォレットを接続して、メッセージを作成したら、
          <span role="img" aria-label="hand-wave">👋</span>
          を送ってください
          <span role="img" aria-label="shine">✨</span>
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        {currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Wallet Connected
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
