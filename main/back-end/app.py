from ssl import enum_certificates
from flask import Flask, redirect, render_template, request, url_for
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

api = Flask(__name__)
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# Initialize database
db = SQLAlchemy(api)


class Entity(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(50), nullable=False)
    # Either Customer or Business
    type = db.Column(db.String(20), nullable=False)
    smart_contract = db.Column(db.String(200), unique=True)
    date_created = db.Column(
        db.DateTime, default=datetime.utcnow(), nullable=True)
    about = db.Column(db.Text, nullable=True)

    def __init__(self, name, email, password, type, smart_contract, about):
        self.name = name
        self.email = email
        self.password = password
        self.type = type
        self.smart_contract = smart_contract
        self.about = about

    def __repr__(self):
        return '<Entity %r>' % self.id


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(25), nullable=False)
    businessId = db.Column(
        db.Integer, db.ForeignKey('person.id'))
    image = db.Column(db.LargeBinary)
    about = db.Column(db.Text)
    price = db.Column(db.Numeric(scale=2))

    def __init__(self, name, businessId):
        self.name = name
        self.businessId = businessId

    def __repr__(self):
        return '<Name %r>' % self.id


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    score = db.Column(db.Integer)
    content = db.Column(db.Text)
    fromEntityId = db.Column(
        db.Integer, db.ForeignKey('entity.id'))
    toEntityId = db.Column(
        db.Integer, db.ForeignKey('entity.id'))

    def __init__(self, score, entity, content=''):
        self.score = score
        self.content = content
        self.id = entity

    def __repr__(self):
        return '<Name %r>' % self.id


@api.before_first_request
def create_tables():
    db.create_all()


@api.route('/api/db_get_all/', methods=["GET"])
def queryAll():
    table = request.args.get('table', None)
    if table.lower() == 'entity':
        entities = Entity.query.all()
        return entities
    elif table.lower() == 'product':
        products = Product.query.all()
        return products
    elif table.lower() == 'review':
        reviews = Review.query.all()
        return reviews
    else:
        return "ERROR: invalid table name"


@api.route('/api/db_get/', methods=["GET"])
def get_record():
    table = request.args.get('table', None)
    id = request.args.get('id', None)
    if table.lower() == 'entity':
        entity = Entity.query.get_or_404(int(id))
        return str(entity)
    elif table.lower() == 'product':
        product = Product.query.get_or_404(int(id))
        return product
    elif table.lower() == 'review':
        review = Review.query.get_or_404(int(id))
        return review
    else:
        return "ERROR: invalid table name or id"


@api.route('/api/db_create/', methods=["POST"])
def create_record_form():
    table = request.args.get('table', None)
    if request.method == 'POST':
        if table.lower() == 'entity':
            name = request.form['name']
            email = request.form['email']
            password = int(request.form['password'])
            type = request.form['type']
            entity = Entity(name=name,
                            email=email,
                            password=password,
                            type=type)
            db.session.add(entity)
            db.session.commit()

            return "Successfully Added an Entity"

        elif table.lower() == 'product':
            name = request.form['name']
            businessId = request.form['businessId']
            entity = Entity(name=name,
                            businessId=businessId)
            db.session.add(product)
            db.session.commit()

            return "Successfully Added an Product"

        elif table.lower() == 'review':
            score = request.form['name']
            content = request.form['businessId']
            entityId = request.form['entityId']
            product = product(score=score,
                              content=content,
                              entityId=entityId)
            db.session.add(product)
            db.session.commit()
            return "Successfully Added an Review"

        else:
            return "ERROR: invalid table name"


@api.route('/api/db_edit/', methods=['GET', 'POST'])
def edit_record_form():
    table = request.args.get('table', None)
    id = request.args.get('id', None)
    if request.method == "GET":
        record = None
        if table.lower() == 'entity':
            record = Entity.query.get_or_404(int(id))
        elif table.lower() == 'product':
            record = Product.query.get_or_404(id)
        elif table.lower() == 'review':
            record = Review.query.get_or_404(id)
        else:
            return 'ERROR: invalid table name or id'
        return str(record)

    if request.method == 'POST':
        if table.lower() == 'entity':
            name = request.form['name']
            email = request.form['email']
            password = int(request.form['password'])
            type = request.form['type']

            record.name = name
            record.email = email
            record.password = password
            record.type = type

            db.session.add(record)
            db.session.commit()

            return redirect(url_for('index'))

    elif table.lower() == 'product':
        name = request.form['name']
        businessId = request.form['businessId']

        record.name = name
        record.businessId = businessId

        db.session.add(record)
        db.session.commit()

        return redirect(url_for('index'))

    elif table.lower() == 'review':
        score = request.form['score']
        content = request.form['content']
        personId = request.form['personId']

        record.score = score
        record.content = content
        record.personId = personId

        db.session.add(record)
        db.session.commit()

        return redirect(url_for('index'))


@api.route('/api/db_create_man/', methods=["POST"])
def create_record_mannual():
    table = request.args.get('table', None)
    name = request.args.get('name', None)
    email = request.args.get('email', None)
    password = request.args.get('password', None)
    type = request.args.get('type', None)
    smart_contract = request.args.get('smart_contract', None)
    if request.method == 'POST':
        # return (table + " " + name + " " + email + " " + password + " " + type + " " + smart_contract)
        if table.lower() == 'entity':
            entity = Entity(name=name,
                            email=email,
                            password=password,
                            type=type,
                            smart_contract=smart_contract,
                            about='')
            # try:
            db.session.add(entity)
            db.session.commit()
            return "Successfully Added an Entity Mannually"
            # except:
            # return "Error Adding Entity"

        # elif table.lower() == 'product':
        # 	name = request.form['name']
        # 	businessId = request.form['businessId']
        # 	entity = Entity(name=name,
        # 					businessId=businessId)
        # 	db.session.add(product)
        # 	db.session.commit()

        # 	return "Successfully Added an Product Mannually"

        # elif table.lower() == 'review':
        # 	score = request.form['name']
        # 	content = request.form['businessId']
        # 	entityId = request.form['entityId']
        # 	product = product(score=score,
        # 					  content=content,
        # 					  entityId=entityId)
        # 	db.session.add(product)
        # 	db.session.commit()
        # 	return "Successfully Added an Review Mannually"

        else:
            return "ERROR: invalid table name"


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
    # Get Challange Token for Issuer
    url = "http://issuer-sandbox.circle.com/api/v1/issuance/challenge"
    response = requests.get(url)
    if response.status_code == 200:
        print("Challenge Token Received!")
        challenge_token = json.loads(response.content)
    else:
        print("Failed to receive Challenge Token")
        sys.exit(1)

    # Get Issuer Credential JWT String
    response = requests.get(challenge_token["challengeTokenUrl"])
    if response.status_code != 200:
        print("Failed to get CredentialOffer",
              response.status, response.reason)
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
    jwt_string = jwt.encode(credential_application,
                            challenge, algorithm="HS256")
    credential_application['vp']['verifiableCredential'] = [jwt_string]

    headers = {'Content-type': 'text/plain'}
    response = requests.post(reply_url, headers=headers, data=jwt_string)
    if response.status_code != 200:
        print("Failed to post JWT String", response.status, response.reason)
        sys.exit(1)
    jwt_string = response.content.decode("utf-8")

    # Decode JWT String and Generate a Public JWT
    public_key_file = './issuer-public-key.pem'
    with open(public_key_file) as f:
        public_key = f.read()
    decoded_payload = jwt.decode(jwt_string, public_key, algorithms=["ES256K"])
    vc_jwt_string = decoded_payload['vp']['verifiableCredential'][0]
    return vc_jwt_string


@api.route('/api/get_verified/<params_data>', methods=["GET"])
def get_verified(params_data):

    verifiers_data = json.loads("""
	{
    	"host_port": "verifier-sandbox.circle.com",
    	"did": "did:key:zQ3shv378PvkMuRrYMGFV9a3MtKpJkteqb2dUbQMEMvtWc2tE",
    	"vc_jwt": ""
	}
	""")
    verifiers_data["vc_jwt"] = params_data

    # Reading Param from User
    did = verifiers_data['did']
    vc_jwt = verifiers_data['vc_jwt']
    host_port = verifiers_data['host_port']

    # Get Challenge URL from Verifier
    verification_endpoint = "/verifications"
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

    # Get Credential Offer from Verifier
    conn.request("GET", challenge_url)
    res = conn.getresponse()
    if res.status >= 300:
        print("Failed to get Credential Verification from Verifier",
              res.status, res.reason)
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
    create_tables()
    api.run()
