"use client"
import { useEffect, useState } from "react";
import { Input,Modal} from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
} from "@ant-design/icons";
import '../components/Swap.css';
import qs from "qs";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import List from '../TokenList.json';
export default function Swap() {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  interface Token{
    address: string,
    decimals: number,
    logoURI: string,
    name: string,
    symbol: string
  }
    const [tokenOneAmount, setTokenOneAmount] = useState<string | null>(null);
    const [tokenTwoAmount, setTokenTwoAmount] = useState<string | null>(null);
    const [tokenOne, setTokenOne] = useState<Token | null>(null);
    const [tokenTwo, setTokenTwo] = useState<Token | null >(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [changeToken,setChangeToken] = useState<number>(1);
    const [tokenList, setTokenList] = useState<Token[]>(List);

    function TokenOneHandler(e:any){
        setTokenOneAmount(e.target.value);
    }

    function openModal(asset: number){
        setChangeToken(asset);
        setIsOpen(true);
    }

    function modifyToken(i:number){
      setTokenOneAmount(null);
      setTokenTwoAmount(null);
      if(changeToken===1) setTokenOne(tokenList[i]);
      else setTokenTwo(tokenList[i]);
      setIsOpen(false);
    }

    function switchTokens() {
      setTokenOneAmount(null);
      setTokenTwoAmount(null);
      setTokenOne(tokenTwo);
      setTokenTwo(tokenOne);
    }
    async function getPrice () {
    console.log("Getting Price");
  
    if (!tokenOne || !tokenTwo || !tokenOneAmount) return;
    const amt = Number(tokenOneAmount)
    let amount = Number(amt * 10 ** tokenOne.decimals);
  
    const params = {
        sellToken: tokenOne.address,
        buyToken: tokenTwo.address,
        sellAmount: amount,
    }

    const headers = {'0x-api-key':apikey};
  
    // Fetch the swap price.
    const response = await fetch(`https://api.0x.org/swap/v1/price?${qs.stringify(params)}`, { headers });
    
    const swapPriceJSON = await response.json();
    setTokenTwoAmount(String((swapPriceJSON.buyAmount / (10 ** tokenTwo.decimals)).toFixed(5)));
    console.log("Price: ", swapPriceJSON);
    }

    async function getQuote(account:any){
      console.log("Getting Quote");
    
      if (!tokenOne || !tokenTwo || !tokenOneAmount) return;
      const amt = Number(tokenOneAmount)
      let amount = Number(amt * 10 ** tokenOne.decimals);
    
      const params = {
          sellToken: tokenOne.address,
          buyToken: tokenTwo.address,
          sellAmount: amount,
          takerAddress: account,
      }
      
      const headers = {'0x-api-key':apikey}; // This is a placeholder. Get your live API key from the 0x Dashboard (https://dashboard.0x.org/apps)
    
      // Fetch the swap quote.
      const response = await fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`, { headers });
      
      const swapQuoteJSON = await response.json();
      console.log("Quote: ", swapQuoteJSON);
      
      setTokenTwoAmount(String((swapQuoteJSON.buyAmount / (10 ** tokenTwo.decimals)).toFixed(5)));
    
      return swapQuoteJSON;
  }

  async function trySwap(){
    const erc20abi= [{ "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }]
    console.log("trying swap");

    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return;
    }

    const web3 = new Web3(Web3.givenProvider);

    let accounts =   await window.ethereum.request({ method: "eth_requestAccounts" });
    let takerAddress = accounts[0];
    console.log("takerAddress: ", takerAddress);

    const swapQuoteJSON = await getQuote(takerAddress);

    const fromTokenAddress = tokenTwo?.address;
    const maxApproval = new BigNumber(2).pow(256).minus(1).toString(10);
    console.log("approval amount: ", maxApproval);
    const ERC20TokenContract = new web3.eth.Contract(erc20abi, fromTokenAddress);
    console.log("setup ERC20TokenContract: ", ERC20TokenContract);

    const tx = await ERC20TokenContract.methods.approve(
      swapQuoteJSON.allowanceTarget,
      maxApproval,
    ).send({ from: takerAddress });
    
    console.log("Transaction sent: ", tx);

    const receipt = await web3.eth.sendTransaction(swapQuoteJSON);
    console.log("receipt: ", receipt);
}
  

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch("https://tokens.coingecko.com/uniswap/all.json");
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await res.json();
            const tokens = data.tokens;
            console.log(tokens[0])
            setTokenList((prev)=>[...prev,...tokens.slice(0, 50)]);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
    
    return <>
    <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className="border-t border-[#363e54] mt-5 flex flex-col gap-2.5">
          {tokenList?.map((e, i) => {
            return (
              <div
                className="flex justify-start items-center pl-5 pt-2.5 pb-2.5 cursor-pointer"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.logoURI} alt={e.symbol} className="h-8 w-8" />
                <div className="tokenChoiceNames">
                  <div className="ml-2.5 text-base font-medium">{e.name}</div>
                  <div className="ml-2.5 text-sm font-light text-[#51596f]">{e.symbol}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>

    <div className="w-[500px] bg-[#0E111B] border-2 border-[#21273a] min-h-[400px] rounded-[15px] flex flex-col justify-start items-start pl-[30px] pr-[30px] mx-auto">
    <div className="flex justify-between items-center w-[98%] p-5 font-bold text-2xl">
      Swap
    </div>
    <div className="relative">
    <Input className="bg-[#1f2639] text-black border-0 h-[96px] mb-[5px] text-[35px] rounded-[12px]"
        placeholder="0"
        value={tokenOneAmount ?? ''} 
        onChange={TokenOneHandler}
        onBlur={getPrice}
          />
    <Input className="bg-[#1f2639] text-black border-0 h-[96px] mb-[5px] text-[35px] rounded-[12px]"
        placeholder="0"
        value={tokenTwoAmount ?? ''}
          />
     <div className="absolute top-[86px] left-[180px] flex items-center justify-center bg-[#3a4157] w-[25px] h-[25px] rounded-[8px] text-[#5F6783] border-[3px] border-[#0E111B] text-[12px] transition duration-300 hover:text-white hover:cursor-pointer" onClick={switchTokens}>
            <ArrowDownOutlined/>
      </div>
    {tokenList.length === 0 ? (
        <div className="absolute min-w-[50px] h-[30px] bg-[#3a4157] top-[36px] right-[20px] rounded-full flex justify-start items-center gap-5 font-bold text-white text-[17px] pr-[8px] pl-2 cursor-pointer">
          Loading
        </div>
      ) : (
        <>
          {tokenOne === null ? (
            <div
              className="absolute min-w-[50px] h-[30px] bg-[#3a4157] top-[36px] right-[20px] rounded-full flex justify-start items-center gap-5 font-bold text-white text-[17px] pr-[8px] pl-2 cursor-pointer"
              onClick={() => openModal(1)}
            >
              Select
              <DownOutlined />
            </div>
          ) : (
            <div
              className="absolute min-w-[50px] h-[30px] bg-[#3a4157] top-[36px] right-[20px] rounded-full flex justify-start items-center gap-5 font-bold text-white text-[17px] pr-[8px] cursor-pointer"
              onClick={() => openModal(1)}
            >
              <img src={tokenOne.logoURI} alt="assetOneLogo" className="h-[22px] ml-[5px]" />
              {tokenOne.symbol}
              <DownOutlined />
            </div>
          )}

          {tokenTwo === null ? (
            <div
              className="absolute min-w-[50px] h-[30px] bg-[#3a4157] top-[135px] right-[20px] rounded-full flex justify-start items-center gap-5 font-bold text-white text-[17px] pr-[8px] pl-2 cursor-pointer"
              onClick={() => openModal(2)}
            >
              Select
              <DownOutlined />
            </div>
          ) : (
            <div
              className="absolute min-w-[50px] h-[30px] bg-[#3a4157] top-[135px] right-[20px] rounded-full flex justify-start items-center gap-5 font-bold text-white text-[17px] pr-[8px] cursor-pointer"
              onClick={() => openModal(2)}
            >
              <img src={tokenTwo.logoURI} alt="assetTwoLogo" className="h-[22px] ml-[5px]" />
              {tokenTwo.symbol}
              <DownOutlined />
            </div>
          )}
        </>
      )}
    </div>
    <div className={`swapButton ${!(tokenOneAmount && tokenOne && tokenTwo) ? 'disabled' : ''}`} onClick={getPrice}>Get price</div>
    <div className={`swapButton ${!(tokenOneAmount && tokenOne && tokenTwo) ? 'disabled' : ''}`} onClick={trySwap}>Swap</div>
  </div>
    </>
  
}