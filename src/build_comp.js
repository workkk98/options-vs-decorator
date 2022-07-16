import benchmark from 'benchmark'
import Vue from 'vue'
import { Prop, Component, Emit } from 'vue-property-decorator'

const suite2 = new benchmark.Suite('options-vs-decorator import')



suite2
.add('options', function () {
  return {
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
})
.add('decorator', function () {
  @Component
  class LinkDecorator extends Vue {
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

  return LinkDecorator
})
.on('cycle', function(event) {
  console.log(event)
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });