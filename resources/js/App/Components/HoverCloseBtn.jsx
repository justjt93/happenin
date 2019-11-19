import React from "react";

const HoverCloseBtn = props => {
    const { handleCloseBigDetail } = props;

    return (
        <div onClick={handleCloseBigDetail} className='HoverCloseBtn'>
            <div className='HoverCloseBtnText'>X</div>
        </div>
    );
};
export default HoverCloseBtn;
