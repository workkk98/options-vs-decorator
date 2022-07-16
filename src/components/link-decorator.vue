<template>
  <div @click="handleClick">{{text}}</div>
</template>

<script>
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'

@Component
export default class LinkDecorator extends Vue {
  @Prop({
    type: String
  })
  text

  handleClick() {
    console.log('link-decorator', this.text)
  }
}
</script>

<style>

</style>