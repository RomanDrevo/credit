import React, {Component} from 'react';
import ActionButton from '../common/actionbutton/ActionButton'
import {inject, observer} from 'mobx-react';
import {withRouter} from "react-router-dom";
import InputField from '../common/input-field/InputField';

@withRouter
@inject('contactUsUiStore')
@observer
export default class Form extends Component {
    render() {
        const {contactUsUiStore} = this.props;
        const name = contactUsUiStore.form.$('name');
        const email = contactUsUiStore.form.$('email');
        const tel = contactUsUiStore.form.$('tel');
        return (
            <form onSubmit={contactUsUiStore.onSubmit}>
                <div className="input-section mt5">
                    <InputField
                        field={name}
                        isValid={!name.isValid && name.touched}
                    />
                    <InputField
                        field={email}
                        isValid={!email.isValid && email.touched}
                    />
                    <InputField
                        field={tel}
                        isValid={!tel.isValid && tel.touched}
                    />
                </div>
                <div className="textarea-section mt5">
                    <textarea {...contactUsUiStore.form.$('message').bind()} />
                    <p className="flex justify-end error">{contactUsUiStore.form.$('message').error}</p>
                </div>
                <div className="flex justify-center button-section">
                    <ActionButton
                        disabled={!contactUsUiStore.form.isValid}
                        className="button"
                        type="submit"
                    >שלח</ActionButton>
                </div>
                <p>{contactUsUiStore.form.error}</p>
            </form>
        );
    }
}
