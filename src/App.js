import React, { Component } from 'react';
import Navigation from './components/Navigation/NavigationJS/Navigation';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
// import ProfilePhoto from './components/ProfilePhoto/ProfilePhoto';
import InputForm from './components/InputForm/InputForm';
import FaceRecognitionFromURL from './components/FaceRecognition/FaceRecognitionFromURL';
import FaceRecognitionFromBrowse from './components/FaceRecognition/FaceRecognitionFromBrowse';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
	apiKey : 'YOUR API KEY',
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
			demography   : {
				gender : '',
				age    : '',
				box    : {},
			},
			route        : 'signin',
		};
	}

	onRouteChange = (route) => {
		this.setState({ route: route });
	};

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

	grabAge = (response) => {
		const demography = response.outputs[0].data.regions[0].data.face;
		if (demography.gender_appearance.concepts[0].name === 'feminine') {
			this.setState({
				demography : {
					gender : `Hey! Nice picture! I believe she is `,
					age    : `${demography.age_appearance.concepts[0].name} years old.`,
					box    : this.calculateFaceLocation(response),
				},
			});
		}
		if (demography.gender_appearance.concepts[0].name === 'masculine') {
			this.setState({
				demography : {
					gender : `Hey! Nice picture! I believe he is`,
					age    : `${demography.age_appearance.concepts[0].name} years old.`,
					box    : this.calculateFaceLocation(response),
				},
			});
		}
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
		console.log(atob(btoa(this.state.selectedFile)), 'onPhotoSubmit');
		// console.log(JSON.stringify(this.state.selectedFile), 'onPhotoSubmit');
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
		const { route, imgURL, imgForUpload, demography } = this.state;
		return (
			<div className='App'>
				<Particles params={particlesOption} className='particles' />
				{
					route === 'signin' ? <SignIn onRouteChange={this.onRouteChange} /> :
					route === 'signup' ? <SignUp onRouteChange={this.onRouteChange} /> :
					<div>
						<Navigation onRouteChange={this.onRouteChange} />
						{/* <ProfilePhoto onProPicChange={this.proPicSelectedHandler} /> */}
						<InputForm
							onInputChange={this.onInputChange}
							onInputSubmit={this.onInputSubmit}
							onPhotoSelection={this.onPhotoSelection}
							onPhotoSubmit={this.onPhotoSubmit}
						/>
						{/* 
							DONE:
							* if no input field is selected (!imgURL or imgURL === '') and actually, if they both are empty, there'd a <p/> saying, "What are you waiting for?"
							* if (imgURL === this.state.inputField or something like this) selected input URL AND (selectedFile === null), then render URL image or "URL FaceDetection Component".
							* if selected browse input and imgURL is empty, then render image for browsing.
							* if both input fields are selected, then render a msg saying, "Sorry! You can select only one input at a time. Kindly browse your desired photo from your device or grab a direct link to a file on the web and give it to us."
							* Also don't forget to fix the default state of "gender" and "age".
							YET TO DO:
							* Render error massages as pop up msg.
						*/}
						{
							!imgURL && !imgForUpload ? <p className='f3'>Hello! What are you waiting for?</p> :
							imgURL && !imgForUpload ? <FaceRecognitionFromURL
								box={demography.box}
								imgURL={imgURL}
								demoGen={demography.gender}
								demoAge={demography.age}
							/> :
							!imgURL && imgForUpload ? <FaceRecognitionFromBrowse
								box={demography.box}
								imgForUpload={imgForUpload}
								demoGen={demography.gender}
								demoAge={demography.age}
							/> :
							imgURL &&
							imgForUpload ? <p className='f3 pt4 ma4 lh-copy'>
								{`Oops! I believe you've tried to detect in both ways at a time. I'm afraid you can select only one input at the same time. Kindly browse your desired photo from your device or grab a direct link to a file on the web and give it to us. We're always ready to detect it for you!`}
							</p> :
							<p>{'Error occurred!'}</p>}
					</div>}
			</div>
		);
	}
}

export default App;
