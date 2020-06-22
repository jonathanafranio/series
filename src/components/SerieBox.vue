<template>
    <router-link class="card mb-4" :to="{ name: 'show-serie', params: { id: serie.id } }">
        <img :src="serie.image" :alt="serie.title" class="card-image-top">
        <div class="card-body">
            <h3 class="text-center mb-0">{{ serie.title }}</h3>
        </div>
    </router-link>
</template>

<script>
    export default {
        props: {
            serie: { type: Object, required: true }
        },
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

.card-image-top
    width: 100%
    
</style>