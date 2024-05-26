
<script setup lang="ts">

const props = defineProps({
    images: []
})

</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col text-center">
                <p>Avg Variety</p>
                <h1>Aribca</h1>
            </div>
            <div class="col text-center">
                <p>Avg Coffee</p>
                <h2>Christmas Blend</h2>
            </div>
            <div class="col text-center">
                <p>Avg Rating</p>
                <h1>3/5</h1>
            </div>
        </div>
    </div>
</template>
<style>
.background {
    background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp');
    ;
}

.mask {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px;
}
</style>