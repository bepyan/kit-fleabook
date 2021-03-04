<template>
  <v-dialog v-model="loading" max-width="300" persistent>
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <div id="loading">
          <div>
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoadingDialog",
  props: ["loading"],
  data() {
    return {};
  },
};
</script>

<style scoped>
#loading {
  text-align: center;
}
</style>