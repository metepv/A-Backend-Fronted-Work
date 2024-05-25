<template>
  <form @submit.prevent="login">
    <input type="text" v-model="username" placeholder="Username">
    <input type="password" v-model="password" placeholder="Password">
    <button type="submit">Login</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null // New error property to store login errors
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/login', {
          username: this.username,
          password: this.password
        });
        // Check if response contains a role
        if (response.data && response.data.role) {
          // Redirect based on user role
          this.$router.push(response.data.role === 'admin' ? '/admin' : '/user');
        } else {
          this.error = 'Invalid response from server';
        }
      } catch (error) {
        // Log error to console
        console.error('Login failed', error);
        // Set error message for display
        this.error = 'Failed to log in. Please try again.';
      }
    }
  }
};
</script>

