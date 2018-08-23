import ApiGateway from "./api/ApiGateway";
import env from "./env";
import HomeUiState from "./components/home/HomeUiState";
import CategoriesStore from "./stores/CategoriesStore";
import FaqStore from "./stores/FaqStore";
import BenefitsStore from "./stores/BenefitsStore";
import BusinessesStore from "./stores/BusinessesStore";
import PromotionsStore from "./stores/PromotionsStore";
import SingleBenefitStore from "./stores/SingleBenefitStore";
import MyBenefitsStore from "./stores/MyBenefitsStore";
import CreditCardTypesStore from "./stores/CreditCardTypesStore";
import ExecutionBenefitUiState from "./components/benefit-redemption/ExecutionBenefitUiState";
import SingleBusinessStore from "./stores/SingleBusinessStore";
import MyFavoriteStore from "./stores/MyFavoriteStore";
import ContactUsUiStore from "./components/contact-us/ContactUsUiStore";
import IDLoginUiStore from "./components/login/IDLoginUiStore";
import PassportLoginUiStore from "./components/login/PassportLoginUiStore";
import SearchedBenefitsStore from "./stores/SearchedBenefitsStore";
import AuthStore from "./stores/AuthStore";
import CategoryBenefitsStore from "./stores/CategoryBenefitsStore";
import SearchUiState from "./components/search/SearchUiState";
import IDRegistrationUiState from "./components/registration/IDRegistrationUiState";
import PassportRegistrationUiState from "./components/registration/PassportRegistrationUiState";
import CategoryBenefitsUiState from "./components/categorybenefits/CategoryBenefitsUiState";
import PersonalUiState from "./components/personal/PersonalUiState";
import appUiState from "./components/appUiState";
import BottomBarUiStore from "./components/common/bottombar/BottomBarUiStore";
import ModalManagerUiState from "./components/common/modal/ModalManagerUiState";
import VideoAdsStore from './stores/VideoAdsStore';

const bootstrapper = () => {
    const apiGateway = new ApiGateway(env.API_URL);

    // model stores
    const categoriesStore = new CategoriesStore(apiGateway);
    const faqStore = new FaqStore(apiGateway);
    const singleBenefitStore = new SingleBenefitStore(apiGateway);
    const myBenefitsStore = new MyBenefitsStore(apiGateway);
    const businessesStore = new BusinessesStore(apiGateway);
    const promotionsStore = new PromotionsStore(apiGateway);
    const creditCardTypesStore = new CreditCardTypesStore(apiGateway);
    const singleBusinessStore = new SingleBusinessStore(apiGateway);
    const myFavoriteStore = new MyFavoriteStore(apiGateway);
    const benefitsStore = new BenefitsStore(apiGateway, myFavoriteStore);
    const searchedBenefitsStore = new SearchedBenefitsStore(apiGateway);
    const authStore = new AuthStore(apiGateway);
    const categoryBenefitsStore = new CategoryBenefitsStore(apiGateway);
    const videoAdsStore = new VideoAdsStore(apiGateway);

    // ui states
    const modalManagerUiState = new ModalManagerUiState();
    const homeUiState = new HomeUiState({benefitsStore, promotionsStore});
    const executionBenefitUiState = new ExecutionBenefitUiState();
    const iDLoginUiStore = new IDLoginUiStore(authStore);
    const passportLoginUiStore = new PassportLoginUiStore(authStore);
    const searchUiState = new SearchUiState({searchedBenefitsStore});
    const categoryBenefitsUiState = new CategoryBenefitsUiState({categoryBenefitsStore});
    const idRegistrationUiState = new IDRegistrationUiState(apiGateway);
    const passportRegistrationUiState = new PassportRegistrationUiState(apiGateway);
    const contactUsUiStore = new ContactUsUiStore(apiGateway, modalManagerUiState, appUiState);
    const personalUiState = new PersonalUiState(apiGateway);

    const bottomBarUiStore = new BottomBarUiStore();


    return {
        modalManagerUiState,
        categoriesStore,
        faqStore,
        homeUiState,
        benefitsStore,
        businessesStore,
        promotionsStore,
        singleBenefitStore,
        creditCardTypesStore,
        executionBenefitUiState,
        myBenefitsStore,
        singleBusinessStore,
        contactUsUiStore,
        iDLoginUiStore,
        passportLoginUiStore,
        myFavoriteStore,
        searchedBenefitsStore,
        categoryBenefitsStore,
        categoryBenefitsUiState,
        searchUiState,
        authStore,
        personalUiState,
        appUiState,
        bottomBarUiStore,
        idRegistrationUiState,
        passportRegistrationUiState,
        videoAdsStore
    };
};

export default bootstrapper;
