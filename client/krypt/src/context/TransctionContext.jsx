import {ethers} from "ethers";
import {contractAddress, contractAbi} from "../utils/constants";
import React, {createContext, useContext, useEffect, useState} from "react";
export const TransactionContext =createContext();

const {ethereum} = window;
const getEtherumContract= ()=>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transctionContract = new ethers.Contract(
        contractAddress, contractAbi, signer
    )

    console.log({
        provider,
        signer,
        transctionContract});

        

}

export const TransactionProvider = ({children})=>{

    const [currentAccount, setCurrentAccount] = useState("");

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

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount}}>
            {children}
        </TransactionContext.Provider>

    )
}

