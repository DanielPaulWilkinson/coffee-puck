<script setup lang="ts">
const props = defineProps<{
    id: string;
    index: number;
    currentEditableRowOrColumnId: number | null;
}>();

const emit = defineEmits<{
    (on: "undo", value: number): void;
    (on: "save", value: number): void;
    (on: "delete", value: number): void;
    (on: "updateEditableId", value: number): void;
}>();

</script>
<template>
        <div v-if="index !== currentEditableRowOrColumnId">
            <a class="margin-right" href="#" @click.prevent="emit('updateEditableId', props.index)">
                <font-awesome-icon :icon="['fas', 'eye']" />
            </a>
            <a class="margin-right" href="#" @click.prevent="emit('updateEditableId', props.index)">
                <font-awesome-icon :icon="['fas', 'edit']" />
            </a>
            <a href="#" @click.prevent="emit('delete', index)">
                <font-awesome-icon :icon="['fas', 'trash']" />
            </a>
        </div>
        <div v-else>
            <a class="margin-right" href="#" @click.prevent="emit('save', index)">
                <font-awesome-icon :icon="['fas', 'save']" />
            </a>
            <a href="#" @click.prevent="emit('undo', index)"><font-awesome-icon :icon="['fas', 'cancel']" /></a>
        </div>
</template>
<style>
</style>
