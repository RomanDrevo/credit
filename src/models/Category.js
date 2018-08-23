export default class Category {
    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {
        const state = {
            id: json['id'],
            name: json['name'],
            src: json['imageUrl']
        };
        return new Category(state);
    }
}
