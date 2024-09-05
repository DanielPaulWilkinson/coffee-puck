<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";
import { RiCloseFill, RiEmotionHappyLine, RiEmotionUnhappyLine, RiInformationLine, RiErrorWarningLine } from "@remixicon/vue";
import { notification } from "../../data/types";

const props = withDefaults(defineProps<notification>(), {
  id: "",
  title: "",
  message: "",
  notificationType: "warning",
  autoClose: true,
  duration: 5,
});

const emit = defineEmits<{
  (e: "close"): void;
}>();


type State = {
  timer: NodeJS.Timeout | null,
  startedAt: number,
  delay: number,
}

const state = reactive<State>({
  timer: null,
  startedAt: 0,
  delay: 0,
});

onMounted(() => {
  console.log(props.autoClose);
  if (props.autoClose) {
    state.startedAt = Date.now();
    state.delay = props.duration * 1000;

    console.log(state);
    state.timer = setTimeout(close, state.delay);
  }
});

const toastColor = computed(() => {
  switch (props.notificationType) {
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

const toastTitle = computed(() => {
  return props.title && props.title !== null ? props.title : "Notification";
});

const close = () => {
  emit("close");
};
</script>

<template>
  <div class="notification" :style="`--toast-duration: ${props.duration}s; --toast-color: ${toastColor}`" @click.prevent="close">
    <div @click="close" class="close-btn" title="Close">
      <RiCloseFill />
    </div>

    <div class="body">
      <div v-if="props.notificationType === 'warning'">
        <RiErrorWarningLine :color="toastColor" />
      </div>
      <div v-else-if="props.notificationType === 'error'">
        <RiEmotionUnhappyLine :color="toastColor" />
      </div>
      <div v-else-if="props.notificationType === 'success'">
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
    <div v-if="autoClose" class="progress-indicator"></div>
  </div>
</template>
