import React, {Component} from 'react';
import { observer } from 'mobx-react';
import Input from 'muicss/lib/react/input';
import styles from './InputField.module.scss'
import * as classnames from "classnames";

@observer
export default class InputField extends Component {
    render() {
        const {field, className, hint, isValid} = this.props;
        return (
            <div className={classnames(styles['input-field'], className)}>
                <Input
                    autoComplete="off"
                    floatingLabel={true}
                    hint={hint}
                    {...field.bind()}
                    className={'semibold'}
                    invalid={isValid}
                />
                {
                    field.error ?
                    <p className="flex justify-end error pl2">{field.error}</p> : null
                }

            </div>
        );
    }
}
