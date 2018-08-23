import axios from "axios";
import ApiError from "./ApiError";
import Category from "../models/Category";
import Faq from "../models/Faq";
import Benefit from "../models/Benefit";
import Business from "../models/Business";
import Promotion from "../models/Promotion";
import CreditCardTypes from "../models/CreditCardType";
import User from "../models/User";

export default class ApiGateway {
    constructor(apiUrl) {
        axios.defaults.baseURL = `${apiUrl || ''}/api`;
    }

    async addFavorite(benefitId) {
        const endpointUrl = `benefits/${benefitId}/favorite`;

        try {
            const resp = await axios.post(endpointUrl);
            console.log("Response status is: ", resp.status);
        }
        catch (err) {
            console.log("--", err);
            this._handleApiError(err);
        }
    }

    async removeFavorite(benefitId) {
        const endpointUrl = `benefits/${benefitId}/unfavorite`;

        try {
            const resp = await axios.post(endpointUrl);
            console.log("Response status is: ", resp.status);
        }
        catch (err) {
            console.log("--", err);
            this._handleApiError(err);
        }
    }

    async fetchHotBenefits() {
        const endpointUrl = `benefits/hot`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Benefit.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async searchedBenefits() {
        const endpointUrl = `benefits`; //change this endpoint to Benefits later

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Benefit.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }


    async fetchMyBenefits() {
        const endpointUrl = `my-benefits`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Benefit.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchMyFavoriteBenefits() {
        const endpointUrl = `my-favorites`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Benefit.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchCategories() {
        const endpointUrl = `categories`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Category.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchCategoryBenefits(categoryId) {
        const endpointUrl = `category-benefits/${categoryId}`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.benefits.map(json => Benefit.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchFaqList() {
        const endpointUrl = `faqs`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Faq.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchFeaturedBenefits() {
        const endpointUrl = `featured-benefits`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Benefit.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchSuggestedBenefits() {
        const endpointUrl = `benefits/suggested`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Benefit.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchBenefit(benefitId) {
        const endpointUrl = `benefits/${benefitId}/`;

        try {
            const resp = await axios.get(endpointUrl);
            return Benefit.reconstituteFrom(resp.data);
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchCreditCardTypes() {
        const endpointUrl = `credit-card-types`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => CreditCardTypes.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchUser() {
        const endpointUrl = `user`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => User.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchMostViewedBenefits() {
        const endpointUrl = `benefits/most-viewed`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Benefit.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchPopularBenefits() {
        const endpointUrl = `benefits/popular`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Benefit.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchBusinesses() {
        const endpointUrl = `businesses`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Business.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchPromotions() {
        const endpointUrl = `promotions`;

        try {
            const resp = await axios.get(endpointUrl);
            return resp.data.map(json => Promotion.reconstituteFrom(json));
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    async fetchBusiness(businessId) {
        const endpointUrl = `businesses/${businessId}/`;

        try {
            const resp = await axios.get(endpointUrl);
            return Business.reconstituteFrom(resp.data);
        }
        catch (err) {
            this._handleApiError(err);
        }
    }

    // async removeFavorite(benefitId) {
    //     const endpointUrl = `my-favorites/${benefitId}`;
    //
    //     try {
    //         await axios.delete(endpointUrl);
    //         return console.log(`successfully deleted favorite from user. benefit ID:${benefitId}`)
    //     }
    //     catch (err) {
    //         this._handleApiError(err);
    //     }
    // }

    async sendContactInfo(values) {
        const endpointUrl = `contact-us`;

        try {
            await axios.post(endpointUrl, values);

        }
        catch (err) {
            this._handleApiError(err)
        }
    }

    async redeemBenefit(benefitId) {
        const endpointUrl = `benefit/${benefitId}/redeem/`;
        try {
            const resp = await axios.post(endpointUrl);
            return resp.data.couponCode
        }
        catch (err) {
            this._handleApiError(err)
        }
    }

    async login(values) {
        const endpointUrl = `login`;

        try {
            await axios.post(endpointUrl, values);
        }
        catch (err) {
            this._handleApiError(err)
        }
    }

    async sendUserInfo(values) {
        const endpointUrl = `register`;

        try {
            await axios.post(endpointUrl, values);
        }
        catch (err) {
            this._handleApiError(err)
        }
    }

    _handleApiError(err) {
        if (axios.isCancel(err)) {
            throw new ApiError(`Api request cancelled. error: ${err.message}`, 999);
        }

        throw new ApiError(`Api request failed. error: ${err.message}`, 666, err);
    }
}
