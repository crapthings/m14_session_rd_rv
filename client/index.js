Session.setDefault('test1', false)

/*
  button2 global session can be access everywhere
*/

Template.button1 = Template.fromString(`
  <button onclick={{test}}>toggle by session</button>
  {{#if session 'test1'}}
    <span>i am test1</span>
  {{/if}}
`)

Template.button1.events({
  click () {
    Session.set('test1', !Session.get('test1'))
  }
})

Template.registerHelper('session', function (key) {
  return Session.get(key)
})

/*
  button2 local reactive dict
*/

Template.button2 = Template.fromString(`
  <button>toggle by reactive dict</button>
  {{#if rd 'state' 'test2'}}
    <span>i am test2</span>
  {{/if}}
`)

Template.button2.onCreated(function () {
  this.state = new ReactiveDict()
  this.state.set('test1', 'i am a test1')
  this.state.set('test2', false)
})

Template.button2.events({
  click (e, t) {
    t.state.set('test2', !t.state.get('test2'))
  }
})

Template.registerHelper('rd', function (name, key) {
  return Template.instance()[name].get(key)
})

/*
  button2 local reactive var
*/

Template.button3 = Template.fromString(`
  <button>toggle by reactive var</button>
  {{#if rv 'state'}}
    <span>i am test3</span>
  {{/if}}
`)

Template.button3.onCreated(function () {
  this.state = new ReactiveVar(false)
})

Template.button3.events({
  click (e, t) {
    t.state.set(!t.state.get())
  }
})

Template.registerHelper('rv', function (key) {
  return Template.instance()[key].get()
})
