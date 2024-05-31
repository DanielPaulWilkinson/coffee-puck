<script setup lang="ts">
const props = withDefaults(defineProps<{
        headings: [],
        data: []
        actions: []
    }>(), {
        headings: [],
    });

onMounted(() => {
    //check actions
    console.log("");
    

})
</script>



<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th v-for="(title, index) in props.headings" scope="col">{{title}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in props.data">
                <th scope="row">row.name</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>
                    <font-awesome-icon :icon="['fas', 'coffee']" />
                    <font-awesome-icon :icon="['fas', 'coffee']" />
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style></style>