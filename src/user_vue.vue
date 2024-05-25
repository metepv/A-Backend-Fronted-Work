<!-- Admin.vue -->
<template>
  <div>
    <h1>Welcome Admin!</h1>
    <div>{{ adminData }}</div>
  </div>
</template>

<script>
import axios from 'axios'; // Import Axios library
export default {
  data() {
    return {
      adminData: "Melih"
    };
  },
  async mounted() {
    try {
      const response = await axios.get('/admin');
      this.adminData = response.data;
    } catch (error) {
      console.error('Failed to fetch admin data', error);
    }
  }
};
</script>
