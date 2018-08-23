import React, {Component} from 'react';
import styles from './DateField.module.scss'
import Input from 'muicss/lib/react/input';



import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class DateField extends Component {

    constructor (props) {
        super(props)
        this.state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
                          startDate: date
                      });
    }

    render() {

        const {field} = this.props;
        return (
            <div className={styles['date-field']}>



                {/*<Input*/}
                    {/*autoComplete="off"*/}
                    {/*floatingLabel={true}*/}
                    {/*{...field.bind()}*/}
                {/*/>*/}

                <DatePicker
                    locale="en-gb"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showMonthDropdown
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={65}
                    dropdownMode="select"
                />

                {/*<input*/}
                    {/*autoComplete="off"*/}
                    {/*{...field.bind({type: 'date'})}*/}
                {/*/>*/}
                {/*<p className="flex justify-end error">{field.error}</p>*/}

            </div>
        );
    }
}
