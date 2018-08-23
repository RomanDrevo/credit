import {observable} from "mobx";


export default class Business {

    @observable isFavorite = false;

    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {
        const state = {
            id: json['id'],
            name: json['name'],
            logo: json['imageUrl'],
            benefits: json['benefits'],
            isFavorite: json['isFavorite']
        };
        return new Business(state);
    }
}
