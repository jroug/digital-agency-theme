import React from 'react';

import i6 from '../assets/images/icons/icon-6.png';
import i7 from '../assets/images/icons/icon-7.png';
import i8 from '../assets/images/icons/icon-8.png';
import i9 from '../assets/images/icons/icon-9.png';
import i10 from '../assets/images/icons/icon-10.png';


const BannerTopElements = () => {
    return (
        <div className="section-icons" >
            {/* <!-- Icon One --> */}
            <div className="icon-one" style={{"backgroundImage":"url(" + i6 + ")"}}></div>
            {/* <!-- Icon Two --> */}
            <div className="icon-two" style={{"backgroundImage":"url(" + i7 + ")"}}></div>
            {/* <!-- Icon Three --> */}
            <div className="icon-three" style={{"backgroundImage":"url(" + i8 + ")"}}></div>
            {/* <!-- Icon Four --> */}
            <div className="icon-four" style={{"backgroundImage":"url(" + i9 + ")"}}></div>
            {/* <!-- Icon Five --> */}
            <div className="icon-five" style={{"backgroundImage":"url(" + i10 + ")"}}></div>
            {/* <!-- Icon Six --> */}
            <div className="icon-six" style={{"backgroundImage":"url(" + i6 + ")"}}></div>
        </div>
    );
};

export default BannerTopElements;