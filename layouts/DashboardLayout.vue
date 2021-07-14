<template>
  <div class="wrapper">
    <!-- navigationbar -->
    <nav class="navbar navbar-light bg-white">
      <a class="navbar-brand" href="#">
        <img
          src="https://media-exp1.licdn.com/dms/image/C4D0BAQHASopbFFnQBw/company-logo_200_200/0/1519913845242?e=2159024400&v=beta&t=J6RkGDQ7jGONbcogHrxUU5ZUJAjslyEaONJKkhozNJw"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        Span Technologies
      </a>
      <div>
        <span class="badge badge-secondary p-2">Administrator Area</span>
      </div>
    </nav>

    <!-- maincontent -->
    <div class="main" id="main-content">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style>
</style>
