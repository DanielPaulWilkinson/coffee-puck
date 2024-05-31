<script setup lang="ts">
import { ReactiveEffect, onMounted, toDisplayStringounted, reactive } from 'vue';


export type Heading = {
    id: string,
    title: string,
} 

export type Td = {
    value: string,
    id: string,
}

export type Row = {
    cells: Td[];
}

const props = defineProps<{
    id: string,
    headings: Heading[],
    rows: Row[],
    actions?: [],
    currentPage: 1,
    totalPages: 0,
}>();

const emit = defineEmits<{
    (on: "nextPage", value: number): void,
    (on: "previousPage", value: number): void
}>();

onMounted(() => {
    console.log(props.rows)
});

const editRecord = (index: number) => {
   console.log(index);
}

const deleteRecord = (index: number) => {
    console.log(index);
}

const state = reactive({
    currentEditableRowId: null,
});

</script>

<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th v-for="(title, index) in props.headings" scope="col">{{ title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, i) in props.rows">
                <td v-for="(td, ii) in row.cells">
                    <input v-if="i === state.currentEditableRowId && ii != 0" :value="td.value" />
                    <p v-else>{{ td.value }}</p>
                </td>
                <td>
                    <div>
                    <a href="#" @click.prevent="state.currentEditableRowId = i">
                        <font-awesome-icon :icon="['fas', 'coffee']" />
                    </a>
                    <a href="#" @click.prevent="deleteRecord(i)">
                        <font-awesome-icon :icon="['fas', 'coffee']" />
                    </a>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" :class="props.currentPage === 1 ? 'disabled' : ''" href="#"
            @click.prevent="emit('previousPage', props.currentPage - 1)">
            Previous
          </a>
        </li>
        <li class="page-item">
        <a class="page-link" href="#"
            :class="props.currentPage >= props.totalPages ? 'disabled' : ''"
            @click.prevent="emit('nextPage', props.currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
</template>
<style></style>