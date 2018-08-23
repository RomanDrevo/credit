import {observable} from "mobx";


class Review {
    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {
        const state = {
            id: json['id'],
            customerName: json['customerName'],
            rating: json['rating'],
            reviewText: json['reviewText'],
            label: json['label'],
            created: new Date(json['created']),

        };
        return new Review(state);
    }
}

export default class Benefit {
    @observable isFavorite = false;

    constructor(data) {
        Object.assign(this, data);
    }

    static reconstituteFrom(json) {
        const state = {
            id: json['id'],
            name: json['name'],
            price: json['price'],
            maxQuantity: json['maxQuantity'],
            coverImg: json['coverImageUrl'],
            isFavorite: json['isFavorite'],
            storeLogoImg: json['storeLogoImageUrl'],
            description: json['description'],
            viewersCount: json['viewersCount'],
            expireAt: new Date(json['expireAt']),
            redemptionAddresses: json['redemptionAddresses'],
            business: json['business'],
            termsAndConditions: json['termsAndConditions'],
            reviews: json['reviews'] ? json['reviews'].map(x => Review.reconstituteFrom(x)) : [],
            suggestedBenefits: json['suggestedBenefits'] ? json['suggestedBenefits'].map(x => Benefit.reconstituteFrom(x)) : [],
            isRedeemed: json['isRedeemed'],
            redemptionDate: new Date(json['redemptionDate']),
            hotBenefits: json['hot-benefits'],
            wasPurchased: json['wasPurchased'],
            howToRedeem: json['howToRedeem'],
            sliderImg: json['sliderImg'],
            isExpired: json['isExpired'],
            premiumPoints: json['premiumPoints']
        };
        return new Benefit(state);
    }
}
