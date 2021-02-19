<template>
  <div id="book_info">
    <div id="normal_input">
      <div>
        책 이름 : <input id="title" type="text" name="title" v-model="title" />
      </div>
      <div>
        저자 : <input id="writer" type="text" name="writer" v-model="writer" />
      </div>
      <div>
        출판사 :
        <input
          id="publisher"
          type="text"
          name="publisher"
          v-model="publisher"
        />
      </div>
    </div>
    <div id="price_input">
      <table>
        <tbody>
          <tr v-for="(row, index) in rows" v-bind:key="(row, index)">
            <td>
              <button class="del_price_info" @click="delPriceInfo(index)">
                삭제
              </button>
            </td>
            <td>
              <input
                id="price"
                type="text"
                name="price"
                placeholder="판매가격"
                v-model="row.price"
              />
            </td>
            <td>
              <input
                id="status"
                type="text"
                name="status"
                placeholder="책상태"
                v-model="row.status"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button id="ins_price_info" @click="insertPriceInfo">추가</button>
    </div>
    <div id="button_div">
      <button id="cancel" @click="cancel">취소</button>
      <button id="submit" @click="submit">저장</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookInfo",
  data() {
    return {};
  },
  computed: {
        param: function () {
            return this.$route.params;
        }
    }
};
</script>

<style scoped>
p {
  text-align: center;
}
</style>
