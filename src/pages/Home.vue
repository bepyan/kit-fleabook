<template>
  <div class="root">
    <Search />
    <BookList />
  </div>
</template>

<script>
import BookList from "@@/home/BookList";
import Search from "@@/home/Search";

export default {
  name: "Home",
  components: { BookList, Search },
};
</script>

