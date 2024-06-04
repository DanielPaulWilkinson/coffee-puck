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
  --sidebar-font-color: #FFF;
  --sidebar-background-color: #6F4E37;
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

.sidebar-link:hover p, .sidebar-link:hover svg {
  color: var(--sidebar-background-color);

}

.logo .sidebar-link:hover {
  background: none;
}

.sidebar-link svg {
  color: var(--sidebar-font-color);
}

.sidebar-link > p{
  color: var(--sidebar-font-color);
  font-family: MARKER;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 20px;
  margin-left: 10px;
}
.selected .sidebar-link p, .selected .sidebar-link svg{
  color: var(--sidebar-background-color);
  background: var(--sidebar-link-selected-background);
}

.selected .sidebar-link {
  color: var(--sidebar-background-color);
  background: var(--sidebar-link-selected-background);
}

.selected:hover .sidebar-link {
  color: var(--sidebar-background-color);
  background: var(--sidebar-link-selected-hover-background);
}
</style>