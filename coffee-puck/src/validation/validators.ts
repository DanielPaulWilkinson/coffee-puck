import { computed } from "vue";
import { helpers, required } from "@vuelidate/validators";
import { useBrewStore } from "@/stores/addBrew";

const requiredMessage = (field: string) => `The ${field} field is required`;

export const brewFormValidator = (store: ReturnType<typeof useBrewStore>) => computed(() => ({
    preGrindAroma: {
        required: helpers.withMessage(requiredMessage("preGrindAroma"), required)
    },
    postGrindAroma: {
        required: helpers.withMessage(requiredMessage("postGrindAroma"), required)
    },
    acidity: {
        required: helpers.withMessage(requiredMessage("acidity"), required)
    },
    sweetness: {
        required: helpers.withMessage(requiredMessage("sweetness"), required)
    },
    body: {
        required: helpers.withMessage(requiredMessage("body"), required)
    },
    finish: {
        required: helpers.withMessage(requiredMessage("finish"), required)
    },
    flavour: {
        required: helpers.withMessage(requiredMessage("flavour"), required)
    },
    coffeeId: {
        required: helpers.withMessage(requiredMessage("coffee"), required)
    },
    coffeeTypeId: {
        required: helpers.withMessage(requiredMessage("coffee type"), required)
    },
    rating: {},
}))