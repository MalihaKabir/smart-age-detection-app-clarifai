import React from 'react';
import './FaceRecognition.css';

const FaceRecognitionFromBrowse = ({ box, imgForUpload, demoGen, demoAge }) => {
	return (
		<div className='fl w-100 tc'>
			<div>
				<div className='center'>
					<p className='ml2 mr2 f3'>{`${demoGen} ${demoAge}`}</p>
				</div>
				<div className='center'>
					<div className='ml1 mr2 absolute mt2'>
						<img
							id='uploadedImage'
							alt='body image2'
							src={imgForUpload}
							className='br4 ba b--washed-red bw1 shadow-5 mb2 mr2'
							width='500px'
							height='auto'
						/>
					</div>
					{/* <div
						className='center bounding-box'
						style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
					/> */}
				</div>
			</div>
		</div>
	);
};
export default FaceRecognitionFromBrowse;
