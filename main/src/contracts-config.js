export const PROFILE_DETAIL_ADDRESS = '0xc5d8BefBaA9613a0f6D45920Dca3Ee76F9f772F6'
export const PROFILE_DETAIL2_ADDRESS = '0x477Db7A4B2221F59d4AF523e918f018e8Aef3aef'
export const PROFILE_DETAIL3_ADDRESS = '0x504752d5cf8f46B06F9B1ec26F8E6F1D3fe49bE8'
export const PROFILE_DETAIL4_ADDRESS = '0xB7D47b9Cfd2c1B0140bDED3f14Ce146de37C6A3C'
export const PROFILE_DETAIL5_ADDRESS = '0xba0bebBc73B162bAbf1ff99232c9b6c671763EdD'
export const PROFILE_DETAIL6_ADDRESS = '0x554Ec0fd123b1aAB108699D3FD3cFa6841376B0f'
export const PROFILE_DETAIL7_ADDRESS = '0x8b5bbaB5DA49296a909129b93b64cf0bEd22bCAb'
export const PROFILE_DETAIL8_ADDRESS = '0x1aDDf6ea59A16F3e23bF9dec26d4EbA01E345474'
export const PROFILE_DETAIL9_ADDRESS = '0x2CCaBF7Ba6a9164793b0FF4C91B6dc213960ce4C'
export const PROFILE_DETAIL10_ADDRESS = '0x38F9990011ba263BB4CcAAd968cc0b3D186a0682'

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
                "name": "toPerson",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "personType",
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
                "internalType": "string",
                "name": "personType",
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
                "internalType": "string",
                "name": "personType",
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
                "internalType": "string",
                "name": "personType",
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
                "internalType": "string",
                "name": "_personType",
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
                "name": "_toPerson",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_personType",
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