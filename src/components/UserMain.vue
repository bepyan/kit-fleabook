<template>
  <div id="book_list">
    <table>
      <tbody>
        <tr v-for="(row, index) in rows" v-bind:key="(row, index)">
          <td>
            <a @click="insertBook('./book_info/', row)">{{ row }}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <button id="insertBook" @click="insertBook('./book_info/', null)">
      추가
    </button>
  </div>
</template>

<script>
export default {
  name: "UserMain",
  data() {
    let list = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      list.push(key);
    }
    return {
      rows: list,
    };
  },
  methods: {
    insertBook: function (title) {
      this.$router.push({ path: "/book_info", params: { title: title } });
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
