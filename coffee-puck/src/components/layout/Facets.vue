<script lang="ts" setup>
import { onMounted, reactive } from "vue";

import Select from "../../components/fields/Select.vue";

const props = defineProps<{
    tableType?: "vertical" | "horizontal" | "card",
    amount?: number | string | null,
}>();

const emit = defineEmits<{
    (on: "changeTableType", value: "vertical" | "horizontal" | "card"): void
    (on: "changeAmount", value: number): void
}>();

type State = {
    amount: number | string | null,
};

const state = reactive<State>({
    amount: 0,
});

onMounted(() => {
    if(props.amount){
        state.amount = props.amount;
    }
})

</script>
<template>
    <div v-if="tableType">
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
            <label class="btn btn-secondary" :class="tableType === 'card' ? 'active' : ''"
                @click="emit('changeTableType', 'card')">
                <font-awesome-icon :icon="['fas', 'table']" />
            </label>
        </div>
    </div>
    <div v-if="amount">
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
            }]" @change="emit('changeAmount', Number(state.amount));" />
    </div>
</template>