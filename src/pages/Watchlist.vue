<template>
    <div class="container-fluid">
        <h1 class="mt-3">Quero assistir</h1>
        <hr>

        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6 cols-6"
             :key="item.id"
             v-for="item in watchlist">
                <SerieBox :serie="item" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import SerieBox from '@/components/SerieBox'

    export default {
        name: 'Watchlist',
        components: { SerieBox },
        mounted() {
            this.findWatchlist()
        },
        computed: {
            ...mapState(['watchlist'])
        },
        methods: {
            ...mapActions(['findWatchlist'])
        }
    }
</script>

<style lang="sass" scoped>

</style>