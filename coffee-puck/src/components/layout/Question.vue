<script setup lang="ts">
import { ref, useSlots } from 'vue';
useSlots();

withDefaults(defineProps<{
    name: string,
    label: string,
    tooltip: string,
    class: string,
    formGroup: boolean,
    error: string,
}>(), {

})

const showTooltip = ref(false);

</script>
<template>
    <div>
        <fieldset :aria-labelledby="`${name}-id`">
            <div class="row mt-2" :class="{
            '_has_error': error,
            'form-group': formGroup
        }">
                <div :class="tooltip ? 'col-11 col-md-10 col-lg-10 col-xl-11' : 'col-12'">
                    <legend class="col-form-label">
                        <span>
                            {{ label }}
                            <slot name="label" />
                        </span>
                    </legend>
                </div>
                <div v-if="tooltip" class="order-last col-1 col-md-1 col-lg-1">
                    <button aria-label="Click for help text" class="circle primary text-center" type="button"
                        aria-expanded="false" :aria-controls="name + '_collapse'" @click="showTooltip = !showTooltip">
                        ?
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <slot />
                </div>
            </div>
            <Transition mode="out-in">
                <div v-if="showTooltip" :id="name + '_collapse'" class="show">
                    <div class="alert alert-warning alert-dismissible fade show mb-4" role="alert">
                        <span v-if="tooltip" v-html="tooltip" />

                        <slot v-if="!tooltip" name="tooltip" />

                        <button type="button" class="btn-close" aria-label="Close" @click="showTooltip = false" />
                    </div>
                </div>
            </Transition>
        </fieldset>
    </div>
</template>
<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.btn-circular {
    border-radius: 100%;
    width: 25px;
    height: 25px;
    font-size: 1.1rem;
    line-height: 1rem;
    font-weight: 500 !important;
    text-align: center;
    color: #212529;
    background-color: #ffc107;
    border-color: #ffc107;
}


.btn-circular:hover,
.btn-circular:active {
    background-color: #ffc107;
    border-color: #ffc107;
}
</style>
