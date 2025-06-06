import {AiFillPlayCircle} from "react-icons/ai";
import {SiEthereum} from "react-icons/si";
import {BsInfoCircle} from "react-icons/bs";
import Loader from "./Loader";
import { TranscationContext } from "../context/TransctionContext";
import { useContext } from "react";

const Input = ({placeholder, name, type, value, handleChange})=>{
    return (

        <input
            placeholder={placeholder}
            name={name}
            type={type}
            step="0.0001"
            value={value}
            onChange={(e) => handleChange(e, name)}
            className="my-2 w-full rounded-3xl p-4 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
    )
}

export default function Welcome(){

    const {connectWallet, currentAccount, formData, handleChange, sendTransction, isLoading
    } = useContext(TranscationContext);

   

    
// handleSubmit function
    const handleSubmit = (e)=>{
        const{addressTo, amount, keyword, message} = formData;
        e.preventDefault();

        if(!addressTo || !amount || !keyword || !message){
            alert("Please fill in all the fields.");
            return;
        }
        sendTransction();
        
        
    }

    const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

   
    return(
        <div className="flex w-full justify-center items-center" >
            <div className="flex mf:flex-row flex-row items-start gap-[50px] justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Send Crypto <br /> across the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-96 w-full">
                        Explore the crypto world. Buy and sell cryptocurrencies easily on Krypt.
                    </p>
                    {!currentAccount && (
                        <button
                    onClick={connectWallet}
                    className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                        <p className="text-white text-base font-semibold">
                            Connect Wallet
                        </p>
                    </button>
                    )}
                    
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div className={`${commonStyles}`}>
                            Security
                        </div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={`${commonStyles}`}>
                            Low fees
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                {/* Card */}
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                    <div className="flex justify-between flex-row w-full h-full">
                        <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                            <SiEthereum fontSize={21} color="#fff" />
                        </div>
                        <BsInfoCircle fontSize={17} color="#fff" />
                    </div>
                    <div>
                        <p className="text-white font-light text-sm text-left break-all">
                          {currentAccount}
                        </p>
                        <p className="text-white font-light text-lg text-left ">
                            Ethereum
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                
                    <Input placeholder="Address To" name="addressTo" type="text" value={formData.addressTo} handleChange={handleChange} />
                    <Input placeholder="Amount (ETH)" name="amount" type="text" value={formData.amount} handleChange={handleChange} />
                    <Input placeholder="Keyword (Gif)" name="keyword" type="text" value={formData.keyword} handleChange={handleChange} />
                    <Input placeholder="Enter Message" name="message" type="text" value={formData.message} handleChange={handleChange} />
                    <div className="h-[1px] w-full bg-gray-400 my-2" />
                    
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                        >
                            Send now
                        </button>
                    )}

                </div>
            </div>
        </div>
        </div>
    )
}