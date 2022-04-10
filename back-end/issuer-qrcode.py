import requests
from pyzbar import pyzbar
from PIL import Image

def api_qr_call():
    url = "http://issuer-sandbox.circle.com/api/v1/issuance/qrcode"
    response = requests.get(url)
    if response.status_code == 200:
        print("Issuer Verified!")
        with open("back-end/qr-code.png", 'wb') as f:
            f.write(response.content)

def read_qr_code():
    img = Image.open("back-end/qr-code.png")
    output = pyzbar.decode(img)
    print(output)

if __name__ == "__main__":
    api_qr_call()
    read_qr_code()