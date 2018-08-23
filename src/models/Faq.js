export default class Faq {
    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {
        const state = {
            id: json['id'],
            question: json['question'],
            answer: json['answer']
        };
        return new Faq(state);
    }
}
