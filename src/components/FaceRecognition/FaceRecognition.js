import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgURL, box, imgForUpload, demoGen, demoAge }) => {
	return (
		<div className='fl w-100 tc'>
			<p className='f3'>{`${demoGen} ${demoAge}`}</p>
			<div className=' ml5 mr5 absolute mt2'>
				<img
					id={'inputImg'}
					alt='body image1'
					src={imgURL}
					className='br4 ba b--washed-red bw1 shadow-5 mb2 mr2'
					width='500px'
					height='auto'
				/>
				<div
					className='bounding-box'
					style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
				/>
			</div>
			{/* <div className='fl w-100 ml5 mt2'>
				<h3>APPEARANCE: </h3>
				<div>
					<h4>AGE APPEARANCE - {age}</h4>
					<div>
						<h4>GENDER APPEARANCE</h4>
						<dl>
							<dd>feminine - </dd>
							<dd>masculine - </dd>
						</dl>
					</div>
				</div>
			</div> */}

			{/* <div className='fl w-100'>
				<div className='relative mt2'>
					<div className='fl w-100'>
						<img
							id='uploadedImage'
							alt='body image2'
							src={imgForUpload}
							className='br4 ba b--washed-red bw1 shadow-5 mb2 mr2'
							width='500px'
							height='auto'
						/>
					</div>
					<div className='fl w-100 ml3'>{'Text 1'}</div>
				</div>
			</div> */}
		</div>
	);
};
export default FaceRecognition;
