// todo-tut.js

Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // This code only runs on the client

  Template.body.events({
    'submit .new-task': function (event) {
      // This is called when a new task is submitted in the form

      var t = event.target.text.value;
      if(t!==""){
        Tasks.insert({
          text: t,
            createdAt: new Date() // the current date and time
          });
      }


      // clear the form
      event.target.text.value = "";

      // prevent default form submit
      return false;
    }
  });

  Template.body.helpers({
    tasks: function(){
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.task.events({
    // Modify an entry based on it's ID
    'click .toggle-checked': function() {
      Tasks.update(this._id,{$set: {checked: !this.checked}});
    },

    // Delete an entry based on it's ID
    'click .delete': function () {
      Tasks.remove(this._id);
    }
  });
}
