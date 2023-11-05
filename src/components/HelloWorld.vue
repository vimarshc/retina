<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="file" @change="onFileSelected" />
    <div>
      <img v-if="image" :src="image" alt="Uploaded" width="200" />
      <pre>{{ jsonResponse }}</pre>
      <pre>{{ jsonResponse_1 }}</pre>
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
      jsonResponse_1: null,
      apiEndpoint: 'https://mfjzmldgpf.execute-api.us-east-1.amazonaws.com/dev' // Replace with your API endpoint when ready
    };
  },
  methods: {
    async onFileSelected(event) {
        this.selectedFile = event.target.files[0];

        const reader = new FileReader();
        reader.onload = async e => {
            this.image = e.target.result;
            const base64String = e.target.result.split(',')[1];  // extract the Base64 encoded string

            const payload = {
                image: base64String,  // include the Base64 encoded image data
                isBase64Encoded: true
            };

            try {
                const response = await axios.post('https://cvt96tbhde.execute-api.us-east-1.amazonaws.com/test/DR/', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.jsonResponse = response.data;
                console.log(this.jsonResponse);
                const prediction = JSON.parse(this.jsonResponse);
                this.jsonResponse = prediction;
                console.log(prediction);
            } catch (error) {
                console.error("There was an error uploading the file!", error);
            }
        };

        reader.readAsDataURL(this.selectedFile);
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
