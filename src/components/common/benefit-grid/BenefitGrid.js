import React from "react";
import styles from "./BenefitGrid.module.scss";
import BenefitBox from "../../common/benefitbox/BenefitBox";
import WebBenefitBox from "../../common/webbenefitbox/WebBenefitBox";
import {Col} from "react-bootstrap";
import ResponsiveComponent from "../../../framework/components/ResponsiveComponent";

class BenefitGrid extends ResponsiveComponent {
    renderCommon(blocks) {
        return blocks.details;
    }

    desktopContext() {
        const {benefits, onFavoriteToggled} = this.props;
        return {
            details: <div className={styles['benefit-grid']}>
                {
                    benefits.map(benefit =>
                        <Col xs={3} className="item" key={benefit.id}>
                            <BenefitBox
                                benefit={benefit}
                            />
                        </Col>
                    )
                }
            </div>
        }
    }

    mobileContext() {
        const {benefits, onFavoriteToggled} = this.props;
        return {
            details: <div className={styles['benefit-grid']}>
                {
                    benefits.map(benefit =>
                        <Col xs={6} className="item" key={benefit.id}>
                            <BenefitBox
                                benefit={benefit}
                                onFavoriteToggled={() => onFavoriteToggled(benefit.id)}
                            />
                        </Col>
                    )
                }
            </div>
        }

    }
}


export default BenefitGrid;
