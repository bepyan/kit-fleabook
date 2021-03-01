<template>
  <v-app>
    <router-view></router-view>
  </v-app>
  <!-- <v-app>
    <v-app-bar absolute color="#81BEF7" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title>벼룩 시장</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>책 목록 조회</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>예약 내역 조회</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        
      </v-container>
    </v-main>
  </v-app> -->
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>

</style>
