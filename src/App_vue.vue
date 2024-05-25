<template>
  <div id="app">
    <!-- Navigation bar or header -->
    <nav>
      <!-- Add navigation links to navigate between login, admin, and user pages -->
      <router-link to="/login">Login</router-link>
      <router-link to="/admin">Admin</router-link>
      <router-link to="/user">User</router-link>
    </nav>

    <!-- Router view to dynamically render components based on the current route -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // You may include global components, mixins, or other configuration here
};
</script>

<style>
/* Add global styles for the entire application */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #333;
}

nav a:hover {
  text-decoration: underline;
}
</style>
