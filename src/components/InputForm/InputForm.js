import React from 'react';
import './InputForm.css';

const InputForm = ({ onInputChange, onInputSubmit, onPhotoSelection, onPhotoSubmit }) => {
	return (
		<div className='fl w-100 mb3'>
			<h2 className='f3 mb1'>{'SmartAgeDetection'}</h2>
			<p className='f5 ml2 mr2 mt0'>{'(Give us a direct link to a file on the web or try your own image)'}</p>
			<div className='form pa2 br3 shadow-5 mr4 ml4'>
				<input
					type='text'
					onChange={onInputChange}
					placeholder='URL link'
					className='formInput f6 pa2 ma1 w-50 br4'
				/>
				<button onClick={onInputSubmit} className='bg-washed-red f4 pa1 ma1 w-40 grow link br4'>
					Detect
				</button>
				{/* <br />
				<input
					type='file'
					onChange={onPhotoSelection}
					className='formInput f6 pa1 pl3 ma1 w-50 br4 bg-light-gray'
				/>
				<button onClick={onPhotoSubmit} className='bg-washed-red f4 pa1 ma1 w-40 grow link br4'>
					Detect
				</button> */}
			</div>
		</div>
	);
};
export default InputForm;
