from flask import Flask, request, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_marshmallow import Marshmallow
from werkzeug.utils import secure_filename
import requests
import json
import sys
import jwt
import http.client

api = Flask(__name__)
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# Initialize database
db = SQLAlchemy(api)
ma = Marshmallow(api)


class Entity(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(50), nullable=False)
    # Either Customer or Business
    type = db.Column(db.String(20), nullable=False)
    smart_contract = db.Column(db.String(200), nullable=True)
    total_score = db.Column(db.Integer, nullable=False)
    date_created = db.Column(
        db.DateTime, default=datetime.utcnow(), nullable=True)
    about = db.Column(db.Text, nullable=True)

    def __init__(self, name, email, password, type, smart_contract, total_score, about):
        self.name = name
        self.email = email
        self.password = password
        self.type = type
        self.smart_contract = smart_contract
        self.total_score = total_score
        self.about = about

    def __repr__(self):
        return '<Entity %r>' % self.id


class EntitySchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "email", "password",
                        "type", "smart_contract", "total_score", "date_created", "about")


class EntityProfilePic(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False)
    img = db.Column(db.Text, nullable=False)
    img_type = db.Column(db.Text, nullable=False)

    def __init__(self, img, name, img_type):
        self.name = name
        self.img = img
        self.img_type = img_type

    def __repr__(self):
        return '<EntityProfilePic %r>' % self.id


class EntityProfilePicSchema(ma.Schema):
    class Meta:
        fields = ("id", "img", "name", "img_type")


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(25), nullable=False)
    business_id = db.Column(
        db.Integer, db.ForeignKey('entity.id'), nullable=False)
    about = db.Column(db.Text)
    price = db.Column(db.Numeric(scale=2))

    def __init__(self, name, business_id, about='', price=None):
        self.name = name
        self.business_id = business_id
        self.about = about
        self.price = price

    def __repr__(self):
        return '<Name %r>' % self.id


class ProductSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "business_id",
                  "about", "price")


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    score = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text)
    from_entity_id = db.Column(
        db.Integer, db.ForeignKey('entity.id'), nullable=False)
    to_entity_id = db.Column(
        db.Integer, db.ForeignKey('entity.id'), nullable=False)

    def __init__(self, score, from_entity_id, to_entity_id, content=''):
        self.score = score
        self.content = content
        self.from_entity_id = from_entity_id
        self.to_entity_id = to_entity_id

    def __repr__(self):
        return '<Name %r>' % self.id


class ReviewSchema(ma.Schema):
    class Meta:
        fields = ("id", "score", "content", "from_entity_id",
                        "to_entity_id")


class PendingSmartContractRequest(db.Model):
    email = db.Column(db.String(50), primary_key=True)
    status = db.Column(db.Text, nullable=False)

    def __init__(self, email, status):
        self.email = email
        self.status = status

    def __repr__(self):
        return '<PendingSmartContractRequest %r>' % self.email


class PendingSmartContractRequestSchema(ma.Schema):
    class Meta:
        fields = ("email", "status")


@api.before_first_request
def create_tables():
    db.create_all()


def modify_table():
    # db.session.execute(
    #     "ALTER TABLE entity add column profile_img_data LargeBinary")
    db.session.execute(
        "ALTER TABLE entity drop column profile_img_data")


@api.route('/api/db_get_all/', methods=["GET"])
def query_all():
    table = request.args.get('table', None)

    if table.lower() == 'entity':
        get_entities = Entity.query.all()
        entities = EntitySchema(many=True).dump(get_entities)
        return jsonify(entities)

    elif table.lower() == 'product':
        get_products = Product.query.all()
        products = ProductSchema(many=True).dump(get_products)
        return jsonify(products)

    elif table.lower() == 'review':
        get_reviews = Review.query.all()
        reviews = ReviewSchema(many=True).dump(get_reviews)
        return jsonify(reviews)

    elif table.lower() == 'pendingsmartcontractrequest':
        get_pendingsmartcontractrequests = PendingSmartContractRequest.query.all()
        pendingsmartcontractrequests = PendingSmartContractRequestSchema(
            many=True).dump(get_pendingsmartcontractrequests)
        return jsonify(pendingsmartcontractrequests)
    else:
        return "ERROR: invalid table name"


@api.route('/api/db_get/', methods=["GET"])
def get_record():
    table = request.args.get('table', None)
    if table.lower() == 'entity':
        id = request.args.get('id', None)
        get_entity = Entity.query.get(id)
        entity = EntitySchema().dump(get_entity)
        return jsonify(entity)

    elif table.lower() == 'product':
        id = request.args.get('id', None)
        get_product = Product.query.get(id)
        product = EntitySchema().dump(get_product)
        return jsonify(product)

    elif table.lower() == 'review':
        id = request.args.get('id', None)
        get_review = Review.query.get(id)
        review = ReviewSchema().dump(get_review)
        return jsonify(review)

    elif table.lower() == 'pendingsmartcontractrequest':
        email = request.args.get('email', None)
        get_pendingsmartcontractrequest = PendingSmartContractRequest.query.get(
            email)
        pendingsmartcontractrequest = PendingSmartContractRequestSchema().dump(
            get_pendingsmartcontractrequest)
        return jsonify(pendingsmartcontractrequest)

    else:
        return "ERROR: invalid table name or id"


@api.route('/api/db_create/', methods=["POST"])
def create_record():
    table = request.args.get('table', None)
    if table.lower() == 'entity':
        name = request.args.get('name', None)
        email = request.args.get('email', None)
        password = request.args.get('password', None)
        type = request.args.get('type', None)
        smart_contract = request.args.get('smart_contract', None)
        total_score = request.args.get('total_score', None)
        about = request.args.get('about', None)
        entity = Entity(name, email, password, type,
                        smart_contract, total_score, about)

        db.session.add(entity)
        db.session.commit()

        return "Successfully added entity"

    elif table.lower() == 'entityprofilepic':

        entity_pic = EntityProfilePic('', '', '')

        db.session.add(entity_pic)
        db.session.commit()

        return "Successfully added profile pic record"

    elif table.lower() == 'product':
        name = request.args.get('name', None)
        business_id = request.args.get('business_id', None)
        about = request.args.get('about', None)
        price = request.args.get('price', None)

        product = Product(name, business_id, about, price)

        db.session.add(product)
        db.session.commit()

        return "Successfully added product"

    elif table.lower() == 'review':
        score = request.args.get('score', None)
        content = request.args.get('content', None)
        from_entity_id = request.args.get('from_entity_id', None)
        to_entity_id = request.args.get('to_entity_id', None)
        review = Review(score=score,
                        content=content,
                        from_entity_id=from_entity_id,
                        to_entity_id=to_entity_id)
        db.session.add(review)
        db.session.commit()
        return "Successfully added review"

    elif table.lower() == 'pendingsmartcontractrequest':
        email = request.args.get('email', None)
        status = 'Pending'
        pendingsmartcontractrequest = PendingSmartContractRequest(email=email,
                                                                  status=status)
        db.session.add(pendingsmartcontractrequest)
        db.session.commit()
        return "Successfully added a smart contract request"

    else:
        return "ERROR: invalid table name"


@api.route('/api/db_edit/', methods=['POST'])
def edit_record():
    table = request.args.get('table')
    id = request.args.get('id')
    record = None
    if table.lower() == 'entity':
        record = Entity.query.get_or_404(id)
        entity_fields = Entity.__table__.columns.keys()
        for key in request.args:
            if key in entity_fields:
                setattr(record, key, request.args[key])

        db.session.commit()
        return "Successfully updated Entity"

    elif table.lower() == 'product':
        record = Product.query.get_or_404(id)
        product_fields = Product.__table__.columns.keys()
        for key in request.args:
            if key in product_fields:
                setattr(record, key, request.args[key])

        db.session.commit()
        return "Successfully updated Product"

    elif table.lower() == 'review':
        record = Review.query.get_or_404(id)
        review_fields = Review.__table__.columns.keys()
        for key in request.args:
            if key in review_fields:
                setattr(record, key, request.args[key])

        db.session.commit()
        return "Successfully updated Review"

    else:
        return "ERROR: invalid table name"


@api.route('/api/db_edit_pic/', methods=['POST'])
def edit_profile_pic():
    id = request.args.get('id')
    record = EntityProfilePic.query.get_or_404(id)
    print("Hello")
    pic = request.files['pic']
    print(pic)
    if not pic:
        return 'No pic uploaded', 400

    name = secure_filename(pic.filename)
    img_type = pic.mimetype

    setattr(record, 'name', name)
    setattr(record, 'img', pic.read())
    setattr(record, 'img_type', img_type)

    db.session.commit()
    return "Successfully updated Profile Pic"


@api.route('/api/db_get_pic/', methods=['GET'])
def get_profile_pic():
    id = request.args.get('id')
    img = EntityProfilePic.query.filter_by(id=id).first()

    if not img:
        return 'No Profile Pic with this id', 404

    return Response(img.img, mimetype=img.img_type)


@api.route('/api/db_delete/', methods=['POST'])
def delete_record():
    table = request.args.get('table')
    id = request.args.get('id')
    record = None
    if table.lower() == 'entity':
        record = Entity.query.get(id)
        db.session.delete(record)
        db.session.commit()
        return "Successfully deleted Entity"

    elif table.lower() == 'product':
        record = Product.query.get(id)
        db.session.delete(record)
        db.session.commit()
        return "Successfully deleted Product"

    elif table.lower() == 'review':
        record = Review.query.get(id)
        db.session.delete(record)
        db.session.commit()
        return "Successfully deleted Review"

    elif table.lower() == 'entityprofilepic':
        record = EntityProfilePic.query.get(id)
        db.session.delete(record)
        db.session.commit()
        return "Successfully deleted Review"

    else:
        return "ERROR: invalid table name"


@api.route('/api/db_create_entity_manual/', methods=["POST"])
def create_record_entity_manual():
    name = request.args.get('name', None)
    email = request.args.get('email', None)
    password = request.args.get('password', None)
    type = request.args.get('type', None)
    smart_contract = request.args.get('smart_contract', None)
    total_score = request.args.get('total_score', None)
    entity = Entity(name=name,
                    email=email,
                    password=password,
                    type=type,
                    smart_contract=smart_contract,
                    total_score=total_score,
                    about='')
    # try:
    db.session.add(entity)
    db.session.commit()
    return "Successfully Added an Entity Manually"
    # except:
    # return "Error Adding Entity"


@api.route('/api/db_create_product_manual/', methods=["POST"])
def create_record_product_manual():

    name = request.args.get('name', None)
    business_id = request.args.get('business_id', None)
    product = Product(name=name,
                      business_id=business_id)

    db.session.add(product)
    db.session.commit()
    return "Successfully Added an Product Manually"


@api.route('/api/db_create_review_manual/', methods=["POST"])
def create_record_review_manual():
    score = request.args.get('score', None)
    content = request.args.get('content', None)
    from_entity_id = request.args.get('from_entity_id', None)
    to_entity_id = request.args.get('to_entity_id', None)
    review = Review(score=score,
                    content=content,
                    from_entity_id=from_entity_id,
                    to_entity_id=to_entity_id)
    db.session.add(review)
    db.session.commit()
    return "Successfully Added an Review Manually"


@api.route('/api/db_get_by_email/', methods=["GET"])
def get_current_id_by_email():
    email = request.args.get('email', None)
    entity = db.session.execute(
        "SELECT * FROM entity where email = '" + email + "'")
    entities = [row[0] for row in entity]
    return str(entities)


@api.route('/api/db_count_review/', methods=["GET"])
def get_count_review():
    id = request.args.get('id', None)
    count_review = db.session.execute(
        "SELECT COUNT(*) FROM review where to_entity_id =" + id)
    count_reviews = [row[0] for row in count_review]
    return str(count_reviews)


@api.route('/api/db_get_pending_reviews/', methods=["GET"])
def get_pending_reviews():
    to_entity_id = request.args.get('to_entity_id', None)
    review = db.session.execute(
        "SELECT * FROM review where to_entity_id =" + to_entity_id)
    reviews = ReviewSchema(many=True).dump(review)
    return jsonify(reviews)


@api.route('/api/db_get_entity_by_name/', methods=["GET"])
def get_entity_by_name():
    name = request.args.get('name', None)
    get_entity = db.session.execute(
        "SELECT * FROM entity where name ='" + name + "'")
    entity = EntitySchema(many=True).dump(get_entity)
    return jsonify(entity)


@api.route('/api/db_get_businesses/', methods=["GET"])
def get_businesses():
    get_entities = db.session.execute(
        "SELECT * FROM entity where type='Business'")
    entities = EntitySchema(many=True).dump(get_entities)
    return jsonify(entities)


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
    # create_tables()
    # modify_table()

    api.run()
