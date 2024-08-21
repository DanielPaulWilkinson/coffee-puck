<script setup lang="ts">
import { RouterView } from 'vue-router'
import useNotifications from "./services/notifications";
import ToastNotification from "./components/ToastNotification.vue";
import { provide } from 'vue';
import MainFooter from './components/MainFooter.vue';
import SideBar from './components/SideBar.vue';
import Head from './components/Head.vue';
import "./styles/style.scss";

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
    <Head />
    <SideBar />
    <section class="main">
      <RouterView />
    </section>
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