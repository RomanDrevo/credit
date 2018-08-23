import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from "react-router-dom";
import InputField from '../common/input-field/InputField';
import ActionButton from '../common/actionbutton/ActionButton'

@withRouter
@inject('passportLoginUiStore', 'authStore')
@observer
export default class IDForm extends Component {
    render() {
        const {passportLoginUiStore} = this.props;
        const id = passportLoginUiStore.form.$('id');
        const lastDigits = passportLoginUiStore.form.$('lastDigits');
        return (
            <form className="form-section" onSubmit={passportLoginUiStore.onSubmit}>
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
                        disabled={!passportLoginUiStore.form.isValid}
                        className="button"
                        type="submit"
                    >התחברות</ActionButton>
                </div>
                <p>{passportLoginUiStore.form.error}</p>
            </form>
        );
    }
}
