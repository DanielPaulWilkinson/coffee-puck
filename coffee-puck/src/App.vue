<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import useNotifications from "./services/notifications";
import ToastNotification from "./components/ToastNotification.vue";
import { provide } from 'vue';
import MainFooter from './components/MainFooter.vue';
import SideBar from './components/SideBar.vue';
import DashboardHeader from './components/DashboardHeader.vue';

const {
  notifications,
  createNotification,
  removeNotifications,
  stopBodyOverflow,
  allowBodyOverflow,
} = useNotifications();

provide("create-notification", createNotification);

</script>
<template>
  <SideBar />
  <main>
    <RouterView />
  </main>

  <transition-group name="toast-notification" tag="div" class="toast-notifications" @before-enter="stopBodyOverflow"
    @after-enter="allowBodyOverflow" @before-leave="stopBodyOverflow" @after-leave="allowBodyOverflow">
    <toast-notification v-for="(item) in notifications" :key="item.id" :id="item.id" :type="item.type"
      :title="item.title" :message="item.message" :auto-close="item.autoClose" :duration="item.duration" @close="() => {
    removeNotifications(item.id);
  }
    "></toast-notification>
  </transition-group>

  <MainFooter />

</template>
<style>
:root {
  --black-font-color: #000000;
  --light-grey-color: #dbdbdb;
  --header-background-color: #ffffff;
  --outline-separator: 1px solid #eaeae1;
  --main-background-color: #faf8f4;
  --button-background-color: #e4e1d5;
  --button-background-color-hover: #d7d2c0;
  --search-background-color: #ffffff;
  --card-background-color: #ffffff;
  --card-grey-font-color: #656565;
  --card-outline-color: #e3e1d5;
  --announcements-separator-color: #e1e1e1;
  --card-border-radius: 12px;
  --card-box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: grid;
  grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr auto;
  grid-template-areas:
    'sidebar main'
    'footer footer';
  margin: 0;
}

footer {
  display: grid;
  grid-area: footer;
}

.toast-notifications {
  z-index: 100;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.8rem;
}

.toast-notification-enter-active {
  animation: toast-fade-in 0.5s ease-in-out;
}

.toast-notification-leave-active {
  animation: toast-fade-in 0.5s ease-in-out reverse;
}

@keyframes toast-fade-in {
  from {
    opacity: 0;
    transform: scale(0.4);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

main {
  display: grid;
  grid-area: main;
}

@font-face {
    font-family: marker;
    src: url('./assets/marker.ttf');
}
</style>
