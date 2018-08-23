import React, {Component} from "react";
import {Collapse} from "react-bootstrap";
import arrowDown from "../../assets/images/arrow_down.svg";
import arrowUp from "../../assets/images/arrow_up.svg";

export default class SectionCollapse extends Component {
    state = {
        isOpen: false
    };

    render() {
        const {headerText, children, ratingPoints, ratingStars} = this.props;

        return <div className="collapse-wrapper mb2">
            {/*expander header should have white background*/}

            <div className="collapse-header flex items-center justify-between p3"
                 onClick={() => this.setState({isOpen: !this.state.isOpen})}>
                <div className="collapse-heading pr3">{headerText}</div>

                <div className="bold">{ratingPoints}</div>

                <div>{ratingStars}</div>

                {/*expander body should have white background and shadow*/}
                <img alt="arrow" src={this.state.isOpen ? arrowUp : arrowDown}
                     className="flex-none arrow"/>
            </div>
            <Collapse in={this.state.isOpen} className="section-collapse-body">
                {/* Extra div needed for expander performance*/}
                <div>
                    <div className="px3 py4">
                        {children}
                    </div>
                </div>
            </Collapse>
        </div>;
    }
}
