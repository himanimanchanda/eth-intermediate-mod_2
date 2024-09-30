import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Once wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(50); // Deposit 50 ETH
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(16); // Withdraw 16 ETH
      await tx.wait();
      getBalance();
    }
  };

  // Functions to interact with purchase options

  const buyHandgloves = async () => {
    if (atm) {
      let tx = await atm.buyHandgloves(10); // Example: 10 ETH for handgloves
      await tx.wait();
      getBalance();
    }
  };

  const buyCaps = async () => {
    if (atm) {
      let tx = await atm.buyCaps(5); // Example: 5 ETH for caps
      await tx.wait();
      getBalance();
    }
  };

  const buySocks = async () => {
    if (atm) {
      let tx = await atm.buySocks(3); // Example: 3 ETH for socks
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if the user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>Please connect your Metamask wallet</button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>

        <button onClick={deposit}>Deposit 50 ETH</button>
        <button onClick={withdraw}>Withdraw 16 ETH</button>

        <h3>Purchase Items:</h3>
        <button onClick={buyHandgloves}>Buy Handgloves (10 ETH)</button>
        <button onClick={buyCaps}>Buy Caps (5 ETH)</button>
        <button onClick={buySocks}>Buy Socks (3 ETH)</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Digital Decentralized Banking Service</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #16a085;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        button {
          background-color: #2980b9;
          color: white;
          padding: 10px 20px;
          margin: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #1abc9c;
        }
      `}</style>
    </main>
  );
}
