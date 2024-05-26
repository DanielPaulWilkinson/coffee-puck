<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import useNotifications from "./services/notifications";
import ToastNotification from "./components/ToastNotification.vue";
import { RiHeartFill } from '@remixicon/vue'
import { provide } from 'vue';

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
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">The Coffee Puck</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Brews</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/foo" class="nav-link">Coffees</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Explore
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link to="/varierty" class="dropdown-item">Varieties</router-link></li>
                <li><router-link to="/taste" class="dropdown-item">Flavours</router-link></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li><router-link to="/blogs" class="dropdown-item">Blogs</router-link></li>
              </ul>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
  <transition-group
      name="toast-notification"
      tag="div"
      class="toast-notifications"
      @before-enter="stopBodyOverflow"
      @after-enter="allowBodyOverflow"
      @before-leave="stopBodyOverflow"
      @after-leave="allowBodyOverflow"
    >
      <toast-notification
        v-for="(item, idx) in notifications"
        :key="item.id"
        :id="item.id"
        :type="item.type"
        :title="item.title"
        :message="item.message"
        :auto-close="item.autoClose"
        :duration="item.duration"
        @close="
          () => {
            removeNotifications(item.id);
          }
        "
      ></toast-notification>
    </transition-group>
  <footer class="navbar-light bg-light">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <ul>
            <li>link 1</li>
            <li>link 2</li>
            <li>link 3</li>
          </ul>
        </div>
        <div class="col-md-4">
          <ul>
            <li>link 1</li>
            <li>link 2</li>
            <li>link 3</li>
          </ul>
        </div>
        <div class="col-md-4">
          <ul>
            <li>link 1</li>
            <li>link 2</li>
            <li>link 3</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
footer {
  margin-top: 10px;
  padding-top: 30px;
  padding-bottom: 10px;
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

</style>
