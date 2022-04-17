export const PROFILE_DETAIL_ADDRESS = '0x2Ad8CF7E50e2eEE343E82E5649A2AecE6C151Cd5'

export const PROFILE_DETAIL_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_ownerAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "content",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "fromPerson",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "personId",
                "type": "uint256"
            }
        ],
        "name": "ReviewCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "content",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "fromPerson",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "personId",
                "type": "uint256"
            }
        ],
        "name": "ReviewReceivedCreated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "displayScore",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "ownerAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "receivedReviews",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "fromPerson",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "personId",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "reviewGivenCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "reviewGivens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "toPerson",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "personId",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "reviewReceivedCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "totalScore",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_score",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_content",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_fromPerson",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_personId",
                "type": "uint256"
            }
        ],
        "name": "createReviewReceived",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_score",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_content",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_fromPerson",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_personId",
                "type": "uint256"
            }
        ],
        "name": "createReview",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]