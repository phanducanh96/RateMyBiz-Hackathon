# RateMyBiz
---
## Project Description
A decentralized, democratic rating system for business integrity.

Ethically stored and secured personal/business information using the blockchain.

---
## Project Status
The project is currently heavily under development; therefore, it can be run in a local environment only.

---
## Installation Instructions
Technology used: **React JS**, **Python Flask**, **Solidity**, **Truffle**, **Ganache**, **SQLAlchemy**

Pre-Installation: `Node JS`, `Python 3`, `Solidity`, `Truffle`, `Local Ganache`

Open a terminal, cd to the project folder

```
cd main
npm install or yarn install
cd back-end
pip install -r requirements.txt
python -m venv env
```

Now, we need to setup Local Blockchain Network with `Ganache`. There is a `ganache-data` folder inside `main`. Please go to ganache local Workspace repo, create a folder `RateMyBiz` and paste the content in `ganache-data`. A local Ganache local Workspace can be located like this `C:\Users\phand\AppData\Roaming\Ganache\workspaces`. After that, run the Ganache project.

Since we initially used `Firebase` for Authentication Log In. In `main`, create a `.env.local` file, here is the content:

```
REACT_APP_FIREBASE_API_KEY=AIzaSyDVl0iKpF-Iqj89VtUoMShNkTeJ9ryNSEU
REACT_APP_FIREBASE_AUTH_DOMAIN=ratemybiz-development.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=ratemybiz-development
REACT_APP_FIREBASE_STORAGE_BUCKET=ratemybiz-development.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=296822200428
REACT_APP_FIREBASE_APP_ID=1:296822200428:web:b78bffb7ee1cf900242049
REACT_APP_FIREBASE_MEASUREMENT_ID=G-PQXM9Z1YZ1
REACT_APP_FIREBASE_DATABASE_URL=
```

After successfully installing everything and running all the above commands, `cd` back to `main` folder. We need 2 terminals; one for the back-end, and one for the front-end. Run `npm start-backend` or `yarn start-backend` in Terminal 1. Run `npm start` or `yarn start` in Terminal 2.

---
## Project Future Roadmap

---
## License & Copyright
MIT

Duc Anh Phan, **Lead Developer**

Zackary Muraca, **Support Developer**

Brain Johnson, **Support/Professional Writer**

