import React from 'react';

const ProfilePhoto = ({ onProPicChange }) => {
	return (
		<div>
			<input type='file' onChange={onProPicChange} />
			<button>Upload</button>
		</div>
	);
};

export default ProfilePhoto;
