import React, {Component} from 'react';
import axios from 'axios';

class QrCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qrCode: null
		}
	}

	render() {
		return (
			<div>
				<button onClick={() => this.getQrCode()}>Click me for QR</button>
				{this.state !== null && <div>
              <img src= {this.state.qrCode}/>
            </div>
        }
			</div>
		);
	}

	getQrCode() {
		axios.get('/api/users', {responseType: 'blob'})
		.then((response) => {
			console.log(response.data)
			// let img = URL.createObjectURL(response)
			this.setState({
				qrCode: response.data
			});
		}).catch((error) => {
				if (error.response) {
					console.log(error.response)
					console.log(error.response.status)
					console.log(error.response.headers)
				}
		});
	}
}

export default QrCode;