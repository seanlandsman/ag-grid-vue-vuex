<template>
    <div>
        <div class="exchange">
            Current Exchange:
            <select v-model="currentExchange">
                <option v-for="exchange in this.$store.state.exchanges" v-bind:value="exchange">
                    {{ exchange.exchange }}
                </option>
            </select>
        </div>
        <ag-grid-vue style="width: 500px; height: 300px;"
                     class="ag-theme-balham"
                     :columnDefs="columnDefs"
                     v-model="rowData"
                     deltaRowMode
                     getRowid
                     :components="components"
                     @first-data-rendered="onFirstDataRendered">
        </ag-grid-vue>
    </div>
</template>

<script>
import {AgGridVue} from "ag-grid-vue";
import TradeCellRenderer from "./components/TradeCellRenderer";

export default {
    name: 'App',
    data() {
        return {
            columnDefs: [
                {
                    field: 'trader',
                    sort: 'asc',
                    editable: true
                },
                {
                    headerName: 'Total Amount',
                    field: 'amount',
                    valueFormatter: (data) => `${this.currentExchange.currency}${data.value}`
                },
                {
                    headerName: 'Trade',
                    cellRendererFramework: 'TradeCellRenderer'
                },
            ],
            currentExchange: null,
            components: {
                TradeCellRenderer
            },
            rowData: null
        }
    },
    components: {
        AgGridVue,
        TradeCellRenderer
    },
    beforeMount() {
        this.currentExchange = this.$store.state.exchanges[0];
    },
    mounted() {
        this.rowData = Object.freeze(
            this.copyRowData(this.$store.getters.tradesForExchange(this.currentExchange.exchange))
        );
    },
    watch: {
        currentExchange() {
            this.updateRowData();
        },
        cumulativeTrades(newTrades, oldTrades) {
            this.updateRowData();
        }
    },
    computed: {
        cumulativeTrades() {
            return this.$store.state.cumulativeTrades;
        }
    },
    methods: {
        onFirstDataRendered(params) {
            params.api.sizeColumnsToFit();
        },
        updateRowData() {
            this.rowData = Object.freeze(
                this.copyRowData(this.$store.getters.tradesForExchange(this.currentExchange.exchange))
            );
        },
        copyRowData(data) {
            return data.map(datum => {
                return {
                    ...datum
                }
            })
        }
    }
}
</script>

<style lang="css" scoped>
@import '~ag-grid-community/dist/styles/ag-grid.css';
@import '~ag-grid-community/dist/styles/ag-theme-balham.css';

.exchange {
    margin-bottom: 10px;
}
</style>
