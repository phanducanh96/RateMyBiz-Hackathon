import requests
from pyzbar import pyzbar
from PIL import Image
import json
import sys
import jwt
# from jwt.algorithms import RSAAlgorithm

def api_get_qr():
    url = "http://issuer-sandbox.circle.com/api/v1/issuance/qrcode"
    response = requests.get(url)
    if response.status_code == 200:
        print("Issuer Verified!")
        with open("qr-code.png", 'wb') as f:
            f.write(response.content)
    else:
        print("Failed for QR Code")

def read_qr_code():
    img = Image.open("qr-code.png")
    output = pyzbar.decode(img)
    qr_data = str(output[0].data).lstrip("b'").rstrip("'")
    qr_data = json.loads(qr_data)
    print(qr_data["challengeTokenUrl"])
    return qr_data["challengeTokenUrl"]

def api_get_issuer(url):
    response = requests.get(url)
    if response.status_code != 200:
        print("Failed to get CredentialOffer", response.status, response.reason)
        sys.exit(1)

    data = response.content.decode("utf-8")
    credential_offer = json.loads(data)

    # print("\n\n============= credential_offer ==========");
    # print(json.dumps(credential_offer, indent=2))

    challenge = credential_offer["body"]["challenge"]
    credential_application_id = credential_offer["id"]
    reply_url = credential_offer['reply_url']

    credential_application = json.loads("""
    {
        "sub": "did:key:zQ3shv378PvkMuRrYMGFV9a3MtKpJkteqb2dUbQMEMvtWc2tE",
        "iss": "did:key:zQ3shv378PvkMuRrYMGFV9a3MtKpJkteqb2dUbQMEMvtWc2tE",
        "credential_application": {
            "id": "2ce196be-fcda-4054-9eeb-8e4c5ef771e5",
            "manifest_id": "KYCAMLAttestation",
            "format": {
                "jwt_vp": {
                    "alg": ["ES256K"]
                }
            }
        },
        "presentation_submission": {
            "id": "b4f43310-1d6b-425d-84c6-f8afac3fe244",
            "definition_id": "ProofOfControlPresentationDefinition",
            "descriptor_map": [
                {
                    "id": "proofOfIdentifierControlVP",
                    "format": "jwt_vp",
                    "path": "$.presentation"
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
            ],
            "holder": "did:web:circle.com",
            "verifiableCredential": [
                "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9....7wwi-YRX"
            ]
        }
    }
    """)
    credential_application['credential_application']['id'] = credential_application_id
    jwt_string = jwt.encode(credential_application, challenge, algorithm="HS256")
    credential_application['vp']['verifiableCredential'] = [jwt_string]

    # print("\n\n============= jwt_string in credential_application ==========");
    # print(jwt_string)
    print("\n\n============= credential_application ==========");
    print(json.dumps(credential_application, indent=2))
    
    headers = {'Content-type': 'text/plain'}
    # conn.request('POST', reply_url, jwt_string, headers)
    response = requests.post(reply_url, headers=headers, data=jwt_string)
    if response.status_code != 200:
        print("Failed to post", response.status, response.reason)
        sys.exit(1)
    jwt_string = response.content.decode("utf-8")
    return jwt_string

    # print("\n\n============= response in jwt ==========");
    # print(jwt_string)

def public_key_gen(gwt_string):
    public_key_file = './issuer-public-key.pem'
    with open(public_key_file) as f:
        public_key = f.read()
    decoded_payload = jwt.decode(jwt_string, public_key, algorithms=["ES256K"])
    print("\n\n============= decoded jwt_string ==========");
    print(json.dumps(decoded_payload, indent=2))

    vc_jwt_string = decoded_payload['vp']['verifiableCredential'][0]
    print("\n\n============= vc_jwt_string ==========");
    print(vc_jwt_string)
    decoded_vc_jwt_string = jwt.decode(vc_jwt_string, public_key, algorithms=["ES256K"])
    print("\n\n============= decoded vc_jwt_string ==========");
    print(json.dumps(decoded_vc_jwt_string, indent=2))

if __name__ == "__main__":
    api_get_qr()
    url = read_qr_code()
    print(url)
    # jwt_string = api_get_issuer(url)
    # public_key_gen(jwt_string)
    