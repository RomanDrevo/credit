import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from "react-router-dom";
import InputField from '../common/input-field/InputField';
import ActionButton from '../common/actionbutton/ActionButton'

@withRouter
@inject('iDLoginUiStore')
@observer
export default class IDForm extends Component {
    render() {
        const {iDLoginUiStore} = this.props;
        const id = iDLoginUiStore.form.$('id');
        const lastDigits = iDLoginUiStore.form.$('lastDigits');
        return (
            <form className="form-section" onSubmit={iDLoginUiStore.onSubmit}>
                <div className="input-section mt5">
                    <InputField
                        field={id}
                        hint='(כולל ספרת ביקורת)'
                        isValid={!id.isValid && id.touched}
                    />
                    <InputField
                        field={lastDigits}
                        isValid={!lastDigits.isValid && lastDigits.touched}
                    />
                </div>
                <div className="flex justify-center button-section mt4 mb5">
                    <ActionButton
                        disabled={!iDLoginUiStore.form.isValid}
                        className="button bold"
                        type="submit"
                    >התחברות</ActionButton>
                </div>
                <p>{iDLoginUiStore.form.error}</p>
            </form>
        );
    }
}
