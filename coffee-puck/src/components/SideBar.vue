<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div class="sidebar">
    <div class="logo">
      <a class="sidebar-link" href="#">
        <p>Coffee Puck <font-awesome-icon :icon="['fas', 'coffee']" /></p>
      </a>
    </div>
    <div class="menu">
      <ul>
        <router-link to="/" active-class="selected" exact-active-class="selected">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'chart-pie']" />
            <p>Statistics</p>
          </li>
        </router-link>
        <router-link to="/coffee" active-class="selected">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'coffee']" />
            <p>Manage Coffee</p>
          </li>
        </router-link>
        <router-link to="/brew" active-class="selected">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'coffee']" />
            <p>Manage Brews</p>
          </li>
        </router-link>
        <router-link to="/history-log" active-class="selected">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'star']" />
            <p>History</p>
          </li>
        </router-link>
        <a href="#">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'star']" />
            <p>Tasks</p>
          </li>
        </a>
        <a href="#">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'star']" />
            <p>Communities</p>
          </li>
        </a>
        <br />
        <a href="#">
          <li class="sidebar-link">
            <font-awesome-icon :icon="['fas', 'star']" />
            <p>Settings</p>
          </li>
        </a>
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
    </div>
  </div>
</template>
<style>
:root {
  --sidebar-font-color: #212121;
  --sidebar-background-color: #ffffff;
  --sidebar-link-hover-background-color: #f7f6f3;
  --sidebar-link-selected-background: #f1f0e9;
  --sidebar-link-selected-hover-background: #efede6;
}

.sidebar {
  display: flex;
  flex-direction: column;
  grid-area: sidebar;
  background-color: var(--sidebar-background-color);
  border-right: var(--outline-separator);
}

.sidebar a {
  text-decoration: none;
}

.sidebar ul {
  padding: 0;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0 56px;
  color: var(--black-font-color);
}

.sidebar-link:hover {
  background: var(--sidebar-link-hover-background-color);
}

.logo .sidebar-link:hover {
  background: none;
}

.sidebar-link> p {
  color: var(--sidebar-font-color);
  font-size: 1.1rem;
  margin-top: 20px;
  margin-left: 10px;
}

.selected .sidebar-link {
  background: var(--sidebar-link-selected-background);
}

.selected:hover .sidebar-link {
  background: var(--sidebar-link-selected-hover-background);
}
</style>