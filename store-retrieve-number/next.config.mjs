/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CONTRACT_ADDRESS: "0xc842A1fBf65cD31b45bdF0111292f0e4E681a505",
    ABI: [
	{
		"inputs": [],
		"name": "readNum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "storedNum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "writeNum",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
  }
};

export default nextConfig;
