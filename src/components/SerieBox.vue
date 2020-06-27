<template>
    <router-link class="card mb-4" :to="{ name: 'show-serie', params: { id: serie.id } }">
        <div class="card-image-top">
            <img :src="serie.image.replaceAll('32','300').replaceAll('44','312')" :alt="serie.title">
        </div>
        <div class="card-body">
            <h3 class="text-center mb-0">{{ serie.title }}</h3>
            <div class="row mt-3 text-center">
                <div class="col-12">
                    <button :id="'watchlist-'+serie.id" class="btn btn-sm btn-outline-primary btn-block"
                     @click.prevent="toggleWatchlist($event.target.id)"
                     :disabled="serie.watched">
                        <span class="spinner-border spinner-border-sm text-light"></span>
                        {{ serie.watchlist ? 'Remover do Quero assistir' : 'Quero assistir' }}
                    </button>
                </div>
                <div class="col-12 mt-2">
                    <button :id="'watched-'+serie.id" class="btn btn-sm btn-outline-warning btn-block" @click.prevent="toggleWatchedlist($event.target.id)">
                        <span class="spinner-border spinner-border-sm"></span>
                        {{ serie.watched ? 'Remover do Já assisti' : 'Já assisti' }}
                    </button>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        props: {
            serie: { type: Object, required: true }
        },
        methods: {
            ...mapActions([
                'findSerieslist',
                'findWatchedlist',
                'findWatchlist',

                'addOnWatchedlist',
                'addOnWatchlist',

                'deleteFromWatchedlist',
                'deleteFromWatchlist'
            ]),
            async toggleWatchlist(idBtn) {
                try {
                    document.getElementById(idBtn).classList.add('loading')
                    if (this.serie.watched) {
                        await this.deleteFromWatchedlist(this.serie.id)
                    }
                    if(this.serie.watchlist){
                        await this.deleteFromWatchlist(this.serie.id)
                    } else {
                        await this.addOnWatchlist({ serieId: this.serie.id })
                    }

                    await this.refresh()
                } catch(error) {
                    console.error(error)
                }
            },
            async toggleWatchedlist(idBtn){
                try {
                    document.getElementById(idBtn).classList.add('loading')
                    if(this.serie.watched){
                        await this.deleteFromWatchedlist(this.serie.id)
                    } else {
                        await this.addOnWatchedlist({ serieId: this.serie.id })
                    }

                    await this.refresh()
                } catch(error) {
                    console.error(error)
                }
            },
            refresh() {
                const { name } = this.$route
                if(name === 'series'){                    
                    return this.findSerieslist()
                }
                if(name === 'watchedlist'){
                    return this.findWatchedlist()
                }
                if(name === 'watchlist'){
                    return this.findWatchlist()
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
.card
    cursor: pointer
    transition: .4s
    color: var(--white)
    background: var(--dark)
    overflow: hidden
    &:hover
        text-decoration: none
        background: #202020
    
        .btn-outline-primary:not([disabled])
            background: #007bff
            color: var(--white)
        
        .btn-outline-warning
            background: #ffc107
            color: #212529

    h3
        min-height: 40px
        font-size: 1rem

.btn
    &[disabled]
        opacity: .6

    .spinner-border
        display: none
    
    &.loading
        .spinner-border
            display: inline-block

.card-image-top
    width: 100%
    text-align: center
    img
        display: inline-block
        max-width: 100%
        max-height: 100%
        vertical-align: top
        position: relative
        object-fit: cover

</style>