<template>
    <header class="header" :class="{headerFixed: headerFixed}">
        <nav class="navbar navbar-expand-lg">
            <button class="btn btn-mobile" @click="toggleMenu()">
                <i class="material-icons">
                    <template v-if="menuMobile">menu_open</template>
                    <template v-else>menu</template>
                </i>
            </button>
            <router-link class="navbar-brand" :to="{ name: 'home' }">Series</router-link>

            <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <router-link
                 exact
                 :key="i"
                 tag="li"
                 class="nav-item"
                 exact-active-class="active"
                 :to="{ name: route.name }"
                 v-for="(route, i) in routes">
                    <a href="#" class="nav-link" :title="route.meta.title">{{ route.meta.label }}</a>
                </router-link>
            </ul>
            </div>

            <button class="btn" @click="logOut">
                <i class="material-icons">exit_to_app</i>
            </button>
        </nav>

        <nav class="nav-mobile" :class="{show: menuMobile}">
            <ul class="nav flex-column">
                <router-link
                 exact
                 :key="i"
                 tag="li"
                 class="nav-item"
                 exact-active-class="active"
                 :to="{ name: route.name }"
                 v-for="(route, i) in routes">
                    <a href="#" class="nav-link" :title="route.meta.title" @click="toggleMenu()">{{ route.meta.label }}</a>
                </router-link>
            </ul>
        </nav>
    </header>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                menuMobile: false,
                headerFixed: false
            }
        },
        computed: {
            routes () {
                return this.$router.options.routes.filter(route => (
                    route.meta && route.meta.showNavbar
                ))
            }
        },
        created() {
            window.addEventListener('scroll', this.scrollHeader)
        },
        methods: {
            ...mapActions(['logout']),
            logOut(){
                this.logout()
            },
            toggleMenu(){
                this.menuMobile = !this.menuMobile
            },
            scrollHeader(){                                
                let hearderHeight = document.querySelector('header').offsetHeight;
                if(window.scrollY > hearderHeight) {
                    this.headerFixed = true
                } else {
                    this.headerFixed = false
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
.header
    display: block
    width: 100%
    z-index: 9
    &.headerFixed
        position: fixed
        top: 0
        left: 0

.navbar-expand-lg
    z-index: 9
.nav-mobile
    @media (min-width: 1024px)
        display: none
    
    @media (max-width: 1023px)
        display: block
        width: 256px
        height: 100vh
        padding-top: 64px
        border-right: 1px solid #000 
        position: absolute
        top: 0
        background: var(--dark)
        transform: translateX(-100%)
        transition: transform .4s
        will-change: transform
        z-index: 8
        &.show
            transform: translateX(0%)
    a
        color: var(--white)

.btn, a
    &:focus,
    &:hover
        outline: none
        box-shadow: none

.btn-mobile
    @media (min-width: 1024px)
        display: none
</style>