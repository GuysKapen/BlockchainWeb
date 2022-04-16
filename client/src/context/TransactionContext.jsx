import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants.js";

export const TransactionContext = React.createContext();

const { ethereum } = window;

function getEthereumContract() {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractTransaction = new ethers.Contract(contractAddress, contractABI, signer);

    return contractTransaction;
}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

    function handleChange(e, name) {
        setFormData((preState) => ({ ...preState, [name]: e.target.value }));
    }

    async function connectWallet() {
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    }

    async function checkIfWalletConnected() {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0])
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function sendTransaction() {
        try {
            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5dc0",
                    value: parsedAmount._hex,
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            await transactionHash.wait();
            setIsLoading(false);

            const transactionCount = transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());


        } catch (error) {
           console.log(error); 
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ currentAccount, connectWallet, handleChange, formData, sendTransaction, isLoading }}>
            {children}
        </TransactionContext.Provider>
    )
}