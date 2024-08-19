<script setup lang="ts">
import { useSlots, watch, onBeforeUnmount } from "vue";

const props = withDefaults(defineProps<{
    id: string;
    show: boolean;
    header?: string | undefined;
    styles?: string;
    cross?: boolean;
    overlay?: boolean;
    wide?: boolean;
}>(), {
    header: undefined,
    cross: true,
    overlay: true,
    show: false,
    styles: "",
});

watch(() => props.show, (showValue) => {
    if (showValue) {
        document.body.classList.add("overflow-hidden");
    } else {
        document.body.classList.remove("overflow-hidden");
    }
});

onBeforeUnmount(() => {
    if (props.show) {
        document.body.classList.remove("overflow-hidden");
    }
});

const slots = useSlots();

const emit = defineEmits<{
    (on:"close"): void
}>();

</script>
<template>
    <div
        v-if="show"
        :id="props.id"
        class="overlay"
        @click.prevent="emit('close')"
    />
    <div
        v-if="show"
        :class="show ? 'modal-show' : ''"
        class="modal"
    >
        <div
            class="modal-dialog"
            :class="props.wide ? 'modal-dialog-wide' : ''"
        >
            <div class="modal-content">
                <div
                    v-if="slots.title"
                >
                    <slot
                        name="title"
                    />
                </div>
                <div
                    v-if="header"
                    class="modal-header"
                >
                    <h5
                        class="modal-title"
                    >
                        {{ header }}
                    </h5>
                    <button
                        v-if="cross"
                        :id="`close-${id}`"
                        type="button"
                        class="btn-close"
                        aria-label="close"
                        @click.prevent="emit('close')"
                    />
                </div>
                <div
                    v-if="slots.body"
                    class="modal-body"
                >
                    <slot
                        name="body"
                    />
                </div>
                <div
                    v-if="slots.footer"
                    class="modal-footer"
                >
                    <slot
                        name="footer"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .z-index-1{
        z-index: 1;
    }
    .modal-background{
        width: 100%;
    }
    .modal-show {
        position: fixed;
        display: block;
        top: 2%;
        overflow-x: hidden;
        overflow-y: auto;
        outline: 0;
        z-index: 9;
    }
</style>
