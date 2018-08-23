import React from "react";
import {slide as Menu} from "react-burger-menu";
import MenuStats from "./MenuStats";
import styles from "./SlidingMenu.module.scss";
import {Link} from "react-router-dom";


const SlidingMenu = ({isOpen, onToggled}) => {

    return <Menu width={'93%'}
                 disableOverlayClick
                 isOpen={isOpen}
                 onStateChange={(state) => onToggled(state.isOpen)}
                 right
                 customBurgerIcon={(
                     <div>
                         <img className="menu-burger-icon"
                              alt="menu"
                              src={require("../../../assets/images/menu-burger.svg")}/>
                     </div>
                 )}
                 className={styles['links-container']}>
        <div>
            <div className="flex bg-blue items-center justify-between">
                <div className="flex items-center slide-menu-top-bar justify-between">
                    <img className="sunny-image ml2"
                         src={require("../../../assets/images/sun.svg")}
                         alt="שמש"/>
                    <p>בוקר טוב ישראל</p>
                </div>
                <button className="browser-compatibility" onClick={() => onToggled(false)}>
                    <img className="close-image" src={require("../../../assets/images/close.svg")}
                         alt="סגור"/>
                </button>
            </div>
            <div className="benefits-stats-slide-menu flex justify-center">
                <MenuStats/>
            </div>
        </div>

        <ul className="links-list">
            <li>
                <Link to="/category-benefits/1">
                    {'הטבות'}
                </Link>
            </li>
            <li>
                <a href="https://digital.isracard.co.il/" target="_blank" rel="noopener noreferrer">
                    {'לאתר ישראכרט'}
                </a>
            </li>
            <li>
                <Link to="/tos">
                    {'תקנון'}
                </Link>
            </li>
            <li>
                <Link to="/faq">
                    {'שאלות נפוצות'}
                </Link>

            </li>
            <li>
                <Link to="/contact-us">
                    {'צור קשר'}
                </Link>
            </li>
            <li>
                <Link to="/registration">
                    {'הרשמה'}
                </Link>
            </li>
            <li>
                <Link to="/businesses">
                    {'כל החברות'}
                </Link>
            </li>
            {/*<li>*/}
            {/*<a href="https://digital.isracard.co.il/" target="_blank">*/}
            {/*<img className="isracard-logo-link ml1"*/}
            {/*src={require("../../../assets/images/exit.svg")} alt="לאתר החברה"*/}
            {/*width={"19px"}/>*/}
            {/*{'לאתר ישראכרט'}*/}
            {/*</a>*/}
            {/*</li>*/}
        </ul>
    </Menu>
};

export default SlidingMenu;
