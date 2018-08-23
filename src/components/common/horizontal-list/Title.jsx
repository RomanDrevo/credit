import React from "react";


const Title = ({title, showAll}) => (
    <div className='flex items-center mb2'>
        <div className="bold flex-auto title-desktop">{title}</div>
        {showAll && <a className="show-all">
            הכל

            <img className="left-arrow" src={require("../../../assets/images/arrow_left.svg")} alt=""/>
        </a>}
    </div>
);

export default Title;
