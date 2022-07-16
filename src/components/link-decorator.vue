<template>
  <div @click="handleClick">{{text}}</div>
</template>

<script>
import Vue from 'vue'
import { Prop, Component, Emit } from 'vue-property-decorator'

@Component
export default class LinkDecorator extends Vue {
  @Prop({
    type: String
  })
  text

  @Prop({
    type: Number
  })
  value

  @Emit('dispatch-click')
  handleClick(e) {
    console.log('link-decorator', this.text)
    return e
  }
}
</script>

<style>

</style>