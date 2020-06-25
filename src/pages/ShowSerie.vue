<template>
    <div class="page-serie">
        <p v-if="loading">Aguarde um momento...</p>
        <template v-else>
            <h1>{{ serie.title }}</h1>
            <img :src="serie.image.replaceAll('32','300').replaceAll('44','312')" :alt="serie.title" loading="lazy">
        </template>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'

    export default {
        data(){
            return {
                loading: true
            }
        },
        mounted () {
            this.getData()
        },
        computed: {
            ...mapState(['serie'])
        },
        methods: {
            ...mapActions(['findSerie']),
            async getData () {
                try {
                    await this.findSerie(this.$route.params.id)
                } catch(err) {
                    alert('Não foi possível carregar a página')
                } finally {
                    this.loading = false
                }
            }
        },
    }
</script>

<style lang="sass" scoped>
.page-serie
    display: flex
    align-items: center
    flex-direction: column
    justify-content: center
    height: calc(100vh - 56px)
</style>