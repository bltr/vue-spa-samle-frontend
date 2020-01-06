<template>
  <button
    class="btn btn-link"
    data-cy="logout-button"
    @click="logout"
  >
    logout
  </button>
</template>

<script>
  export default {
    name: "LogoutButton",

    methods: {
      logout() {
        this.$store.dispatch('logout')
                .finally(() => {
                  if (this.$route.path !== '/') {
                    this.$router.replace('/')
                  }
                })
      }
    }
  }
</script>
