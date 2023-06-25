# Blockchain-SupplyChain

## Discription

To get started get a copy of the project and set it up on your local machine for development and testing purposes. Check out deployment for instructions on how to deploy your project on remix using the Sepolia test network.

This project will require Solidity v0.4.24 and truffle v4.1.14. See environments below for instructions to install the correct version.

## Installation

Start off with cloning this repository.

```sh
git clone https://github.com/udacity/nd1309-Project-6b-Example-Template
```

Navigate into project-6 directory and install npm packages

```sh
cd project-6
npm install
```

## Environment

You will need to install the correct version of truffle.
```sh
npm i -g truffle@4.1.14
```

## Library
Next you will need to install the ganache-cli in order to test on your local network.
```sh
Npm i ganache-cli
```
Make sure you have your metamask extenstion added to your browser which can be found at
```sh
 metamask.io
 ```

## Launch Ganache:

In your terminal under your project-6 folder, launch ganache-cli.
```sh
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```
Your terminal window should look simular to this:

![alt text](https://github.com/PDot5/Blockchain-SupplyChain/blob/main/SupplyChain/img/LaunchGanache.png)

In a separate terminal window you will need to compile your smart contracts:
```sh
truffle compile
```
![alt text](https://github.com/PDot5/Blockchain-SupplyChain/blob/main/SupplyChain/img/Compile.png)

Once that is completed you will need to migrate your contracts
```sh
truffle compile
```

![alt text](https://github.com/PDot5/Blockchain-SupplyChain/blob/main/SupplyChain/img/Migrate.png)

Next you will need to test your functions
```sh
truffle test
```

![alt text](https://github.com/PDot5/Blockchain-SupplyChain/blob/main/SupplyChain/img/Test.png)

Lastly, run the below command to launch in your browser
```sh
npm run dev
```

![alt text](https://github.com/PDot5/Blockchain-SupplyChain/blob/main/SupplyChain/img/Product%20Overview.png)
![alt text](https://github.com/PDot5/Blockchain-SupplyChain/blob/main/SupplyChain/img/Farm%20Details.png)
![alt text](https://github.com/PDot5/Blockchain-SupplyChain/blob/main/SupplyChain/img/Product%20Details.png)

## Test Network:

This project was tested on the Sepolia network.
Navigate to
```sh
https://app.infura.io/
```
Create you account and select API keys - New
Under Endpoints / Ethereum, select your test network, i.e. Sepolia
Copy the Web3 API Key and in your config file. 

Sepolia Network

Add the Sepolia Network to your metamask and navigate to
```sh
https://sepoliafaucet.com/
```
Using your metamask account, request ETH for gas fees which will be needed to deploy your smart contract.

In your browser navigate to
```sh
https://remix.ethereum.org/
```
You will upload your files to Remix and choose the correct compiler version that matches your smart contract.
Now compile your contract and deploy.

![alt text](https://github.com/PDot5/Blockchain-SupplyChain/blob/main/SupplyChain/img/Deploy_on_Remix.png)

confirm the gas fees
Then you should see the completion of the deployment
![alt text](https://github.com/PDot5/Blockchain-SupplyChain/blob/main/SupplyChain/img/DeploymentSuccess.png)

You will then navigate to your contract on the Sepolia Test Network and confirm your successful deployment.

![alt text](https://github.com/PDot5/Blockchain-SupplyChain/blob/main/SupplyChain/img/SepoliaContract.png)

## Built with

* Ethereum - Ethereum is a decentralized platform that runs smart contracts
* Truffle Framework - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.
* Infura - The Infura API suite provides instant access over HTTPS and WebSockets to the Ethereum and IPFS networks

## Acknowledgmennts

* Solidity
* Ganache-cli
* Truffle
* Infura
