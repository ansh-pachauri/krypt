import {ethers} from "ethers";
import {contractAddress, contractAbi} from "../utils/constants";
import React, {createContext, useContext, useEffect, useState} from "react";
export const TransctionContext =createContext();

const {ethereum} = window;
const getEtherumContract= ()=>{
    if (!window.ethereum) throw new Error("No ethereum object");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const transctionContract = new ethers.Contract(
        contractAddress, contractAbi, signer
    )

    console.log({
        provider,
        signer,
        transctionContract});

    return transctionContract;
}

export const TransctionProvider = ({children})=>{

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({addressTo:"", amount: "", keyword: "", message: ""});

    // const handleChange = (e, name) => {
    //     setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    // };

    const handleChange = (e, name) => {
        console.log("Input changing:", name, e.target.value);
        setFormData((prevState) => {
            const newState = { ...prevState, [name]: e.target.value };
            console.log("New form state:", newState);
            return newState;
        });
    };


    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install MetaMask");

        const accounts = await ethereum.request({method: "eth_accounts"});

        if(accounts.length){
            setCurrentAccount(accounts[0]);

            //later we will call the function to get the all tnx
        }else{
            console.log("No accounts found");
        }


        console.log(accounts); 


        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
            
        }
         
    }

    const connectWallet = async ()=>{
        try {
        if(!ethereum) return alert("Please install MetaMask");
        const accounts = await ethereum.request({method: "eth_requestAccounts"});

        setCurrentAccount(accounts[0]);
        console.log(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }


    const sendTransction = async()=>{
        try {
            if(!ethereum) return alert("Please install MetaMask");
            console.log("log1");
            //get the data from the form and send it to the contract
            const{addressTo, amount, keyword, message} = formData;
            console.log("log2");
            getEtherumContract();
            console.log("log3"); 

            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
            
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return(
        <TransctionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransction}}>
            {children}
        </TransctionContext.Provider>

    )
}

