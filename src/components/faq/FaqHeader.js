import React from 'react';
import ResponsiveComponent from '../../framework/components/ResponsiveComponent';
import arrowDown from '../../assets/images/arrow_down.svg';
import arrowUp from '../../assets/images/arrow_up.svg';
import {inject, observer} from 'mobx-react';

@inject('idRegistrationUiState')
@observer
class FaqHeader extends ResponsiveComponent {
    renderMobile(){
       const {question, faqNumber, faqNumberOpened, hideCollapseHeader, idRegistrationUiState} = this.props;
       return(

           <div className="faq-item text-center" onClick={() => hideCollapseHeader ? idRegistrationUiState.hideCollapseHeader() : null}>
               {
                   idRegistrationUiState.isShowCollapseHeader ?
                   <div className="header flex items-center pl4">
                       {faqNumber ? <span className="flex justify-center items-center right-number ">{faqNumber}</span> : null }
                       <span className="flex-auto px2 semibold header-text">{question}</span>
                       <img alt="" src={faqNumberOpened === faqNumber ? arrowUp : arrowDown} className="flex-none arrow"/>
                   </div>
                   :
                   null
               }

           </div>
       )
    }

    renderDesktop(){
        const {question, faqNumberOpened, faqNumber} = this.props;
        return(
            <div className="faq-item">
                <div className="header flex items-center px6">
                    <span className="flex-auto px2 semibold">{question}</span>
                    <img alt="" src={faqNumberOpened === faqNumber ? arrowUp : arrowDown} className="flex-none arrow"/>
                </div>
            </div>
        )
    }
}


export default FaqHeader;
