import http.client
import json
import jwt
import ssl
import sys

with open('verifier-params.json') as reader:
    params_data = reader.read()
params = json.loads(params_data)
did = params['did']
vc_jwt = params['vc_jwt']
host_port = params['host_port']

conn = http.client.HTTPSConnection(host_port)

def get_verifier_challenge_url():
    verification_endpoint =  "/verifications"
    data = json.loads("""
    {
        "network": "ethereum",
        "subject": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        "chainId": 1337
    }
    """)
    headers = {'Content-type': 'application/json'}
    # print("====================Step 0: Challenge URL ====================")
    conn.request("POST", verification_endpoint, json.dumps(data), headers)
    res = conn.getresponse()
    if res.status >= 300:
        print("Failed to get CredentialOffer 1", res.status, res.reason)
        sys.exit(1)
    res_data = res.read().decode('utf-8')
    credential_application = json.loads(res_data)
    challenge_url = credential_application['challengeTokenUrl']
    # print("challeng_url: " + challenge_url)
    return challenge_url

def get_verifier_offer(challenge_url):
    # print("======================= Step 1:Verification offer ====================")
    conn.request("GET", challenge_url)
    res = conn.getresponse()
    if res.status >= 300:
        print("Failed to get Credential verification 2", res.status, res.reason)
        sys.exit(1)
    res_data = res.read().decode('utf-8')
    verification_offer = json.loads(res_data)
    # print(json.dumps(verification_offer, indent=2))
    return verification_offer

def verify_credential(verication_offer):
    # Load Data to json string

    data = json.loads("""
    {
        "credential_fulfillment": {
            "descriptor_map": [
                {
                    "format": "jwt_vc",
                    "id": "proofOfIdentifierControlVP",
                    "path": "$.presentation.credential[0]"
                }
            ],
            "id": "e921d5b2-5293-4297-a467-907f9d565e4e",
            "manifest_id": "KYCAMLAttestation"
        },
        "presentation_submission": {
            "id": "b68fda51-21aa-4cdf-84b7-d452b1c9c3cc",
            "descriptor_map": [
                {
                    "format": "jwt_vc",
                    "id": "kycaml_input",
                    "path": "$.verifiableCredential[0]"
                }
            ]
        },
        "vp": {
            "@context": [
                "https://www.w3.org/2018/credentials/v1"
            ],
            "type": [
                "VerifiablePresentation",
                "CredentialFulfillment"
            ]
        }
    }
    """)

    # set correct fields
    data['nonce'] = verification_offer['body']['challenge']
    data['presentation_submission']['definition_id'] = verification_offer['body']['presentation_definition']['id']
    data['sub'] = did
    data['iss'] = did
    data['vp']['verifiableCredential'] = [vc_jwt]
    data['vp']['holder'] = did

    # print("==================== vp ====================")
    # print(json.dumps(data, indent=2))

    # Read Private Key for wallet for the verifier
    with open('./wallet-private-key.pkcs1.pem') as reader:
        private_key = reader.read()

    headers = {'Content-type': 'text/plain'}

    # Convert data to JWT String
    jwt_string = jwt.encode(data, private_key, algorithm="ES256K")

    # print("======================= jwt_string ================")
    # print(jwt_string)

    # print("==================== Step 2: Get Verified ====================")
    
    conn.request("POST", verification_offer['reply_url'], jwt_string, headers)
    res = conn.getresponse()
    if res.status >= 300:
        print("Failed to do verification 3", res.status, res.reason)
        sys.exit(1)

    res_data = res.read().decode('utf-8')
    verification_confirmation = json.loads(res_data)

    # print(json.dumps(verification_confirmation, indent=2))

if __name__ == "__main__":
    challenge_url = get_verifier_challenge_url()
    verification_offer = get_verifier_offer(challenge_url)
    verify_credential(verification_offer)