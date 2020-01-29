import React from 'react';
import TitleOfInputField from './TitleOfInputField';
import InputFormURL from './InputFormURL';
import InputFormBrowse from './InputFormBrowse';
import './InputForm.css';

const InputForm = ({ onInputChange, onInputSubmit, onPhotoSelection, onPhotoSubmit }) => {
	return (
		<div className='fl w-100 mt4 mb4'>
			<TitleOfInputField />
			<div className='form pa2 br3 shadow-5 mr4 ml4'>
				<InputFormURL onInputURLChange={onInputChange} onInputURLSubmit={onInputSubmit} />
				{/* <br /> */}
				<InputFormBrowse onBrowsePhotoSelection={onPhotoSelection} onBrowsePhotoSubmit={onPhotoSubmit} />
			</div>
		</div>
	);
};
export default InputForm;
