import React, {Component} from 'react';


class CustomCheckbox extends Component {
    render() {
        const {value, onChange, label} = this.props;

        return (
            <div className="px1" onClick={() => onChange(!value)}>
                {
                    value ?
                    <div className="custom-checkbox checkbox-checked flex items-baseline">
                        <div className="checked-icon flex items-center justify-center">
                            <img alt={"checkbox"} src={require('../../assets/images/icon-check.png')}/>
                        </div>

                        <div>{label}</div>
                    </div>
                        :
                    <div className="custom-checkbox checkbox-unchecked flex items-baseline">
                        <div>{label}</div>
                    </div>
                }
            </div>
        )
    }
}

export default CustomCheckbox;
