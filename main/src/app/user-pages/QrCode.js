import React, { Component, Popup } from 'react';
import axios from 'axios';
import { readQrCode } from '../utils/Utils';

class QrCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			qrCode: null
		}
	}

	render() {

		const qrImg = (this.state.visible ? <img src={this.state.qrCode} /> : null)

		return (
			<div>
				<button onClick={() => this.getQrCode()}>Click me for QR</button>

				<div>
					{qrImg}
				</div>

				<button onClick={readQrCode(qrImg)}>Click me to read QR</button>
			</div>
		);
	}

	getQrCode() {
		axios.get('/api/get_qr_code', { responseType: 'blob' })
			.then((response) => {
				console.log(response.data)
				// let img = URL.createObjectURL(response)
				this.setState({
					qrCode: URL.createObjectURL(response.data),
					visible: true
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