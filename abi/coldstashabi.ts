export default [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_coldWallet",
				"type": "address"
			}
		],
		"name": "addColdWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "coldWallet",
				"type": "address"
			}
		],
		"name": "ColdWalletAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "coldWallet",
				"type": "address"
			}
		],
		"name": "ColdWalletRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldColdWallet",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newColdWallet",
				"type": "address"
			}
		],
		"name": "ColdWalletUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "removeColdWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newColdWallet",
				"type": "address"
			}
		],
		"name": "updateColdWallet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getColdWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]