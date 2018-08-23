export default class CreditCardType {
    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {
        const state = {
            id: json['id'],
            type: json['type'],
            name: json['name'],
            imageUrl: json['ImageUrl']
        };
        return new CreditCardType(state);
    }
}
