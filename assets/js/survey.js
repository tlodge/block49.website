// Initialize StackMob
StackMob.init({
  publicKey: "d4e289e1-a41c-4c5d-9a6f-39c4bf04dcdb",
  apiVersion: 0
});

// Keep app self-contained
var myApp = (function($) {

  var Survey = StackMob.Model.extend({
    schemaName: 'survey'
  });
   
  var HomeView = Backbone.View.extend({
    
    events: {
        "submit form": "submit"
    },
    
    submit: function(e) {
        e.preventDefault();
        var item = $('#surveyForm').serializeObject(),
        router = this.router;
        console.log(item);
        // Create a new instance of the todo model and populate it
        // with your form data.
       
        /*var survey = new Survey(item);

        // Call the create method to save your data at stackmob
        survey.create({
            success: function(model, result, options) {

              // Add new item to your collection
              collection.add(model);

              // Send a change event to our collection so the
              // list of todos is refreshed on our homepage.
              collection.trigger('change');

              // Return back to the home page
              router.navigate('#', {
                trigger: true,
                replace: false
              });
            }
        });*/
        
        return this;
    },
    
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
      "": "home",
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
