<script setup lang="ts">
import BrewForm from '../components/AddBrewForm.vue'
</script>
<template>
    <div class="container">
        <div class="col-12">
            <h1>Brew</h1>
            <i>Create a new brew</i>
            <hr>
        </div>
        <BrewForm />
    </div>
</template>
<style lang="scss">

.card-top{
    margin:auto;
}
.selectable {
    cursor: pointer;
}

.selected {
    background-color: #8f755f;
    position: relative;

    h5 {
        color: #FFF;
    }
}

.margin-top-10 {
    margin-top: 10px;
}

.check {
    position: absolute;
    right: 10px;
    background-image: "../asset/check.svg";
}

.slide-fade-enter-active {
    transition: all 0.5s ease-out;
    opacity: 1;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
}
</style>
