<script setup lang="ts">
import { RouterView } from 'vue-router'

import notification from "./components/utils/Notification.vue";
import MainFooter from './components/layout/MainFooter.vue';
import SideBar from './components/layout/SideBar.vue';
import Head from './components/layout/Head.vue';

import { useAppStore} from "./stores/app";
import { stopBodyOverflow, allowBodyOverflow } from "./composables/notifications";

import "./styles/style.scss";

const store = useAppStore();

</script>
<template>
    <Head />
    <SideBar />
    <section class="main">
      <RouterView />
    </section>
    <transition-group name="notifications" tag="div" class="notifications" @before-enter="stopBodyOverflow"
      @after-enter="allowBodyOverflow" @before-leave="stopBodyOverflow" @after-leave="allowBodyOverflow">
      <notification v-for="(item) in store.notifications" :key="item.id ?? 0" :id="item.id" :notification-type="item.notificationType"
        :title="item.title" :message="item.message" :auto-close="item.autoClose" :duration="item.duration" @close="store.removeNotification(item.id ?? '')">
      </notification>
    </transition-group>
    <MainFooter />
</template>