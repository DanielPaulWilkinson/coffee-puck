<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';

const props = withDefaults(defineProps<{
    id: string,
    starCount?: number,
    readonly?: boolean
    modelValue: number,
}>(), {
  starCount: 5,
  readonly: false,
});

const emit = defineEmits<{
    (on: "update:modelValue", index: number): void
}>();


type stars = {
  stars: star[],
}

type star = {
  active: boolean,
  index: number,
}

const state = <stars>reactive({
  stars: [],
});



onMounted(() => {
    if(props.modelValue > props.starCount){
      throw new Error("fill count is more than star count");
    }

    for(let i = 0; i < props.starCount; i++){
      state.stars.push({
        active: false,
        index: i,
      });
    }
    for(let i = 0; i < props.modelValue; i++){
      state.stars[i].active = true;
    };
});

watch(() => props.modelValue, () => {
  for(let i = 0; i < props.modelValue; i++){
      state.stars[i].active = true;
    };
});

const highlightTo = (selectedIndex: number) => {
  state.stars.forEach((star) => {
      star.index <= selectedIndex ? star.active = true  : star.active = false;
  });

  emit("update:modelValue", selectedIndex);
}

</script>
<template>
    <div class="rating-box">
      <div class="stars">
        <font-awesome-icon 
          :class="[star.active ? 'active' : '',
           props.readonly ? 'readonly' : '']"
          v-for="(star, index) in state.stars" 
          :icon="['fas', 'star']" 
          @click="props.readonly ? '' : highlightTo(index)" />
      </div>
    </div>
</template>

<style scoped lang="scss">
.readonly{
  cursor:default;
}

.rating-box {
  border-radius: 25px;
  text-align: center;
  margin: 10px 0;
}
.rating-box .stars {
  display: flex;
  align-items: center;
  gap: 5px;
}
.stars svg {
  font-size: 20px;
  color: #b5b8b1;
  transition: all 0.2s;
  cursor: pointer;
}
.stars svg.active {
  color: #ffb851;
  transform: scale(1.2);
}
</style>