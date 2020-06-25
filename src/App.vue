<template>
    <div id="app">
        <layout-navbar v-if="showNavbar" />
        <router-view/>

        <!-- Modal -->
        <div class="modal fade" id="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel"></h5>
                        <button type="button" class="close" @click.prevent="resertModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="modalBody">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click.prevent="resertModal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import LayoutNavbar from './components/layout/LayoutNavbar'

    export default {
        components: { LayoutNavbar },
        computed: {
            showNavbar () {
                return this.$route.name !== 'home' && this.$route.name !== 'login'
            }
        },
        methods: {
            resertModal(){
                document.getElementById('modalLabel').innerHTML = ''
                document.getElementById('modalBody').innerHTML = ''
                document.getElementById('modal').classList.remove('show')
            }
        }
    }
</script>
<style lang="sass">
.container-fluid
    max-width: 1170px

.modal
    background: rgba(0, 0, 0, .6)
    &.show
        display: block

</style>
