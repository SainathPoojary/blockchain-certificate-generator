# Blockchain Certificate Generator

Blockchain Certificate Generator is a web application that allows users to create and verify certificates on the Ethereum blockchain.

## Pre-requisites

- [Node.js](https://nodejs.org/en/download/)
- [Ganache](https://www.trufflesuite.com/ganache)
- [MongoDB](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

## How to setup a project

### 1. Clone the repository

```bash
git clone https://github.com/SainathPoojary/blockchain-certificate-generator.git
```

### 2. Change directory

```bash
cd blockchain-certificate-generator
```

### 3. Install dependencies

```bash
npm install
```

### 4. Compile and deploy smart contracts

```bash
npm run contract
```

> Note: Make sure you have Ganache running on port 7545

### 5. Create a .env file

```bash
touch server/.env
```

### 6. Add the following to the .env file

```bash
MONGODB_URL=<YOUR_MONGODB_URL>
PORT=<YOUR_PORT>
SECRET_KEY=<YOUR_SECRET_KEY>
```

### 5. Run the project

```bash
npm run dev
```

## Preview

[![preview](https://github.com/SainathPoojary/blockchain-certificate-generator/assets/53347682/0e8ab7bf-ecd6-4c29-841d-0fa5afa10d9f)](https://youtu.be/i7EffvY1pNs)

> You can find the preview video [here](https://youtu.be/i7EffvY1pNs)
