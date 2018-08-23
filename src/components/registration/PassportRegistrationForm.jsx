import React, {Component} from 'react';
import ActionButton from '../common/actionbutton/ActionButton'
import {inject, observer} from 'mobx-react';
import {withRouter} from "react-router-dom";
import InputField from "../common/input-field/InputField";
import CheckboxField from "../common/checkbox-field/CheckboxField";
import {Accordion, Panel} from "react-bootstrap";
import CollapseHeader from "../faq/FaqHeader";
import CustomCheckbox from "./CustomCheckbox";


@withRouter
@inject('passportRegistrationUiState')
@observer
export default class Form extends Component {

    render() {
        const {passportRegistrationUiState} = this.props;
        const {form} = passportRegistrationUiState;
        return (
            <div>
                <div className="mt4 px5">
                    <form onSubmit={form.onSubmit}>

                        <div className="input-section">
                            <InputField hint='(כולל ספרת ביקורת)' field={form.$('foreignPassNum')}/>

                            <InputField field={form.$('creditLastDigits')}/>

                            <InputField field={form.$('email')}/>

                            <InputField field={form.$('tel')}/>

                            <InputField field={form.$('bankAccount')}/>

                            <InputField field={form.$('birthday')}/>


                            <div className="checkbox-wrapper py3">
                                <CheckboxField field={form.$('benefitTerms')}/>
                            </div>


                            <div className="checkbox-wrapper py3">
                                <CheckboxField field={form.$('commercialInfo')}/>
                                <div className="label-text-bottom">אני מעוניין לקבל מהמנפיקה דברי פרסומת</div>
                                <Accordion bsClass="faq-list">
                                    <Panel bsClass="read-more" bsStyle={null}
                                           header={<div><CollapseHeader question={"קרא עוד"}/></div>} eventKey={1}>
                                        <div className={"px3 pr5"}>
                                            לרבות ומבלי לגרוע, מבצעים, הטבות, הודעות, אירועים, הצעות שונות ומידע שיווקי
                                            נוסף, אשר ישוגרו אלי באמצעות מערכת חיוג אוטומטי (IVR), הודעה אלקטרונית,
                                            הודעת
                                            מסר קצר (SMS) או בכל אמצעי תקשורת אחר. באפשרותי להפסיק בכל עת את קבלת המידע
                                            הפרסומי באמצעות משלוח הודעה למנפיקה.
                                        </div>
                                    </Panel>
                                </Accordion>
                            </div>

                            <div className="checkbox-wrapper py3">
                                <CheckboxField field={form.$('socialBanking')}/>
                                <div className="label-text-bottom"> בערוצים השונים - לצפייה בהסכם <a href="">בנקאות
                                    בתקשורת</a></div>
                                <Accordion bsClass="faq-list">
                                    <Panel bsClass="read-more" bsStyle={null}
                                           header={<div><CollapseHeader question={"להצגת ערוצי המידע ובחירתם"}/></div>}
                                           eventKey={1}>
                                        <div className={"flex justify-center pl5"}>
                                            <CustomCheckbox {...form.$('emailChannel').bind()}/>
                                            <CustomCheckbox {...form.$('smsChannel').bind()}/>
                                            <CustomCheckbox {...form.$('voiceChannel').bind()}/>
                                        </div>
                                    </Panel>
                                </Accordion>
                            </div>

                            <div className="checkbox-wrapper py3">
                                <CheckboxField field={form.$('americanExpress')}/>
                                <div className="label-text-bottom">אמריקן אקספרס שברשותי</div>
                            </div>

                            <div className="checkbox-wrapper py3 remember-me-checkbox">
                                <CheckboxField field={form.$('rememberMe')}/>
                            </div>
                            <div className="mb5 mt5">
                                <div className="flex justify-center">
                                    <ActionButton
                                        className="button mt2"
                                        disabled={!form.isValid}
                                        type="submit">סיום</ActionButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
