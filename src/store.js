import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        test: 'abc',
        exchanges: [
            {
                exchange: 'NASDAQ',
                country: 'United States',
                currency: '$',
                rate: 1.0
            },
            {
                exchange: 'LSE',
                country: 'United Kingdom',
                currency: '£',
                rate: 0.8
            }
        ],
        cumulativeTrades: [
            {trader: 'Joe', amount: 1000, exchange: 'NASDAQ'},
            {trader: 'Sarah', amount: 1500, exchange: 'LSE'},
            {trader: 'Bob', amount: 790, exchange: 'NASDAQ'},
            {trader: 'Mary', amount: 650, exchange: 'LSE'},
            {trader: 'Jane', amount: 600, exchange: 'NASDAQ'},
            {trader: 'Henry', amount: 6500, exchange: 'LSE'},
            {trader: 'Manuel', amount: 1300, exchange: 'NASDAQ'},
            {trader: 'Vito', amount: 105, exchange: 'LSE'},
            {trader: 'Joe', amount: 560, exchange: 'LSE'},
            {trader: 'Sarah', amount: 454, exchange: 'NASDAQ'},
            {trader: 'Bob', amount: 530, exchange: 'LSE'},
            {trader: 'Mary', amount: 544, exchange: 'NASDAQ'},
            {trader: 'Jane', amount: 750, exchange: 'LSE'},
            {trader: 'Henry', amount: 434, exchange: 'NASDAQ'},
            {trader: 'Manuel', amount: 404, exchange: 'LSE'},
            {trader: 'Vito', amount: 605, exchange: 'NASDAQ'},
        ]
    },
    getters: {
        tradesForExchange: state =>
            exchange =>
                state.cumulativeTrades.filter(trade => trade.exchange === exchange)
    },
    mutations: {
        cumulativeTradesForExchange(state, {exchange, cumulativeTrades}) {
            state.cumulativeTrades =
                state.cumulativeTrades.filter(trade => trade.exchange !== exchange).concat(cumulativeTrades);
        },
        setCurrentExchange(state, exchange) {
            state.currentExchange = exchange;
        },
        executeTrade(state, newTrade) {
            const existingTrade = state.cumulativeTrades
                .filter(trade => trade.trader === newTrade.trader && trade.exchange === newTrade.exchange)[0];

            state.cumulativeTrades = [
                ...state.cumulativeTrades.filter(trade => trade !== existingTrade),
                {
                    ...newTrade,
                    amount: newTrade.amount + existingTrade.amount
                }
            ];
        }
    },
    actions: {
        cumulativeTradesForExchange({commit}, {exchange, cumulativeTrades}) {
            commit('cumulativeTradesForExchange', {exchange, cumulativeTrades});
        },
        setCurrentExchangeAsync({commit}, exchange) {
            setTimeout(() => {
                commit('setCurrentExchange', exchange)
            }, 1000)
        }
    }
})
