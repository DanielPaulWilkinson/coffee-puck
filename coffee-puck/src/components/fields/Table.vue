<script setup lang="ts">
import { computed, onMounted, reactive, watch } from "vue";
import Text from "./Text.vue";
import type { brew, coffee } from "@/data/types";

export type Td = {
    value: string;
    id: string;
};

export type Row = {
    cells?: Td[];
};

const props = defineProps<{
    id: string;
    rows: coffee[] | brew[] | roaster[];
    currentPage: number;
    totalPages: number;
    editable?: boolean;
    caption: string;
    tableType: "horizontal" | "vertical";
}>();

const emit = defineEmits<{
    (on: "nextPage", value: number): void;
    (on: "previousPage", value: number): void;
    (on: "save", value: unknown): void;
    (on: "delete", value: any): void;
}>();

const updateTableData = computed(() => props.tableType === "horizontal"
    ? updateTableDataHorizontal()
    : updateTableDataVertical());

const updateTableDataHorizontal = () => {
    state.headings = [];
    state.rows = [];

    if (props.rows[0]) {
        let dataKeys = Reflect.ownKeys(props.rows[0]);
        dataKeys.forEach((key) => {
            state.headings.push(key.toString());
        });

        props.rows.forEach((row) => {
            const c: Row = [] as Row;
            c.cells = [];
            const keys = Reflect.ownKeys(row);
            keys.forEach((key) => {
                c.cells?.push({
                    id: key.toString(),
                    value: Reflect.get(row, key),
                });
            });
            state.rows?.push(c);
        });
    }
};

const updateTableDataVertical = () => {
    state.headings = [];
    state.rows = [];

    if (props.rows[0]) {
        const dataKeys = Reflect.ownKeys(props.rows[0]);
        dataKeys.forEach((key) => {
            state.headings.push(key.toString());
        });

        state.headings.forEach((key) => {
            const c: Row = [] as Row;
            c.cells = [];
            props.rows.forEach((row) => {
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
    updateTableData.value;
});

watch(
    () => [props.rows, props.tableType],
    () => {
        updateTableData.value;
    },
);

const reconstruct = (row: Row, columnId: number = 0) => {
    let data = {};
    if (props.tableType === 'horizontal') {
        let keys = row.cells?.flatMap((x) => x.id);
        keys?.forEach((key) => {
            Reflect.set(data, key, row.cells?.find((x) => x.id === key)?.value);
        });
    } else {
        if (state.rows) {
            state.rows.forEach(element => {

                if(element.cells === undefined){
                    return;
                }

                const r = element.cells[columnId];
                console.log(r);
                const key = r.id;
                Reflect.set(data, key, r.value);
            });
        }
    }
    return data;
};

export type State = {
    currentEditableRowOrColumnId: number | null;
    rows: Row[] | null;
    headings: string[];
    showExtraData: boolean;
};

const clearInputsOFEditableRow = () => (state.currentEditableRowOrColumnId = null);
const undoChanges = () => {
    clearInputsOFEditableRow();
    updateTableData.value;
};

const state = reactive<State>({
    currentEditableRowOrColumnId: null,
    showExtraData: false,
    rows: [],
    headings: [],
});

</script>

<template>
    <table :id="`${props.id}-${props.tableType}`">
        <caption>
            {{
        caption
    }}
        </caption>
        <thead v-if="props.tableType === 'horizontal'">
            <tr class="table-th">
                <th v-for="title in state.headings" scope="col">
                    {{ title }}
                </th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, i) in state.rows">
                <th class="vertical-th" v-if="props.tableType === 'vertical'">
                    {{ state.headings[i] }}
                </th>
                <td v-for="(td, ii) in row.cells" scope="col">
                    <Text :id="`input-row-${i}-cell-${ii}`" type="text" v-if="(i === state.currentEditableRowOrColumnId && ii != 0 && props.tableType === 'horizontal') ||
        (ii === state.currentEditableRowOrColumnId && props.tableType === 'vertical')" :model-value="td.value"
                        @input="td.value = $event.target.value" error="ew" />
                    <p v-else>{{ td.value }}</p>
                </td>
                <td v-if="props.tableType === 'horizontal'" class="text-center">
                    <div v-if="i !== state.currentEditableRowOrColumnId">
                        <a class="margin-right" href="#" @click.prevent="
        state.currentEditableRowOrColumnId = i;
    state.showExtraData = true;
    ">
                            <font-awesome-icon :icon="['fas', 'eye']" />
                        </a>
                        <a class="margin-right" href="#" @click.prevent="state.currentEditableRowOrColumnId = i">
                            <font-awesome-icon :icon="['fas', 'edit']" />
                        </a>
                        <a href="#" @click.prevent="emit('delete', i)">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </a>
                    </div>
                    <div v-else>
                        <a class="margin-right" href="#" @click.prevent="
        emit('save', reconstruct(row as Row));
    clearInputsOFEditableRow();
    ">
                            <font-awesome-icon :icon="['fas', 'save']" />
                        </a>
                        <a href="#" @click.prevent="undoChanges()"><font-awesome-icon :icon="['fas', 'cancel']" /></a>
                    </div>
                </td>
            </tr>
            <tr v-if="props.tableType === 'vertical'">
                <th>Actions</th>
                <td v-for="(row, i) in props.rows" class="text-center">
                    <div v-if="i !== state.currentEditableRowOrColumnId">
                        <a class="margin-right" href="#" @click.prevent="
        state.currentEditableRowOrColumnId = i;
    state.showExtraData = true;
    ">
                            <font-awesome-icon :icon="['fas', 'eye']" />
                        </a>
                        <a class="margin-right" href="#" @click.prevent="state.currentEditableRowOrColumnId = i">
                            <font-awesome-icon :icon="['fas', 'edit']" />
                        </a>
                        <a href="#" @click.prevent="emit('delete', i)">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </a>
                    </div>
                    <div v-else>
                        <a class="margin-right" href="#" @click.prevent="
        emit('save', reconstruct(row as Row, i));
    clearInputsOFEditableRow();
    ">
                            <font-awesome-icon :icon="['fas', 'save']" />
                        </a>
                        <a href="#" @click.prevent="undoChanges()"><font-awesome-icon :icon="['fas', 'cancel']" /></a>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
                <a class="previous" :class="props.currentPage === 1 ? 'disabled' : ''" href="#" @click.prevent="
        emit('previousPage', props.currentPage - 1);
    clearInputsOFEditableRow();
    ">
                    Previous
                </a>
            </li>
            <li class="page-item">
                <a class="next" href="#" :class="props.currentPage >= props.totalPages ? 'disabled' : ''
        " @click.prevent="
        emit('nextPage', props.currentPage + 1);
    clearInputsOFEditableRow();
    ">Next</a>
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
    padding: 5px 5px;
}

td {
    text-wrap: wrap;
    display: table-cell;
    word-wrap: break-word;
}

#test-horizontal tr:hover :not(tr > th) {
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

.vertical-th {
    width: 100px;
}
</style>
