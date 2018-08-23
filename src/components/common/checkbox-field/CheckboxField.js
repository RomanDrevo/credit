import React, {Component} from 'react';
import {observer} from 'mobx-react';
import styles from './CheckboxField.module.scss';

@observer
class CheckboxField extends Component {


    render() {

        let {field, additionalInfo} = this.props;

        return (
            <div className={styles.checkbox}>
                <div className="">
                    <div className="flex col-12">
                        <input {...field.bind()} />

                        <label htmlFor={field.id}>
                            {field.label} {additionalInfo}
                        </label>
                    </div>

                    <div>
                        {
                            field.error ?
                            <p className="flex error">{field.error}</p> : null
                        }
                    </div>

                </div>

            </div>
        )
    }

}

export default CheckboxField;













