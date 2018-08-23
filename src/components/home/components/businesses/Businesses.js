import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import classnames from "classnames";
import styles from "./Businesses.module.scss";
import Business from "../../../common/business-box/BusinessBox";
import { withRouter } from "react-router-dom";

@inject('businessesStore')
@withRouter
@observer
class Businesses extends Component {
    componentWillMount() {
        this.props.businessesStore.loadBusinesses();
    }

    render() {
        const { businessesStore } = this.props;
        return (
            <div className={classnames(`${styles['businesses-wrapper']}`)}>
                <div className='businesses-title-wrapper flex justify-between'>
                    <p className="semibold">חברות</p>
                    {/*TODO: Make me a component please ido, please */}
                    <a>הכל
                        <img className="left-arrow" src={require("../../../../assets/images/arrow_left.svg")} alt=""/></a>
                </div>
                <ul className={'businesses list-unstyled flex justify-content'}>
                    {businessesStore.businesses.map(x => <li key={x.id}
                                                             className={'list-item mr1 content-start'}>
                        <Business business={x}/>
                    </li>)}
                </ul>
            </div>
        );
    }
}
;

export default Businesses;
