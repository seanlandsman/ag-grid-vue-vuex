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
        <ag-grid-vue style="width: 500px; height: 500px;"
                     class="ag-theme-balham"
                     :columnDefs="columnDefs"
                     :rowData="rowData"
                     :components="components"
                     :firstDataRendered="this.onFirstDataRendered">
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
                        sort: 'asc'
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
                }
            }
        },
        computed: {
            rowData() {
                return this.$store.getters.tradesForExchange(this.currentExchange.exchange);
            }
        },
        components: {
            AgGridVue,
            TradeCellRenderer
        },
        beforeMount() {
            this.currentExchange = this.$store.state.exchanges[0];
        },
        methods: {
            onFirstDataRendered(params) {
                params.api.sizeColumnsToFit();
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