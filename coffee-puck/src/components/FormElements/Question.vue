<script setup lang="ts">
import { useSlots } from 'vue';
useSlots();

const props = withDefaults(defineProps<{
    name: string,
    label: string,
    tooltip: string,
    class: string,
    formGroup: boolean,
    error: string,
}>(),{

})
</script>
<template>
    <div>
        <fieldset :aria-labelledby="`${name}-id`">
            <div class="row" 
            :class="{
                '_has_error': error,
                'form-group': formGroup
            }">
                <legend class="col-12 col-form-label">
                    <span>
                        {{ label }}
                        <slot name="label" />
                    </span>
                </legend>
            </div>
            <div class="col-12 col-md-12 col-lg-12">
                <slot />
            </div>
            <p>{{ tooltip }}</p>
        </fieldset>
    </div>
</template>
