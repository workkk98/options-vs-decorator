<template>
  <div @click="handleClick">{{text}}</div>
</template>

<script>

export default {
  name: 'link-options',
  props: {
    text: {
      require: true,
      type: String
    }
  },
  methods: {
    handleClick () {
      console.log(this.text)
    }
  }
}
</script>

<style>

</style>