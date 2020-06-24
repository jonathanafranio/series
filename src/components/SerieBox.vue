<template>
    <router-link class="card mb-4" :to="{ name: 'show-serie', params: { id: serie.id } }">
        <img :src="serie.image" :alt="serie.title" class="card-image-top">
        <div class="card-body">
            <h3 class="text-center mb-0">{{ serie.title }}</h3>
            <div class="row mt-3 text-center">
                <div class="col">
                    <button class="btn btn-sm btn-primary btn-block" @click.prevent="toggleWatchlist()">
                        {{ serie.watchlist ? 'Não quero assistir' : 'Quero assistir' }}
                    </button>
                </div>
                <div class="col">
                    <button class="btn btn-sm btn-warning btn-block" @click.prevent="toggleWatchedlist()">
                        {{ serie.watched ? 'Não assisti' : 'Já assisti' }}
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
            async toggleWatchlist() {
                try {
                    if (this.serie.watched) {
                        await this.deleteFromWatchedlist(this.serie.id)
                    }
                    if(this.serie.watchlist){
                        await this.deleteFromWatchlist(this.serie.id)
                        //console.log('vai tomar no cu deleta essa porra!!!');
                        
                    } else {
                        await this.addOnWatchlist({ serieId: this.serie.id })
                        //console.log('vai tomar no cu add essa porra!!!');
                    }

                    await this.refresh()
                } catch(error) {
                    console.error(error)
                }
            },
            async toggleWatchedlist(){
                try {
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
    color: var(--dark)
    &:hover
        text-decoration: none
        box-shadow: 1px 1px 20px rgba(0,0,0,0.5)

    h3
        font-size: 1rem

.card-image-top
    width: 100%
    
</style>