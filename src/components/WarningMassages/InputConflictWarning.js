import React from 'react';

const InputConflictWarning = () => {
    return (
        <div>
            <p className='f3 pt4 ml4 mr4 lh-copy'>
                {`Oops! I believe you've tried to detect in both ways at a time. I'm afraid you can select only one input at the same time. Kindly browse your desired photo from your device or grab a direct link to a file on the web and give it to us.`} <br /> {`Refresh the page and try again. We're always ready to detect it for you!`}
            </p>
        </div>
    );
};
export default InputConflictWarning;
