<template>
  <select 
    :name="option.name" 
    class="option" 
    @input="$emit('input', $event.target.value)">
    <option 
      v-for="selection in option.values" 
      :value="selection.value" 
      :key="`${option.id}-${selection.value}`">{{ selection.value }}</option>
  </select>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: function() {
        return { name: "default", values: ["None"] };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.option {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
</style>
