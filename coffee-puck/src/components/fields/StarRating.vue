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
    <div :id="id" class="rating-box">
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