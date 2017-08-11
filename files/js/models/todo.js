var app = app || {};

// Todo Model
// ----------
// Our basic **Todo** model has `title` and `completed` attributes.

app.Todo = Backbone.Model.extend({

    // Default attributes ensure that each todo created has `title` and `completed` keys.
    defaults: {
        title: '',
        completed: false,
        highlighted: false
    },

    // Toggle the `completed` state of this todo item.
    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    },

    highlight: function() {
        this.save({
            highlighted: !this.get('highlighted')
        });
    }

});