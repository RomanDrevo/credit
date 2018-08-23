export default class Promotion {
    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {
        const state = {
            id: json['id'],
            actionTypeText: json['actionTypeText'],
            contentText: json['contentText'],
            src: json['src']
        };
        return new Promotion(state);
    }
}
