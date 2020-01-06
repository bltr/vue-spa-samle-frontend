<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light border-bottom" data-cy="navbar">
    <router-link class="navbar-brand" to="/">DenegUchet</router-link>
    <button class="navbar-toggler" type="button" @click="toggle" data-cy="toggler">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse" :class="collapse" data-cy="navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-for="(item,index) in items" :key="index">
          <router-link class="nav-link" :to="item.url" v-text="item.title"/>
        </li>
      </ul>

      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <logout-button class="nav-link"/>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import LogoutButton from '@/components/layouts/base/LogoutButton'

  export default {
    name: "NavBar",

    components: {LogoutButton},

    data() {
      return {
        items: [
          {url: '/', title: 'dashboard'},
          {url: '/profile', title: 'profile'},
        ],

        collapse: 'collapse'
      }
    },

    methods: {
      toggle() {
        if (this.collapse === '') {
          this.collapse = 'collapse'
        } else {
          this.collapse = ''
        }
      }
    }
  }
</script>

