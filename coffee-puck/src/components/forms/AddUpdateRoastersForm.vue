<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useVuelidate } from "@vuelidate/core";
import Question from '../../components/layout/Question.vue';
import Text from '../../components/fields/Text.vue';
import Textarea from '../fields/Textarea.vue';
import { useAppStore } from "../../stores/app";
import { createRoaster, getRoaster, updateRoaster } from '@/data/roasters';
import { useRoasterStore } from '@/stores/addRoaster';
import { roasterFormValidator } from '@/validation/validators';

const app = useAppStore();
const store = useRoasterStore();
const route = useRoute();
const v$ = useVuelidate();
const validator = roasterFormValidator(store);

export type State = {
    facebook: string,
    instagram: string,
    pinterest: string,
    medium: string,
    youtube: string,
    x: string,
};

const state = reactive<State>({
    facebook: "",
    instagram: "",
    pinterest: "",
    medium: "",
    youtube: "",
    x: "",
});


onBeforeMount(async () => {
    store.$reset();
    const id = route.query.id;
    if (id) {
        store.roaster = await getRoaster(Number(id));
    }
});

const addSocials = () => {
    store.roaster.socials = [];
    store.roaster.socials.push({
        name: "facebook",
        url: state.facebook,
        icon: "facebook.png"
    });
    store.roaster.socials.push({
        name: "instagram",
        url: state.instagram,
        icon: "instagram.png"
    });
    store.roaster.socials.push({
        name: "medium",
        url: state.medium,
        icon: "medium.png"
    });
    store.roaster.socials.push({
        name: "pinterest",
        url: state.pinterest,
        icon: "pinterest.png"
    });
    store.roaster.socials.push({
        name: "x",
        url: state.x,
        icon: "x.png"
    });
    store.roaster.socials.push({
        name: "youtube",
        url: state.youtube,
        icon: "youtube.png"
    });
}

const createRoasterPath = async () => {
    addSocials();
    const success = await createRoaster(store.roaster);
    if (success) {
        if (success) {
            app.addNotification({
                notificationType: 'success',
                message: 'Successfully created brew',
                title: "Success",
                autoClose: true,
                duration: 15,
            });
        } else {
            app.addNotification({
                notificationType: 'error',
                message: 'Could not create brew',
                title: "Error",
                autoClose: true,
                duration: 15,
            });
        }
    }
}

const updateRoasterPath = async () => {
    addSocials();
    const success = await updateRoaster(store.roaster);
    if (success) {
        app.addNotification({
            notificationType: 'success',
            message: 'Successfully updated brew',
            title: "Success",
            autoClose: true,
            duration: 15,
        });
    } else {
        app.addNotification({
            notificationType: 'error',
            message: 'Could not update brew',
            title: "Error",
            autoClose: true,
            duration: 15,
        });
    }
}

const submit = async () => {

    const isValid = await v$.value.$validate();

    if (!isValid) {
        return;
    }

    route.query.id ? updateRoasterPath() : createRoasterPath();
}
</script>
<template>
    <form @submit.prevent="submit">
        <h2>Add roaster Form</h2>
        <hr>
        <div class="row">
            <h2>What is the name of the Roaster?</h2>
            <div class="col-md-6">
                <Question name="name" tooltip="write the name of the roaster or coffee shop here." label="name" class=""
                    :form-group="false" error="">
                    <Text id="roaster-name" type="text" v-model="store.roaster.name" :validation="validator.name" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="url" tooltip="Write the smell of the coffee after you grind your beans here."
                    label="url" class="" :form-group="false" error="">
                    <Text id="roaster-url" type="text" v-model="store.roaster.url" :validation="validator.url" />
                </Question>
            </div>
        </div>
        <hr>
        <div class="row">
            <h2>Soicals</h2>
            <div class="col-md-6">
                <Question name="facebook" tooltip="Does this roaster have a facebook?" label="facebook" class=""
                    :form-group="false" error="">
                    <Text id="facebook" type="text" v-model="state.facebook" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="instagram" tooltip="Does this roaster have a instagram?" label="instagram" class=""
                    :form-group="false" error="">
                    <Text id="instagram" type="text" v-model="state.instagram" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="medium" tooltip="Does this roaster have a medium?" label="medium" class=""
                    :form-group="false" error="">
                    <Text id="medium" type="text" v-model="state.medium" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="pinterest" tooltip="Does this roaster have a pinterest?" label="pinterest" class=""
                    :form-group="false" error="">
                    <Text id="pinterest" type="text" v-model="state.pinterest" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="x" tooltip="Does this roaster have a x?" label="x" class="" :form-group="false"
                    error="">
                    <Text id="x" type="text" v-model="state.x" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="youtube" tooltip="How would you describe the acidity?" label="youtube" class=""
                    :form-group="false" error="">
                    <Text id="youtube" type="text" v-model="state.youtube" />
                </Question>
            </div>
        </div>
        <hr>
        <div class="row">
            <Question name="notes" tooltip="How would you describe the acidity?" label="notes" class=""
                :form-group="false" error="">
                <Textarea :model-value="store.roaster.notes" />
            </Question>
        </div>
        <div class="row">
            <div class="col-md-6">
                <Question name="blog" tooltip="What is the blog url of the roaster?" label="blog" class=""
                    :form-group="false" error="">
                    <Text id="roaster-blog" type="text" v-model="store.roaster.blogURL"
                        :validation="validator.blogURL" />
                </Question>
            </div>
            <div class="col-md-6">
                <Question name="logo" tooltip="What is the logo of the roaster?" label="logo" class=""
                    :form-group="false" error="">
                    <Text id="roaster-blog" type="text" v-model="store.roaster.logo" :validation="validator.logo" />
                </Question>
            </div>
        </div>
        <hr>
        <button type="submit" class="primary mt-10">
            {{ route.query.id ? "Update Roaster" : "Add Roaster" }}
        </button>
    </form>
</template>
<style>
h1,
h2 {
    font-family: marker;
}

h2 {
    font-size: large;
}

.input {
    border: 1px solid #765;
    border-radius: 10px;
}

.selected {
    background-color: #765;
}

.check {
    position: absolute;
    top: -5px;
    right: 2px;
}

.selectable {
    cursor: pointer;
}

.card-top {
    margin: auto;
}
</style>