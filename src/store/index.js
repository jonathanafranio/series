import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        token: '',
        watchlist: [],
        watchedlist: [],
        seriesList: [],
        serie: {}
    },
    getters: {
        hasToken: state => !!state.token
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setToken(state, payload) {
            state.token = payload
        },
        setWatchlist(state, payload) {
            state.watchlist = payload
        },
        setWatchedlist(state, payload) {
            state.watchedlist = payload
        },
        setSerieList(state, payload) {
            state.seriesList = payload
        },
        setSerie(state, payload) {
            state.serie = payload
        },
        showSerie(state, payload){
            state.serie = payload
        }
    },
    actions: {
        login({ dispatch }, payload){
            fetch('https://guarded-headland-11685.herokuapp.com/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(response =>{
                if(response.message == "Login efetuado com sucesso"){
                    dispatch('setUser', response.user)
                    dispatch('setToken', response.token)
    
                    //window.location = '/'
                    router.push({ name: 'home' })
                    
                } else {
                    alert('Nao foi possivel efetuar o login')
                }
            }).catch(err => console.log('err', err) )
        },
        checkToken({ dispatch }){
            if(localStorage.getItem('token')){
                dispatch('loadSession')
            } else {
                //window.location = '/login'
                router.push({ name: 'login' })
            }
        },
        loadSession({ dispatch }){
            fetch('https://guarded-headland-11685.herokuapp.com/load-session', {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }                
            })
            .then(res => res.json())
            .then(response => {
                if(response.message == 'Sua sessão é inválida ou está expirada') {
                    localStorage.clear()
                    
                } else {
                    dispatch('setUser', response.user)
                    dispatch('setToken', response.token)
                }              
            })
            .catch(() => {
                router.push({ name: 'login' })
                //window.location = '/login'
            })
        },
        setUser({ commit }, payload){
            commit('setUser', payload)
        },
        setToken({ commit }, payload){
            localStorage.setItem('token', payload)
            commit('setToken', payload)
        },
        logout({ dispatch }){
            localStorage.clear()
            dispatch('setUser', {})
            dispatch('setToken', '')
            router.push({name: 'login'})
        },
        findWatchlist({ commit }){
            fetch('https://guarded-headland-11685.herokuapp.com/user/watchlist',  {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => res.json())
            .then(watchlist => {
                commit('setWatchlist', watchlist.data)
            })

        },
        findWatchedlist({ commit }){
            fetch('https://guarded-headland-11685.herokuapp.com/user/watchedlist',  {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => res.json())
            .then(watchedlist => {
                commit('setWatchedlist', watchedlist.data)
            })

        },
        findSerieslist({ commit }){
            fetch('https://guarded-headland-11685.herokuapp.com/serie',  {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => res.json())
            .then(serielist => {
                commit('setSerieList', serielist.data)
            })
        },
        findSerie({ commit }, payload){
            fetch('https://guarded-headland-11685.herokuapp.com/serie/'+payload, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => res.json())
            .then(serie => {
                commit('showSerie', serie.data)
            })
        }
    }
})
