<script setup lang="ts">
import { useCoffeePagination} from '../stores/coffeePagination';
import { getCoffees, type Coffee } from '@/data/coffee';
import Statistics from '../components/Statistics.vue';
import Table from '../components/pagtable.vue';
import { onMounted } from 'vue';
import type { Row } from '../components/PagTable.vue';
const store = useCoffeePagination()


async function callData(page: number) {
  const result = await getCoffees(page, 2, "id", "DESC");
  store.data = result.data;
  store.pagination = result.pagination;
}

onMounted(() => {
  callData(1);
})

const coffeeToTable = (data: Coffee[]) => {
  let coffeeData: Row[] = [];
  data.forEach((coffee: Coffee) => {
    let c: Row = [];    
    c.cells = [{ value: coffee.id.toString()}, { value: coffee.name.toString() }, { value: coffee.createdOn }]
    coffeeData.push(c);
  }); 
  return coffeeData;
}

</script>
<template>
  <div class="container-fluid">
    <div class="row mt-4">
      <div class="col-12">
        <Statistics />
      </div>
    </div>
    <Table id="test" 
      :headings="['#','name', 'created on']" 
      :rows="coffeeToTable(store.data)" 
      :current-page="store.pagination.current_page"
      :totalPages="store.pagination.total_pages"
      @previous-page="callData($event)" 
      @next-page="callData($event)"/>
    </div>
    </template>
<style>
.margin-top-20 {
  margin-top: 20px;
}
</style>
