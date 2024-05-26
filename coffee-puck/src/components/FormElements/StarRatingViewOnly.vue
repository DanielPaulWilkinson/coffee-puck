<script setup lang="ts">

    const props = withDefaults(defineProps<{
        id: string,
        starCount: number,
        fillPercentage: number,
    }>(), {
      starCount: 5,
      fillPercentage: 10,
    });

const emit = defineEmits<{
    (on: "update:modelValue", value: string): void
}>();

</script>
<template>
  <div class="container" :style="`--percent: ${props.fillPercentage}%`">
  <div class="rating">
    <div class="star yellow">
      <font-awesome-icon :icon="['fas', 'star']" />
      <font-awesome-icon :icon="['fas', 'star']" />
      <font-awesome-icon :icon="['fas', 'star']" />
      <font-awesome-icon :icon="['fas', 'star']" />
      <font-awesome-icon :icon="['fas', 'star']" />
    </div>
  </div>
  <div class="star grey">
    <font-awesome-icon :icon="['fas', 'star']" />
    <font-awesome-icon :icon="['fas', 'star']" />
    <font-awesome-icon :icon="['fas', 'star']" />
    <font-awesome-icon :icon="['fas', 'star']" />
    <font-awesome-icon :icon="['fas', 'star']" />
  </div>
</div>
</template>

<style scoped lang="scss">
.container {
  --star-fill-color: yellow;
  --star-grey-color: #444;
  --box-border-color: #777;
  --box-padding: 10px;
}

.container {
  border-radius: 5px;
  padding: var(--box-padding);
  width: min-content;
  font-size: 20px;
  color: var(--star-grey-color);
  position: relative;
  z-index: 2;
}

.star {
  display: flex;
}

.star.yellow {
  color: var(--star-fill-color);
}

.rating {
  width: var(--percent, 0%);
  height: 100%;
  overflow: hidden;
}

.grey {
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  z-index: -1;
}
</style>