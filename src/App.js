import React, { Component } from 'react';
import Navigation from './components/Navigation/NavigationJS/Navigation';
// import ProfilePhoto from './components/ProfilePhoto/ProfilePhoto';
import InputForm from './components/InputForm/InputForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
	apiKey : '1c5ec0d650d14019aa1608dce5d0ea3a',
});

const particlesOption = {
	particles : {
		number      : {
			value   : 90,
			density : {
				enable     : true,
				value_area : 700,
			},
		},
		line_linked : {
			shadow : {
				enable : true,
				color  : '#3CA9D1',
				blur   : 5,
			},
		},
	},
};

class App extends Component {
	constructor () {
		super();
		this.state = {
			inputField   : '',
			imgURL       : '',
			selectedFile : null,
			imgForUpload : null,
			box          : {},
			age          : 0,
		};
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const inputImg = document.getElementById('inputImg');
		const width = Number(inputImg.width);
		const height = Number(inputImg.height);
		return {
			leftCol   : clarifaiFace.left_col * width,
			topRow    : clarifaiFace.top_row * height,
			rightCol  : width - clarifaiFace.right_col * width,
			bottomRow : height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceDetectionBox = (box) => {
		this.setState({ box: box });
	};

	grabAge = (response) => {
		const age = response.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name;
		this.setState({ age: age });
		// console.log(response.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name);
	};

	onInputChange = (event) => {
		this.setState({ inputField: event.target.value });
	};

	onInputSubmit = () => {
		this.setState({ imgURL: this.state.inputField });
		app.models
			.predict(Clarifai.DEMOGRAPHICS_MODEL, this.state.inputField)
			// .then((response) => console.log(response))
			.then((response) => this.grabAge(response))
			// .then((response) => this.displayFaceDetectionBox(this.calculateFaceLocation(response)))
			.catch((err) => console.log(err));
	};

	onPhotoSelection = (event) => {
		// this.setState({ selectedFile: event.target.files[0].name });
		// console.log(event.target.files[0].name, 'onPhotoSelection');
		const currentFile = event.target.files[0];
		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				this.setState({ selectedFile: reader.result });
			},
			false,
		);
		reader.readAsDataURL(currentFile);
	};

	onPhotoSubmit = () => {
		this.setState({ imgForUpload: this.state.selectedFile });
		console.log(JSON.stringify(this.state.selectedFile), 'onPhotoSubmit');
		// app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, JSON.parse(this.state.selectedFile)).then(
		// 	function (response) {
		// 		// do something with response
		// 		console.log(response);
		// 	},
		// 	function (err) {
		// 		// there was an error
		// 		console.log(err, 'Photo Submit Error');
		// 	},
		// );
	};

	render () {
		return (
			<div className='App'>
				<Particles params={particlesOption} className='particles' />
				<Navigation />
				{/* <ProfilePhoto onProPicChange={this.proPicSelectedHandler} /> */}
				<InputForm
					onInputChange={this.onInputChange}
					onInputSubmit={this.onInputSubmit}
					onPhotoSelection={this.onPhotoSelection}
					onPhotoSubmit={this.onPhotoSubmit}
				/>
				<FaceRecognition
					box={this.state.box}
					imgURL={this.state.imgURL}
					imgForUpload={this.state.imgForUpload}
					age={this.state.age}
				/>
			</div>
		);
	}
}

export default App;
