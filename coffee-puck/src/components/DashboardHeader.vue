
<script setup lang="ts">
</script>
<template>
     <header>
    <div class="search">
      <span class="material-symbols-rounded"> search </span>
      <input type="search" placeholder="Search for projects" />
    </div>
    <div class="notification-area">
      <span class="material-symbols-rounded"> notifications_active </span>
      <img class="profile-picture" src="" alt="profile picture" />
      <p>Emuel Vassallo</p>
    </div>
    <div class="greeting">
      <img class="user-profile-picture" src="" alt="profile picture" />
      <div>
        <p>Hi there,</p>
        <p>Emuel Vassallo (@emuel)</p>
      </div>
    </div>
    <div class="buttons">
      <button>New</button>
      <button>Upload</button>
      <button>Share</button>
    </div>
  </header>
</template>
<style>

.buttons {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, minmax(76px, 1fr));
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
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    'search notification-area'
    'greeting buttons';
  background-color: var(--header-background-color);
  padding: 18px 42px;
  gap: 28px 16px;
  border-bottom: var(--outline-separator);
}
</style>