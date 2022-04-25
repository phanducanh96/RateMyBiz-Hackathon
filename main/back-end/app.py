from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_marshmallow import Marshmallow
import imageio as iio
import io
import requests
from pyzbar import pyzbar
from PIL import Image
import json
import sys
import jwt
import http.client

from Verite.Issuer import issuer_qrcode

api = Flask(__name__)
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
api.config['SQLALCHEMY_TRACK_MODIFICAITONS'] = False
# Initialize database and serilization
db = SQLAlchemy(api)
ma = Marshmallow(api)

class Customer(db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	first_name = db.Column(db.String(25), nullable=False)
	last_name = db.Column(db.String(25), nullable=False)
	email = db.Column(db.String(50), nullable=False, unique=True)
	password = db.Column(db.String(50), nullable=False)
	smart_contract = db.Column(db.String(200), unique=True)
	date_created = db.Column(db.DateTime, default=datetime.utcnow())
	profile_pic = db.Column(db.LargeBinary)
	about = db.Column(db.Text)

	def __init__(self, fn, ln, email, passw):
		self.first_name = fn
		self.last_name = ln
		self.email = email
		self.password = passw

	def __repr__(self):
		return '<Name %r>' % self.id

class Business(db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	name = db.Column(db.String(25), nullable=False)
	email = db.Column(db.String(50), nullable=False)
	password = db.Column(db.String(50), nullable=False)
	smart_contract = db.Column(db.String(200), unique=True)
	image = db.Column(db.LargeBinary)
	about = db.Column(db.Text)

	def __init__(self, name, email, passw):
		self.name = name
		self.email = email
		self.password = passw

	def __repr__(self):
		return '<Name %r>' % self.id

class Product(db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	name = db.Column(db.String(25), nullable=False)
	businessId = db.Column(db.Integer, db.ForeignKey('business.id'), nullable=False)
	image = db.Column(db.LargeBinary)
	about = db.Column(db.Text)
	price = db.Column(db.Numeric(scale=2))

	def __init__(self, name, businessId):
		self.name = name
		self.businessId = businessId

	def __repr__(self):
		return '<Name %r>' % self.id

@api.route('/get', methods=["GET"])
def my_profile():
	response_body = {
		"name": "Nagato",
		"about" :"Hello! I'm a full stack developer that loves python and javascript"
	}

	return response_body

@api.route('/api/get_qr_code', methods=["GET"])
def api_get_qr():
    url = "http://issuer-sandbox.circle.com/api/v1/issuance/qrcode"
    response = requests.get(url)
    if response.status_code == 200:
        return response.content
    else:
        print("Failed for QR Code")

@api.route('/api/read_qr_code/<path:srcQrImg>', methods=["GET"])
def read_qr(srcQrImg):
	# print(srcQrImg)
	# img = Image.open(srcQrImg)
	# output = pyzbar.decode(img)
	# qr_data = str(output[0].data).lstrip("b'").rstrip("'")
	# qr_data = json.loads(qr_data)
	# print(qr_data["challengeTokenUrl"])
	# return qr_data["challengeTokenUrl"]
	return srcQrImg

@api.route('/api/issuer/', methods=["GET"])
def get_issuer_credential():
	#Get Challange Token for Issuer
	url = "http://issuer-sandbox.circle.com/api/v1/issuance/challenge"
	response = requests.get(url)
	if response.status_code == 200:
		print("Challenge Token Received!")
		challenge_token = json.loads(response.content)
	else:
		print("Failed to receive Challenge Token")
		sys.exit(1)

	#Get Issuer Credential JWT String
	response = requests.get(challenge_token["challengeTokenUrl"])
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

	headers = {'Content-type': 'text/plain'}
	response = requests.post(reply_url, headers=headers, data=jwt_string)
	if response.status_code != 200:
		print("Failed to post JWT String", response.status, response.reason)
		sys.exit(1)
	jwt_string = response.content.decode("utf-8")

	#Decode JWT String and Generate a Public JWT
	public_key_file = './issuer-public-key.pem'
	with open(public_key_file) as f:
		public_key = f.read()
	decoded_payload = jwt.decode(jwt_string, public_key, algorithms=["ES256K"])
	vc_jwt_string = decoded_payload['vp']['verifiableCredential'][0]
	return vc_jwt_string

@api.route('/api/issuer/<params_data>', methods=["GET"])
def get_verified(params_data):
	#Reading Param from User
	params = json.loads(params_data)
	did = params['did']
	vc_jwt = params['vc_jwt']
	host_port = params['host_port']

	#Get Challenge URL from Verifier
	verification_endpoint =  "/verifications"
	conn = http.client.HTTPSConnection(host_port)
	data = json.loads("""
	{
   		"network": "ethereum",
   		"subject": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
   		"chainId": 1337
	}
	""")
	headers = {'Content-type': 'application/json'}
	conn.request("POST", verification_endpoint, json.dumps(data), headers)
	res = conn.getresponse()
	if res.status >= 300:
		print("Failed to get Challenge URL from Verifier", res.status, res.reason)
		sys.exit(1)
	res_data = res.read().decode('utf-8')
	credential_application = json.loads(res_data)
	challenge_url = credential_application['challengeTokenUrl']

	#Get Credential Offer from Verifier
	conn.request("GET", challenge_url)
	res = conn.getresponse()
	if res.status >= 300:
		print("Failed to get Credential Verification from Verifier", res.status, res.reason)
		sys.exit(1)
	res_data = res.read().decode('utf-8')
	verification_offer = json.loads(res_data)
	print(json.dumps(verification_offer, indent=2))
	
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

	# Set correct fields from user's param
	data['nonce'] = verification_offer['body']['challenge']
	data['presentation_submission']['definition_id'] = verification_offer['body']['presentation_definition']['id']
	data['sub'] = did
	data['iss'] = did
	data['vp']['verifiableCredential'] = [vc_jwt]
	data['vp']['holder'] = did

	with open('./wallet-private-key.pkcs1.pem') as reader:
		private_key = reader.read()

	headers = {'Content-type': 'text/plain'}
	jwt_string = jwt.encode(data, private_key, algorithm="ES256K")

	conn.request("POST", verification_offer['reply_url'], jwt_string, headers)
	res = conn.getresponse()
	if res.status >= 300:
		print("Failed to Verified the Credential", res.status, res.reason)
		sys.exit(1)

	res_data = res.read().decode('utf-8')
	verification_confirmation = json.loads(res_data)
	print(json.dumps(verification_confirmation, indent=2))
	
	return verification_confirmation

if __name__ == '__main__':
	api.run()
	
