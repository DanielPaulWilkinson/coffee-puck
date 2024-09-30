<script lang="ts" setup>
import { brew, coffee, roaster } from '@/data/types';


type card = {
    data: coffee[] | roaster[] | null,
    type: "coffee" | "roaster"
}

const props = withDefaults(defineProps<card>(), {
    data: null,
    type: "coffee"
});

const getUrl = (id: number) => {
    if (props.data) {
        if (props.type === "coffee") {
            return `/manage-coffee?id=${id}`
        }
        else if (props.type === "roaster"){
            return `/manage-roasters?id=${id}`
        }
    }
}

</script>
<template>
    <div class="card result-card" style="width: 18rem;" v-for="(item, index) in data">
        <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ "" }}</p>
            <a :href="getUrl(item.id ?? 0)" class="btn btn-primary">View</a>
        </div>
    </div>
</template>
