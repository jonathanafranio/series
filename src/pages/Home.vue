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

        @media (max-width: 575px)
            flex-direction: column

        .home-link
            margin: 0 15px
            padding: 5px 0
            transition: .4s
            color: var(--white)
            @include flex-center(true)
            
            @media (max-width: 575px)
                width: 280px
                margin-bottom: 5px

            @media (min-width: 576px)
                flex: 0 0 25%
                padding: 50px 0

            @media (min-width: 1024px)
                &:hover
                    transform: scale(1.1)
                    text-decoration: none

            &:first-child
                background-color: var(--blue)
            &:nth-child(2)
                background-color: var(--orange)
            &:last-child
                background-color: var(--red)

    .btn-exit
        color: var(--white)
        position: absolute
        @media (max-width: 575px)
            top: 0px
            right: 0px
            
        @media (min-width: 576px)
            top: 40px
            right: 40px

    h2
        @media (max-width: 575px)
            font-size: 1rem

</style>