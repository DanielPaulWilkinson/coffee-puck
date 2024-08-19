<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { RiCloseFill, RiEmotionHappyLine, RiEmotionUnhappyLine, RiInformationLine, RiErrorWarningLine } from "@remixicon/vue";

// Props for our component,
// these are the same as Notitfication interface.
const props = defineProps({
  id: { type: String, required: true },
  type: {
    type: String,
    default: "info",
    required: false,
  },
  title: { type: String, default: null, required: false },
  message: {
    type: String,
    default: "Ooops! A message was not provided.",
    required: false,
  },
  autoClose: { type: Boolean, default: true, required: false },
  duration: { type: Number, default: 5, required: false },
});

// Defining emits
// for closing a notification
const emit = defineEmits<{
  (e: "close"): void;
}>();

// some reactive values to manage the notification
const timer = ref<any>(-1);
const startedAt = ref<number>(0);
const delay = ref<number>(0);

// setting up the automatic
// dismissing of notificaton
// after the specified duration
onMounted(() => {
  if (props.autoClose) {
    startedAt.value = Date.now();
    delay.value = props.duration * 1000;
    timer.value = setTimeout(close, delay.value);
  }
});

// a computed property to set
// the icon and progres bar color
// for the notification
const toastColor = computed(() => {
  switch (props.type) {
    case "error":
      return "#ff355b";
    case "warning":
      return "#e8b910";
    case "success":
      return "#00cc69";
    default:
      return "#0067ff";
  }
});

// a computed property to set
// the title of the notification
const toastTitle = computed(() => {
  return props.title && props.title !== null ? props.title : "Notification";
});

// a method to close the
// notification and emit the action
const close = () => {
  emit("close");
};
</script>

<template>
  <div
    class="toast-notification"
    :style="`$toast-duration: ${duration}s; $toast-color: ${toastColor}`"
    @click.prevent="close"
    :ref="id"
  >
    <div @click="close" class="close-btn" title="Close">
      <RiCloseFill />
    </div>

    <div class="body">
      <div v-if="props.type === 'warning'">
        <RiErrorWarningLine :color="toastColor"  />
      </div>
      <div v-else-if="props.type === 'error'">
        <RiEmotionUnhappyLine :color="toastColor" />
      </div>
      <div v-else-if="props.type === 'success'">
        <RiEmotionHappyLine :color="toastColor" />
      </div>
      <div v-else>
        <RiInformationLine :color="toastColor" />
      </div>
      <div class="vl"></div>
      <div class="content">
        <div class="content__title">{{ toastTitle }}</div>

        <p class="content__message">{{ message }}</p>
      </div>
    </div>
    <div v-if="autoClose" class="progress"></div>
  </div>
</template>
