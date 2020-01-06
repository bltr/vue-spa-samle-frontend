<template>
  <div class="col">
    <h1>profile</h1>
    <table class="table">
      <tr v-for="(value,key) in user" :key="key">
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import BaseLayout from "@/components/layouts/base/BaseLayout"

  export default {
    name: "Profile",

    data() {
      return {
        user: null
      }
    },

    created() {
      this.$emit('update:layout', BaseLayout)
      this.$store.dispatch('user')
        .then(user => this.user = user)
    }
  }
</script>
