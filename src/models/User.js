
class Card {
    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {
        const state = {
            id: json['id'],
            type: json['type'],
            expirationDate: json['expirationDate'],
            lastDigits: json['lastDigits'],

        };
        return new Card(state);
    }
}

class Stat {
    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {
        const state = {
            unredeemedBenefits: json['unredeemedBenefits'],
            benefitsLeftThisMonth: json['benefitsLeftThisMonth'],
            premiumBenefitsLeft: json['premiumBenefitsLeft']

        };
        return new Stat(state);
    }
}


export default class User {

    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {
        const state = {
            id: json['id'],
            firstName: json['firstName'],
            lastName: json['lastName'],
            userCards: json['userCards'] ? json['userCards'].map(x => Card.reconstituteFrom(x)) : [],
            userStats: json['userStats'] ? json['userStats'].map(x => Stat.reconstituteFrom(x)) : [],
        };
        return new User(state);
    }
}
