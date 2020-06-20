import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        token: ''
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
        }
    }
})
