<template >
    <form @submit.prevent="submit()">
        <div class="login-page">
            <div class="card">
                <div class="card-header">Login</div>
                <div class="card-body">
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="E-mail" v-model="form.email" required>
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Senha" v-model="form.password" required>
                    </div>

                    <button class="btn btn-danger d-blox w-100" type="submit">
                        <span class="spinner-border spinner-border-sm d-none"></span>
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data () {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions(['login']),
            async submit() {
                document.querySelector('.spinner-border').classList.remove('d-none')
                try {
                    await this.login(this.form)

                    //this.$router.push({ name: 'Home' })
                } catch(err) {
                    console.log(err)
                }
            },
        }    
    }
</script>

<style lang="sass" scoped>
.login-page
    height: 100vh
    display: flex
    align-items: center
    justify-content: center

    .card
        width: 30%
        min-width: 280px
        overflow: hidden 
        .card-header
            background: #000
</style>