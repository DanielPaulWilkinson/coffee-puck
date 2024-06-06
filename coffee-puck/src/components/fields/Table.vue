<script setup lang="ts">
import { onMounted, reactive, watch } from "vue";
import Text from "./Text.vue";
import type { Brew, Coffee } from "@/stores/brewPagination";

export type Td = {
    value: string;
    id: string;
};

export type Row = {
    cells?: Td[];
};

const props = defineProps<{
    id: string,
    rows: Coffee[] | Brew[],
    currentPage: number,
    totalPages: number,
    editable?: boolean,
    caption: string, 
    tableType?: "horizontal" | "vertical",
}>();

const emit = defineEmits<{
    (on: "nextPage", value: number): void;
    (on: "previousPage", value: number): void;
    (on: "save", value: unknown): void;
    (on: "delete", value: any): void;
}>();

const updateTableData = () => {
    state.headings = [];
    state.rows = [];

    if (props.rows[0]) {
        const dataKeys = Reflect.ownKeys(props.rows[0]);
        dataKeys.forEach((key) => {
            state.headings.push(key.toString());
        });

        props.rows.forEach((row) => {
            const c: Row = [] as Row;
            c.cells = [];
            const keys = Reflect.ownKeys(row);
            keys.forEach((key) => {
                // console.log(typeof Reflect.get(row, key));
                c.cells?.push({
                    id: key.toString(),
                    value: Reflect.get(row, key),
                });
            });
            state.rows?.push(c);
        });
    }
};

onMounted(() => {
    updateTableData();
});

watch(
    () => props.rows,
    () => {
        updateTableData();
    },
);

const reconstruct = (row: Row) => {
    let data = {};
    let keys = row.cells?.flatMap((x) => x.id);

    keys?.forEach((key) => {
        Reflect.set(data, key, row.cells?.find((x) => x.id === key)?.value);
    });

    return data;
};

const deleteRecord = (index: number) => {
    console.log(index);
};

export type State = {
    currentEditableRowId: number | null;
    rows: Row[] | null;
    headings: string[];
    showExtraData: boolean;
};

const clearInputsOFEditableRow = () => (state.currentEditableRowId = null);
const undoChanges = () => {
    clearInputsOFEditableRow();
    updateTableData();
};

const state = reactive<State>({
    currentEditableRowId: null,
    showExtraData: false,
    rows: [],
    headings: [],
});
</script>

<template>
    <table :id="id">
        <caption>
            {{ caption }}
        </caption>
        <thead>
            <tr class="table-th">
                <th v-for="title in state.headings" scope="col">
                    {{ title }}
                </th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, i) in state.rows">
                <td v-for="(td, ii) in row.cells" scope="col">
                    <Text
                        :id="`input-row-${i}-cell-${ii}`"
                        type="text"
                        v-if="i === state.currentEditableRowId && ii != 0"
                        :model-value="td.value"
                        @input="td.value = $event.target.value"
                        error="ew"
                    />
                    <p v-else>{{ td.value }}</p>
                </td>
                <td class="text-center">
                    <div v-if="i !== state.currentEditableRowId">
                        <a
                            class="margin-right"
                            href="#"
                            @click.prevent="
                                state.currentEditableRowId = i;
                                state.showExtraData = true;
                            "
                        >
                            <font-awesome-icon :icon="['fas', 'eye']" />
                        </a>
                        <a
                            class="margin-right"
                            href="#"
                            @click.prevent="state.currentEditableRowId = i"
                        >
                            <font-awesome-icon :icon="['fas', 'edit']" />
                        </a>
                        <a href="#" @click.prevent="deleteRecord(i)">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </a>
                    </div>
                    <div v-else>
                        <a
                            class="margin-right"
                            href="#"
                            @click.prevent="
                                emit('save', reconstruct(row));
                                clearInputsOFEditableRow();
                            "
                        >
                            <font-awesome-icon :icon="['fas', 'save']" />
                        </a>
                        <a href="#" @click.prevent="undoChanges()"
                            ><font-awesome-icon :icon="['fas', 'cancel']"
                        /></a>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
                <a
                    class="previous"
                    :class="props.currentPage === 1 ? 'disabled' : ''"
                    href="#"
                    @click.prevent="
                        emit('previousPage', props.currentPage - 1);
                        clearInputsOFEditableRow();
                    "
                >
                    Previous
                </a>
            </li>
            <li class="page-item">
                <a
                    class="next"
                    href="#"
                    :class="
                        props.currentPage >= props.totalPages ? 'disabled' : ''
                    "
                    @click.prevent="
                        emit('nextPage', props.currentPage + 1);
                        clearInputsOFEditableRow();
                    "
                    >Next</a
                >
            </li>
        </ul>
    </nav>
</template>
<style scoped>
table,
td,
th {
    border: 1px solid;
}
table {
    width: 100%;
    border-collapse: collapse;
}
th {
    font-family: marker;
    font-weight: bold;
    background: #876;
    padding: 10px 10px;
}

td p {
    margin: 0;
    text-wrap: nowrap;
    overflow: hidden;
    width: 50px;
}

td {
    padding: 0 5px;
}
tr:hover :not(tr > th) {
    background: #876;
    opacity: 0.9;
}

nav {
    float: right;
}

.pagination .page-item a {
    background: #876;
    color: white;
    font-family: marker;
}

.previous {
    border-start-start-radius: 10px;
    border-end-start-radius: 10px;
}

.next {
    border-end-end-radius: 10px;
    border-start-end-radius: 10px;
}

nav li a:hover {
    color: #000 !important;
}

nav li a {
    display: block;
    padding: 10px;
    text-decoration: none;
    border: 1px solid #000;
}

</style>
