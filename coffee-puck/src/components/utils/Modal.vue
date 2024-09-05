<script setup lang="ts">
import { useSlots, ref, watch } from "vue";

const props = withDefaults(defineProps<{
    id: string;
    isOpen: boolean;
    header?: string | undefined;
    cross?: boolean;
}>(), {
    header: undefined,
    cross: true,
    isOpen: false,
});

const slots = useSlots();
const dialog = ref<HTMLDialogElement>();
const close = () => dialog.value?.close();
watch(() => props.isOpen, (open) => {
    open ? dialog.value?.showModal() : close;
});

</script>
<template>
    <Transition>
    <dialog :id="id" ref="dialog" role="modal" @click.prevent="close">
        <div class="dialog-content">
            <div v-if="props.header" class="dialog-header">
                <h5 class="dialog-title">
                    {{ header }}
                </h5>
                <button v-if="cross" type="button" class="dialog-close" aria-label="Close" @click.prevent="close">
                    <span aria-hidden="true">&times;</span>
                </button>

            </div>
            <div v-else>
                <slot name="title" />
            </div>

            <div v-if="slots.body" class="dialog-body">
                <slot name="body" />
            </div>
            <div v-if="slots.footer" class="dialog-footer">
                <slot name="footer" />
            </div>
        </div>
    </dialog>
    </Transition>
</template>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
