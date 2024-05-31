
<script setup lang="ts">
import { useCoffeeStore } from '../stores/coffeeStore';
import { getbrews } from '../data/brew'
import { onMounted, reactive, watch } from 'vue';
const store = useCoffeeStore()

//populate store
onMounted(async () => {
  callData(1)
})

async function callData(page: number) {
  const result = await getbrews(page, 50, "id", "DESC");
  store.data = result.data;
  store.pagination = result.pagination;
}
</script>
<template>
        <div class="row rowMargin">
      <div class="col-3" v-for="(brew) in store.data">
        <div class="card">
          <img src="https://howdencoffee.co.uk/wp-content/uploads/2022/08/HC-116.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Coffee at {{ brew.acidity }}</h5>
            <a href="#" class="btn btn-primary">View Experience</a>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" :class="store.pagination.current_page === 1 ? 'disabled' : ''" href="#"
            @click="callData(store.pagination.prev_page)">
            Previous
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#"
            :class="store.pagination.current_page >= store.pagination.total_pages ? 'disabled' : ''"
            @click="callData(store.pagination.next_page)">Next</a></li>
      </ul>
    </nav>
</template>