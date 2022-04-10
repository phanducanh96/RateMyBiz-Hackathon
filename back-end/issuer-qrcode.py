import requests

def api_qr_call():
    url = "http://issuer-sandbox.circle.com/api/v1/issuance/qrcode"
    response = requests.get(url)
    if response.status_code == 200:
        print("Issuer Verified!")
        with open("qr-code.png", 'wb') as f:
            f.write(response.content)

if __name__ == "__main__":
    api_qr_call()