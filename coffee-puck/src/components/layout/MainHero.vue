<script setup lang="ts">
defineProps({
    images: []
})

</script>
<template>
    <div class="p-5 text-center bg-image rounded-3 background">
        <div class="mask" style="">
            <div class="d-flex justify-content-center align-items-center h-100">
                <div class="text-white">
                    <h1 class="mb-3">The Coffee Puck</h1>
                    <h4 class="mb-3">Add A Brew</h4>
                    <a class="btn btn-outline-light btn-lg" href="#!" role="button">Create Brew</a>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.background {
    background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp');
}

.mask {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px;
}
</style>