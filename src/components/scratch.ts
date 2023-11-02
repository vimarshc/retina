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
      apiEndpoint: 'https://mfjzmldgpf.execute-api.us-east-1.amazonaws.com/dev' // Replace with your actual API endpoint
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        // Display the selected image
        const reader = new FileReader();
        reader.onload = e => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);

        // Convert the selected file to Base64 and send the request
        this.convertToBase64(this.selectedFile);
      }
    },
    convertToBase64(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        this.sendImageToApi(base64String);
      };
      reader.onerror = error => {
        console.error('Error converting file to base64:', error);
      };
    },
    async sendImageToApi(base64Image) {
      const payload = {
        file: base64Image,
        isBase64Encoded: true // This is just for example, your Lambda may not need this flag
      };

      try {
        const response = await axios.post(this.apiEndpoint, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.jsonResponse = response.data;
        console.log('Success:', this.jsonResponse);
      } catch (error) {
        console.error("There was an error uploading the file!", error);
        this.jsonResponse = "Error: " + error.message;
      }
    },
    isValidURL(string) {
      // Validation logic...
    }
  }
}
