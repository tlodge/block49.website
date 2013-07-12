// Initialize StackMob
StackMob.init({
  publicKey: "d4e289e1-a41c-4c5d-9a6f-39c4bf04dcdb",
  apiVersion: 0
});

// Keep app self-contained
var myApp = (function($) {

  var Todo = StackMob.Model.extend({
    schemaName: 'survey'
  });

  var HomeView = Backbone.View.extend({

    initialize: function() {
      homeTemplate = _.template($('#home').html());
    },

    render: function(eventName) {
      // Render the page template
      $(this.el).html(homeTemplate());
      return this;
    }
  });

  var AppRouter = Backbone.Router.extend({
    routes: {
      "": "home"
      /*,
      "add": "add",
      "update/:id": "update"*/
    },

    initialize: function(options) {
      // Handle back button throughout the application
      $('.back').on('click', function(event) {
        window.history.back();

        return false;
      });
      this.firstPage = true;
      //this.collection = options.collection;
    },

    home: function() {
      this.changePage(new HomeView({
       
      }), true);
    },

    changePage: function(page, reverse) {
      $(page.el).attr('data-role', 'page');
      page.render();
      $('body').append($(page.el));
    }
  });

  var initialize = function() {
    //var todos = new Todos();
    //todos.fetch({
    //  async: false
    //});

    var app_router = new AppRouter({
      //collection: todos
    });
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };

}(jQuery));

// When the DOM is ready
$(document).ready(function() {
  myApp.initialize();
});

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};
