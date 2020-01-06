<template>
  <component :is="view"></component>
</template>

<script>
  import AuthView from "@/components/auth/AuthView"
  import DashboardView from "@/components/dashboard/DashboardView"
  import BaseLayout from "@/components/layouts/base/BaseLayout"
  import {mapGetters} from 'vuex'

  export default {
    name: "Home",

    created() {
      this.setLayout()
    },

    computed: {
      ...mapGetters(['isAuthenticated']),
      view() {
        return this.isAuthenticated ? DashboardView : AuthView
      },
    },

    watch: {
      isAuthenticated() {
        this.setLayout()
      }
    },

    methods: {
      setLayout() {
        if (this.isAuthenticated) {
          this.$emit('update:layout', BaseLayout)
        } else {
          this.$emit('update:layout', 'div')
        }
      }
    }
  }
</script>
