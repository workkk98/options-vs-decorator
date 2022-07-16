<template>
  <div @click="handleClick">{{text}}</div>
</template>

<script>

export default {
  name: 'link-options',
  props: {
    text: {
      type: String
    },
    value: {
      type: Number
    }
  },
  methods: {
    handleClick (e) {
      console.log(this.text)
      this.$emit('dispatch-click', e)
    }
  }
}
</script>

<style>

</style>