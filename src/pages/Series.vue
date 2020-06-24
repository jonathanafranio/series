<template>
    <div class="container-fluid">
        <h1 class="mt-3">Todas as séries</h1>
        <hr>

        <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-4 cols-6"
             :key="item.id"
             v-for="item in seriesList">
                <SerieBox :serie="item" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import SerieBox from '@/components/SerieBox'

    export default {
        name: 'Series',
        components: { SerieBox },
        mounted() {
            this.findSerieslist()
        },
        computed: {
            ...mapState(['seriesList'])
        },
        methods: {
            ...mapActions(['findSerieslist'])
        }
    }
</script>

<style lang="sass" scoped>

</style>