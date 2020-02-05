import React, { Component } from 'react';
import Navigation from './components/Navigation/NavigationJS/Navigation';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
// import ProfilePhoto from './components/ProfilePhoto/ProfilePhoto';
import InputForm from './components/InputForm/InputForm';
import FaceRecognitionFromURL from './components/FaceRecognition/FaceRecognitionFromURL';
import FaceRecognitionFromBrowse from './components/FaceRecognition/FaceRecognitionFromBrowse';
import InputConflictWarning from './components/WarningMassages/InputConflictWarning';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

// declaring clarifai API key
const app = new Clarifai.App({
	apiKey : 'YOUR OWN API',
});

// for particle effect, declaring the options of particles that you wanna use
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

// Initiating all the states for house keeping
const initialState = {
	inputField   : '',
	imgURL       : '',
	selectedFile : null,
	imgForUpload : null,
	demography   : {
		gender : '',
		age    : '',
		box    : {},
	},
	route        : 'signup',
};

class App extends Component {
	constructor () {
		super();
		this.state = initialState;
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState(initialState);
		}
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
		// console.log(event.target.files[0].name , 'onPhotoSelection');
		const currentFile = event.target.files[0];
		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				this.setState({ selectedFile: reader.result.replace(/^data:image\/(.*);base64,/, '') });
				console.log('selectedFile', this.state.selectedFile);
			},
			false,
		);
		reader.readAsDataURL(currentFile);
	};

	onPhotoSubmit = () => {
		this.setState({ imgForUpload: this.state.selectedFile });
		console.log(this.state.selectedFile, 'onPhotoSubmit');
		// console.log(atob(btoa(this.state.selectedFile)), 'onPhotoSubmit');
		app.models
			.predict(Clarifai.DEMOGRAPHICS_MODEL, {
				base64 : this.state.selectedFile,
			})
			.then((response) => {
				// console.log(this.grabAge(response));
				console.log(response);
			})
			.catch((err) => console.log(err, 'Photo Submit Error'));
	};

	render () {
		const { route, imgURL, imgForUpload, demography } = this.state;
		return (
			<div className='App'>
				<Particles params={particlesOption} className='particles' />
				{
					route === 'signup' ? <SignUp onRouteChange={this.onRouteChange} /> :
					route === 'signin' ? <SignIn onRouteChange={this.onRouteChange} /> :
					route === 'signout' ? <SignIn onRouteChange={this.onRouteChange} /> :
					route === 'home' ? <div>
						<Navigation onRouteChange={this.onRouteChange} />
						{/* <ProfilePhoto onProPicChange={this.proPicSelectedHandler} /> */}
						<InputForm
							onInputChange={this.onInputChange}
							onInputSubmit={this.onInputSubmit}
							onPhotoSelection={this.onPhotoSelection}
							onPhotoSubmit={this.onPhotoSubmit}
						/>
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
								imgSrc={imgForUpload}
								demoGen={demography.gender}
								demoAge={demography.age}
							/> :
							imgURL && imgForUpload ? <InputConflictWarning /> :
							<p>{'Something went wrong'}</p>}
					</div> :
					<p className='f4 ma4'>{`Something went wrong.`}</p>}
			</div>
		);
	}
}

export default App;
