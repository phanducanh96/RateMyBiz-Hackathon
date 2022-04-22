import React, {Component} from 'react';
import axios from "axios";

class Flask extends Component {
	constructor(props) {
		super(props);
		this.state = null;
	}
	
	render() {
		return (
			<div className="App">
				<p>To get your profile details: </p><button onClick={() => this.getData()}>Click me</button>
        {this.state !== null && <div>
              <p>Profile name: {this.state.profileData.name}</p>
              <p>About me: {this.state.profileData.about}</p>
            </div>
        }
			</div>
		);
	}

	getData() {
			axios.get('/get')
			.then((response) => {
				console.log(response.data)
				this.setState({
					profileData: {
						name: response.data.name,
						about: response.data.about
					}
				})
			}).catch((error) => {
				if (error.response) {
					console.log(error.response)
					console.log(error.response.status)
					console.log(error.response.headers)
					}
			})}
}

export default Flask;