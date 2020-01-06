<template>
  <component :is="layout">
    <router-view @update:layout="layout = $event"/>
  </component>
</template>

<script>
  export default {
    name: "App",

    data() {
      return {
        layout: 'div'
      }
    }
  }
</script>
