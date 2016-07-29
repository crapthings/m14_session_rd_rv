window.AppState = new ReactiveDict()

Template.registerHelper('AppState', function (key) {
  return JSON.stringify(AppState.get(key), null, 4)
})

Meteor.startup(() => {
  console.log(Template.button2)
})
