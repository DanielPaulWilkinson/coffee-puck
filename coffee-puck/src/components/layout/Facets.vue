<script lang="ts" setup>
import { onMounted, reactive } from "vue";

import Select from "../../components/fields/Select.vue";

const props = defineProps<{
    tableType: "vertical" | "horizontal",
    amount: number | string | null,
}>();

const emit = defineEmits<{
    (on: "changeTableType", value: "vertical" | "horizontal"): void
    (on: "changeAmount", value: number | string | null): void
}>();

type State = {
    amount: number | string | null,
};

const state = reactive<State>({
    amount: 0,
});

onMounted(() => {
    state.amount = props.amount;
})

</script>
<template>
    <div class="col-3">
        <p>Table Type:</p>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary" :class="tableType === 'horizontal' ? 'active' : ''"
                @click="emit('changeTableType', 'horizontal')">
                <font-awesome-icon :icon="['fas', 'table']" />
            </label>
            <label class="btn btn-secondary" :class="tableType === 'vertical' ? 'active' : ''"
                @click="emit('changeTableType', 'vertical')">
                <font-awesome-icon :icon="['fas', 'table']" />
            </label>
        </div>
    </div>
    <div class="col-2">
        <p>Amount:</p>
        <Select id="select" placeholder="hello" v-model="state.amount" :options="[{
                value: 5,
                label: '5',
            }, {
                value: 25,
                label: '25',
            }, {
                value: 50,
                label: '50',
            }]" @change="emit('changeAmount', state.amount)" />
    </div>
</template>