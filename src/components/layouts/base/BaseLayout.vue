<template>
  <div data-cy="base-layout">
    <nav-bar class="container-fluid"/>
    <div class="container-md">
      <div class="row mt-3">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "@/components/layouts/base/Navbar"

  export default {
    name: 'BaseLayout',

    components: {NavBar}
  }
</script>
