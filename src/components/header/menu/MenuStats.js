import React, {Component} from "react";
import styles from "./MenuStats.module.scss";
import MenuStatsItem from "./MenuStatsItem";

export default class MenuStats extends Component {
    render() {
        return (
            <div className={styles['my-benefits']}>
                <p className="bold">ההטבות שלך</p>
                <div className="flex benefit-list">
                    <div className="col-4">
                        <MenuStatsItem
                            totalBenefits="4"
                            classColorNumber="1"
                            imageName={require(`../../../assets/images/icon-present-ceise-red.svg`)}
                            title="הטבות למימוש"
                        />
                    </div>
                    <div className="col-4">
                        <MenuStatsItem
                            totalBenefits="5"
                            classColorNumber="2"
                            imageName={require(`../../../assets/images/icon-paper-present-blue.svg`)}
                            title="נותרו החודש"
                        />
                    </div>
                    <div className="col-4">
                        <MenuStatsItem
                            totalBenefits="1"
                            classColorNumber="3"
                            imageName={require(`../../../assets/images/icon-crown-purple.svg`)}
                            title="הטבות פרימיום"
                        />
                    </div>
                </div>

            </div>
        );
    }
}
