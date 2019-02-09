# noisecoin
NoiseCoin Demo

Requirements:
Node JS
NPM
ganache-cli or other Ethereum network or test environment
Remix ide (https://remix.ethereum.org/)

Token:
1) Launch an Ethereum network, a test or private networok such as ganache-cli is fine.
2) Import NoiseCoin.sol into Remix which is an online Ethereum IDE.
3) Deploy the token on the network in 1) using the NoiseCoin.Sol source file. Note that the network must run on https://localhost:8485. 
4)Save the token address from Remix.
5)Change line 10 of index.js to use the new token address

To launch this demo.
Web App:
1) clone this repository
2) Use npm install to install all the dependencies
3) Run node index.js to start the server running and launch the application to  localhost port 3000.



