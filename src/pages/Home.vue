<template>
  <div id="home">
    <div class="user-info">
        <h2>Olá, {{ user.name }} ;)</h2>
        <p>Bem vindo ao Séries Wished</p>
    </div>

    <div class="home-links">
        <router-link :key="i" class="home-link" :to="{ name: route.name }" v-for="(route, i) in routes">
            <i class="material-icons md-48">
                {{ route.meta.icon }}
            </i>
            <span>{{ route.meta.label }}</span>
        </router-link>
    </div>

    <button class="btn btn-exit" @click="logOut">
      <i class="material-icons">exit_to_app</i>
    </button>   
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['user']),
    routes () {
      return this.$router.options.routes.filter(route => (
        route.meta && route.meta.showNavbar
      ))
    }
  },
  created(){
    this.$store.dispatch('checkToken')
  },
  methods: {
    ...mapActions(['logout']),
    logOut(){
      this.logout()
    }
  }
}
</script>

<style lang="sass">
=flex-center($columns)
    display: flex
    align-items: center
    justify-content: center
    @if $columns
        flex-direction: column

#home
    width: 100%
    height: 100vh
    justify-content: space-around
    @include flex-center(true)
    
    .user-info
        text-align: center
        
    .home-links
        width: 100%
        @include flex-center(false)

        .home-link
            flex: 0 0 25%
            margin: 0 15px
            padding: 50px 0
            transition: .4s
            color: var(--white)
            @include flex-center(true)

            &:hover
                transform: scale(1.1)
                text-decoration: none
                box-shadow: 0 10px 20px rgba(0,0,0,0.5)

            &:first-child
                background-color: var(--blue)
            &:nth-child(2)
                background-color: var(--orange)
            &:last-child
                background-color: var(--red)

    .btn-exit
        position: absolute
        top: 40px
        right: 40px

</style>