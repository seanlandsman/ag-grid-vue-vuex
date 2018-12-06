<template>
    <div>
        <input v-model.number="amount" type="number" class="amount">
        <input v-on:click="this.submitTrade" value="Buy" type="button" :disabled="!amount" class="submit">
    </div>
</template>

<script>
    export default {
        name: 'TradeCellRenderer',
        data() {
            return {
                amount: null
            }
        },
        methods: {
            submitTrade() {
                const {trader, exchange} = this.params.data;
                this.$store.commit('executeTrade', {
                    trader,
                    exchange,
                    amount: this.amount
                });

                this.amount = null;
            }
        }
    }
</script>

<style scoped>
    input {
        margin: 3px;
    }

    .amount {
        width: 80px
    }

    .submit {
        width: 50px;
        border-radius: 5px;
    }
</style>
