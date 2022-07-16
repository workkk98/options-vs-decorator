import Vue from 'vue'
// import App from './App.vue'
window.define = {
  amd: {}
}

import benchmark from 'benchmark'
import LinkOptions from './components/link-options.vue'
import LinkDecorator from './components/link-decorator.vue'

Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')


// function createEntry(id) {
//   const element = document.createElement('div')
//   element.setAttribute('id', id)
//   document.body.append(element)
// }


const suite = new benchmark.Suite()


const renderFn = (vueComp) => {
  return function(h) {
    return h('div', new Array(100).fill(0).map((_, index) => h(vueComp, {
      props: {
        text: index.toString()
      }
    })))
  }
}

suite
.add('options', function() {
  // createEntry('t1')
  new Vue({
    render: renderFn(LinkOptions)
  })
  // .$mount('#t1')
  // document.body.removeChild(vm.$el)
})
.add('decorator', function () {
  new Vue({
    render: renderFn(LinkDecorator)
  })
  // .$mount('#t2')
})
// add listeners
.on('cycle', function(event) {
  console.log(event)
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });