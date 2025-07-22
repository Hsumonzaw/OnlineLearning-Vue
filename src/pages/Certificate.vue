<template>
  <v-container class="pt-16">
    <div id="certificate" class="text-center pa-5" style="border: 2px solid #000;">
      <h1>Certificate of Achievement</h1>
      <p>This certifies that</p>
      <h2>{{ name }}</h2>
      <p>has successfully passed the JavaScript Quiz.</p>
      <p>Score: {{ score }}/3</p>
      <p>Date: {{ date }}</p>
    </div>

    <v-btn class="mt-5" color="primary" @click="downloadPDF">
      Download Certificate
    </v-btn>
  </v-container>
</template>

<script>


export default {
  data() {
    return {
      name: this.$route.query.name || "Anonymous",
      score: this.$route.query.score || 0,
      date: new Date().toLocaleDateString(),
    };
  },
  methods: {
    downloadPDF() {
      const element = document.getElementById("certificate");
      html2pdf().from(element).save(`${this.name}-certificate.pdf`);
    },
  },
};
</script>
<style>



</style>