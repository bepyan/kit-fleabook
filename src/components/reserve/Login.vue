<template>
  <form v-on:submit.prevent="onSubmit">
    <input v-model="id" placeholder="학번" />
    <input v-model="pw" type="password" placeholder="비밀번호" />
    <button>조회</button>
    <p>입력: {{ id + pw }}</p>
  </form>
</template>

<script>
const data = { id: "", pw: "" };

const onSubmit = (e) => {
  e.preventDefault();
};
export default {
  data() {
    return data;
  },
  methods: {
    onSubmit,
  },
};
</script>

<style scoped>
form {
  
}
input {
  font-size: 25px;
}
</style>