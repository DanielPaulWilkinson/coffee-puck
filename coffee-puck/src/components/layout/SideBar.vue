<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <section class="sidebar-container">
    <div class="logo-container">
      <a class="logo" href="#">
        <p class="">Coffee Puck <font-awesome-icon :icon="['fas', 'coffee']" /></p>
      </a>
    </div>
    <nav class="menu">
      <ul>
        <router-link to="/" active-class="selected" exact-active-class="selected">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'chart-pie']" />
            <p>Statistics</p>
          </li>
        </router-link>
        <router-link to="/manage-coffee" active-class="selected">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'coffee']" />
            <p>Manage Coffee</p>
          </li>
        </router-link>
        <router-link to="/manage-brew" active-class="selected">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'coffee']" />
            <p>Manage Brews</p>
          </li>
        </router-link>
        <router-link to="/manage-roasters" active-class="selected">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'star']" />
            <p>Manage Roasters</p>
          </li>
        </router-link>
        <router-link to="/manage-varieties" active-class="selected">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'star']" />
            <p>Manage Varieties</p>
          </li>
        </router-link>
        <router-link to="/communities" active-class="selected">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'star']" />
            <p>Communities</p>
          </li>
        </router-link>
        <br />
        <router-link to="/settings" active-class="selected">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'star']" />
            <p>Settings</p>
          </li>
        </router-link>
        <a href="#">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'star']" />
            <p>Support</p>
          </li>
        </a>
        <a href="#">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'star']" />
            <p>Privacy</p>
          </li>
        </a>
      </ul>
    </nav>
  </section>
</template>