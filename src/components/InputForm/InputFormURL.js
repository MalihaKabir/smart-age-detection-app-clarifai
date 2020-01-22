import React from 'react';
import './InputForm.css';

const InputFormURL = ({ onInputURLChange, onInputURLSubmit }) => {
	return (
		<div>
			<input
				type='text'
				onChange={onInputURLChange}
				placeholder='URL link'
				className='formInput f6 pa2 ma1 w-50 br4'
			/>
            <button
                onClick={onInputURLSubmit}
                className='bg-washed-red f4 pa1 ma1 w-40 grow link br4'
            >
				Detect
			</button>
		</div>
	);
};
export default InputFormURL;
