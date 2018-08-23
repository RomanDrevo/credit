import React from 'react';
import styles from './FooterDesktop.module.scss';
import SingleColumnFooter from './SingleColumnFooter';
import { Col, Grid, Row } from 'react-bootstrap';

const linkCategories = [ //todo : need to add action/href to links array.
    {
        title: "מידע ושירות",
        links: [
            "אודות ישראכרט",
            "אמנת השירות - נציב תלונות",
            "הציבור",
            "שירות נגיש",
            "דוח שנתי לציבור על טיפול",
            "בתלונות ופניות",
            "הודעה בהתאם להחלטת בית המשפט",
            "בעניין עמלת רכישת מט”ח",
            "הודעה בהתאם להחלטת בית המשפט",
            "בעניין תווי מתנה",
            "אחריות תאגידית 2014-2015",
            "אחריות תאגידית 2012-2013",
            "קוד אתי",
            "צור קשר",
            "טפסים להורדה",
            "דוחות כספיים",
            "תנאי שימוש באתרי ישראכרט",
            "איסור הלבנת הון ומניעת מימון טרור",
            "תעריפון ועמלות, הסכמים",
            "תקנונים ותנאי שימוש",
            "מדיניות הגנת פרטיות",
            "דרושים"
        ]
    },
    {
        title: "כרטיסים",
        links: [
            "מועדוני לקוחות",
            "כרטיס more",
            "כרטיסי אשראי",
            "כרטיסים עסקיים",
            "Paypass",
            "טעינת כרטיסים",
            "Gift Card",
            "Maximum Gift Card",
            "כרטיסי תדלוק",
            "Isracard Web"
        ]
    },
    {
        title: "מוצרים ושירותים",
        links: [
            "סליקה",
            'הודעת החיוב החודשית בדוא"ל',
            "שירות הודעות sms",
            "masterpass",
            "מענה קולי ויזואלי",
            "Easy2Give",
            "pango",
            "ישראכרט צ'ק",
            "הוראות קבע",
            "עיגול לטובה",
            "הנציג הדיגיטלי"
        ]
    },
    {
        title: "הלוואות ותכניות אשראי",
        links: [
           "הלוואה לכל מטרה",
           "החזר חודשי קבוע",
           "הלוואה מיידית"
        ]
    },
    {
        title: "הטבות",
        links: [
            "הורים וילדים",
            "אוכל ונשנושים",
            "תרבות ופנאי",
            "אופנה ואביזרים",
            "חופשות וטיולים",
            "אטרקציות",
            "הטבות פרימיום",
            "מסלול תעופה",
            "עוד הפתעות",
            "עיצוב ומוצרים לבית"
        ]
    }
]

export default ({}) => {
    return (<footer className={`${styles['footer-wrapper']}`}>
        <Grid>
            <Row>
                <Col xs={12} className="flex justify-around">
                    {
                        linkCategories.map((cat, i) => {
                            return (<SingleColumnFooter key={i} columnTitle={cat.title}
                                                        className="single-column-wrapper">
                                <ul className="column-items">
                                    {cat.links.map((link, i) => <li key={i} className="link">{link}</li>)}
                                </ul>
                            </SingleColumnFooter>);
                        })
                    }
                </Col>
            </Row>
        </Grid>
    </footer>);
}
