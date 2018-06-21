<template>
  <ul>
    <li 
      v-for="(item, index) in list" 
      :key="index">
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "List",
  props: {
    list: {
      type: Array,
      required: true
    }
  }
};
</script>
