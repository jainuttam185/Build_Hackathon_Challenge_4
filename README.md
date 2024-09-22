# Avengers NFT Marketplace

Welcome to our newly created **NFT Marketplace**, operating on the Sepolia testnet and built using the **KLT Blockchain**! This decentralized application (dApp) is designed to provide users with a seamless experience in the world of NFTs, with deep integration through **KLT Studio APIs**. We’ve deployed the smart contract via **KLT Studio**, ensuring a secure and scalable foundation for our marketplace, utilizing the **ERC721 standard** for unique non-fungible tokens.

## Core Features

Our marketplace revolves around the **buying and selling of NFTs**, with a unique twist: the price of each NFT dynamically adjusts based on demand. This dynamic pricing model creates an evolving and engaging marketplace, where the value of an NFT fluctuates based on its popularity.

The theme of the marketplace is centered around **Avengers NFTs**, allowing users to collect iconic heroes and items.

### Key Features

- **Dynamic Pricing**: NFT prices adjust based on demand.
- **ERC721 Standard**: Ensures uniqueness and transferability of NFTs.
- **Avengers Theme**: Collect and trade your favorite Avengers NFTs.

## User Journey

### 1. Browsing NFTs

When users visit the marketplace, they are presented with a selection of available NFTs through a user-friendly interface. We’ve implemented a **pagination feature** to make it easy to explore the collection without overwhelming the user.

### 2. Buying an NFT

When a user selects an NFT, they can purchase it by clicking the **"Buy NFT"** button, submitting their wallet address, and confirming the transaction. This is processed on the **Sepolia testnet**, and the NFT is transferred to the user's **Kalp Studio wallet**. After a purchase, the NFT's price increases due to higher demand.

### 3. Selling an NFT

Users who own NFTs can sell them back to the marketplace by clicking the **"Sell"** button. Once confirmed, the marketplace handles the transaction, and proceeds are transferred to the user's **Kalp Studio wallet**.

## Dynamic Pricing Model

Our **dynamic pricing model** ensures that NFT prices reflect real-time demand. For example, if **User1** buys an NFT, **User2** will have to pay a higher price for the same NFT due to increased demand. This allows **User1** to potentially sell the NFT at a profit, fostering a vibrant marketplace where prices fluctuate based on interest and activity.

## Technical Aspects

### Smart Contract Deployment

The smart contract powering the marketplace is deployed using **Kalp Studio**, following the **ERC721 standard** to guarantee each NFT's uniqueness and transferability.

### API Integration

The frontend and backend are seamlessly connected using **KLT Studio APIs**, ensuring smooth interactions between users and the blockchain for fast and secure NFT transactions.

## Run this project on local machine

#### Before you begin, ensure you have the following:

- **Install Node.js and npm**

  - [Download Node.js and npm](https://nodejs.org/en/download/)
  - Ensure you have **Node.js** version `>=14.x` and **npm** version `>=6.x`.

  **To start the project, follow these steps:**

  1. **Clone the repository:**

  ```sh
  git clone https://github.com/jainuttam185/Build_Hackathon_Challenge_4.git
  ```

2. **Navigate to the frontend directory:**

   ```sh
   cd Build_Hackathon_Challenge_4/frontend
   ```

3. **Install the dependencies:**

   ```sh
   npm install
   ```

4. **Create a .env.local file in frontend directory**

   - Add your API key to the `.env.local` file:

     ```env
     NEXT_PUBLIC_API_KEY=your-kalp-api-key
     ```

   - **Note:** Prefixing the variable with `NEXT_PUBLIC_` makes it accessible in the browser.

## Running the Frontend Application

Now that you've configured your API key, you're ready to run the application.

### Steps:

1. **Start the Development Server:**

   ```sh
   npm run dev
   ```

2. **Open the Application in Your Browser:**

   - Navigate to `http://localhost:3000` in your web browser.

3. **Interact with the Application:**

   - Use the interface to buy and sell NFTs.
   - The application will communicate with deployed smart contracts via the configured API endpoints.

## Final Thoughts

Participating in the hackathon was a rewarding experience. Although we encountered challenges, the support from the **Discord team** was exceptional, helping us overcome obstacles smoothly. We’re excited to see users engage with the marketplace and experience its unique features!

## Summary

This NFT marketplace offers:

- **A dynamic, user-friendly experience**.
- **Unique pricing model** driven by demand.
- **Secure and scalable** deployment via KLT Studio APIs and smart contracts.
