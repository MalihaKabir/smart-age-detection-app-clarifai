import React from 'react';
import './InputForm.css';

const InputFormBrowse = ({ onBrowsePhotoSelection, onBrowsePhotoSubmit }) => {
	return (
		<div>
			<input
				type='file'
				onChange={onBrowsePhotoSelection}
				className='formInput f6 pa1 pl3 ma1 w-50 br4 bg-light-gray'
			/>
			<button onClick={onBrowsePhotoSubmit} className='bg-washed-red f4 pa1 ma1 w-40 grow link br4'>
				Detect
			</button>
		</div>
	);
};
export default InputFormBrowse;
