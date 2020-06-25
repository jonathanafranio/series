import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const baseUrl = 'https://guarded-headland-11685.herokuapp.com'

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
            fetch(baseUrl+'/login',{
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
                router.push({ name: 'login' })
            }
        },
        loadSession({ dispatch }){
            fetch(baseUrl+'/load-session', {
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
            fetch(baseUrl+'/user/watchlist',  {
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
            fetch(baseUrl+'/user/watchedlist',  {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => res.json())
            .then(watchedlist => {
                commit('setWatchedlist', watchedlist.data)
                
            })
            .catch((err) => {
                console.log('err', err)
            })

        },
        findSerieslist({ commit }){
            fetch(baseUrl+'/serie',  {
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
            fetch(baseUrl+'/serie/'+payload, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => res.json())
            .then(serie => {
                commit('showSerie', serie.data)
            })
        },

        addOnWatchedlist(context, payload){
            fetch(baseUrl+'/user/serie/watched', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(response => {
                document.getElementById('modalLabel').innerHTML = 'Adicionado...'
                document.getElementById('modalBody').innerHTML = response.message
                document.getElementById('modal').classList.add('show')
            })
        },
        deleteFromWatchedlist(context, payload){
            fetch(baseUrl+'/user/serie/watched/'+payload, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(()=>{
                document.getElementById('modalLabel').innerHTML = 'Removido...'
                document.getElementById('modalBody').innerHTML = 'Série removida da lista de já assistidas'
                document.getElementById('modal').classList.add('show')
                console.log('Série removida da lista de já assistidas')                
            })
        },

        addOnWatchlist(context, payload){
            fetch(baseUrl+'/user/serie/watchlist', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(response => {
                document.getElementById('modalLabel').innerHTML = 'Adicionado...'
                document.getElementById('modalBody').innerHTML = response.message
                document.getElementById('modal').classList.add('show')
            })
        },
        deleteFromWatchlist(context, payload){
            fetch(baseUrl+'/user/serie/watchlist/'+payload, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(()=>{
                document.getElementById('modalLabel').innerHTML = 'Removido...'
                document.getElementById('modalBody').innerHTML = 'Série removida da watchlist'
                document.getElementById('modal').classList.add('show')
                console.log('Série removida da lista de favoritas')                
            })
        }
    }
})
