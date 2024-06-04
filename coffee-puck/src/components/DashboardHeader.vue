
<script setup lang="ts">
</script>
<template>
     <header>
    <div class="greeting">
      <img class="user-profile-picture" src="" alt="profile picture" />
      <div>
        <p>Hi there,</p>
        <p>Emuel Vassallo (@emuel)</p>
      </div>
    </div>
  </header>
</template>
<style>

.buttons {
  display: grid;
  grid-template-rows: 1fr;
  grid-area: buttons;
  column-gap: 22px;
  align-items: center;
}

.buttons button {
  all: unset;
  background: var(--button-background-color);
  color: var(--black-font-color);
  text-align: center;
  border-radius: var(--card-border-radius);
  height: 42px;
  font-weight: bold;
  font-size: 0.95rem;
}

.buttons button:hover {
  cursor: pointer;
  background: var(--button-background-color-hover);
  transition: all 0.09s ease-in-out;
}

.profile-picture {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  flex-shrink: 0;
}

.user-profile-picture {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  flex-shrink: 0;
}

.profile-picture:hover,
.user-profile-picture:hover {
  cursor: pointer;
  filter: brightness(97.5%);
}

header {
  display: grid;
  grid-area: header;
  background-color: var(--header-background-color);
  padding: 18px 42px;
  gap: 28px 16px;
  border-bottom: var(--outline-separator);
}
</style>