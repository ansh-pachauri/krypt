import {ethers} from "ethers";
import {contractAddress, contractAbi} from "../utils/constants";
import React, {createContext, useContext, useEffect, useState} from "react";

export const TranscationContext =createContext();

const {ethereum} = window;
const getEtherumContract= async()=>{
    if (!window.ethereum) throw new Error("No ethereum object");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer =await provider.getSigner();
    const transcationContract = new ethers.Contract(
        contractAddress, contractAbi, signer
    )

    console.log({
        provider,
        signer,
        transcationContract});

    return transcationContract;
}   

export const TranscationProvider = ({children})=>{

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({addressTo:"", amount: "", keyword: "", message: ""});

    const [isLoading, setIsLoading] = useState(false);
    const [transcationCount, setTranscationCount] = useState(localStorage.getItem("transcationCount"));
    const [transction, settransction] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAlltransction =async()=>{
        try {
            if(!ethereum) return alert("Please install MetaMask");

            const transactionContract = await getEtherumContract();
            const availabletransction = await transactionContract.getAllTransctions();
            console.log(availabletransction);

            const structuredtransction = availabletransction.map((transction) => ({
                 
                    addressTo: transction.receiver,
                    addressFrom: transction.sender,
                    timeStamp: new Date(transction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transction.message,
                    keyword: transction.keyword,
                    amount: ethers.formatEther(transction.amount)
                
            }));

            console.log(structuredtransction);
            settransction(structuredtransction);
        } catch (error) {
            console.log(error);
            
        }
    }

   


    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install MetaMask");

        const accounts = await ethereum.request({method: "eth_accounts"});

        if(accounts.length){
            setCurrentAccount(accounts[0]);

            //we will call the function to get the all tnx
            getAlltransction();
        }else{
            console.log("No accounts found");
        }


        console.log(accounts); 


        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
            
        }
         
    }

    const checkIfTranscationExists = async() =>{
        try{
            if(!ethereum) return alert("Please install MetaMask");
            const transactionContract = await getEtherumContract();
            const transcationCount = await transactionContract.getTransctionCount();
            console.log(transcationCount);
            const countValue = typeof transcationCount === 'bigint' 
            ? transcationCount.toString()
            : transcationCount.toString();
            window.localStorage.setItem("transcationCount", countValue);

        }catch(error){
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
        getAlltransction();
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
            const transactionContract = await getEtherumContract(); 
            const parsedAmount = ethers.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 GWEI
                    value: ethers.toBeHex(parsedAmount) //0.0001
                }]
            })

            const tx =  await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message, 
                keyword); 
            setIsLoading(true);
            console.log(`Loading - ${tx.hash}`);
            await tx.wait();
            setIsLoading(false);
            console.log(`Success - ${tx.hash}`);

            const transcationCount = await transactionContract.getTransctionCount();
            setTranscationCount(transcationCount.toString());
            await getAlltransction();
            // window.location.reload();
            console.log("log3"); 

            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
            
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTranscationExists();
        
        },[]);

    useEffect(()=>{
        if(currentAccount){
            getAlltransction();
        }
    },[currentAccount])    
    return(
        <TranscationContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransction, transction,isLoading}}>
            {children}
        </TranscationContext.Provider>
        
    )
}

