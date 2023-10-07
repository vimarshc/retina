<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="file" @change="onFileSelected" />
    <div>
      <img v-if="image" :src="image" alt="Uploaded" width="200" />
      <pre>{{ jsonResponse }}</pre>
    </div>        
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      selectedFile: null,
      image: null,
      jsonResponse: null,
      apiEndpoint: 'YOUR-API-ENDPOINT' // Replace with your API endpoint when ready
    };
  },
  methods: {
    async onFileSelected(event) {
      this.selectedFile = event.target.files[0];

      // Always display the selected image
      const reader = new FileReader();
      reader.onload = e => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);

      // Check API URL
      if (!this.isValidURL(this.apiEndpoint)) {
        this.jsonResponse = "The API is not ready yet.";
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      try {
        const response = await axios.post(this.apiEndpoint, formData);
        this.jsonResponse = response.data;
      } catch (error) {
        console.error("There was an error uploading the file!", error);
      }
    },
    isValidURL(string) {
      // eslint-disable-next-line no-useless-escape
      const res = string.match(/^(https?:\/\/(?:www\.|(?!www))[^s\.]+\.[^s]{2,}|www\.[^s]+\.[^s]{2,})$/i);
      return res !== null;
    }    
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
