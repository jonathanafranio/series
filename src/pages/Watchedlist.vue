<template>
    <div class="container-fluid">
        <h1 class="mt-3">Já assisti</h1>
        <hr>

        <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6 cols-6"
             :key="item.id"
             v-for="item in watchedlist">
                <SerieBox :serie="item" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import SerieBox from '@/components/SerieBox'

    export default {
        name: 'Watchedlist',
        components: { SerieBox },
        mounted() {
            this.findWatchedlist()
        },
        computed: {
            ...mapState(['watchedlist'])
        },
        methods: {
            ...mapActions(['findWatchedlist'])
        }
    }
</script>

<style lang="sass" scoped>

</style>