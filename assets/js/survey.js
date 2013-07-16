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
    
    surveyFile: {
    
    },

    events: {
        "submit form": "submit",
        "change #files": "handleFileSelect"
    },
    
    handleFileSelect: function(evt){
        console.log(evt.target.files);
        
        var files = evt.target.files;
        for (var i = 0, f; f = files[i]; i++){
            var reader = new FileReader();
           
            reader.onload= (function(theFile){
                return function(e){
                    
                    var base64Content = e.target.result.substring(e.target.result.indexOf(",") + 1, e.target.result.length);
                    
                    surveyFile = {
                        name:theFile.name,
                        type:theFile.type,
                        content:base64Content
                    };
                }
            })(f);
            
            fileContent = reader.readAsDataURL(f);
        
        }
    },
  
    submit: function(e) {
        e.preventDefault();
        var item = $('#surveyForm').serializeObject(),
        router = this.router;
        console.log(item);
        // Create a new instance of the todo model and populate it
        // with your form data.
       
        var survey = new Survey(item);
        
        console.log(surveyFile);
        
        survey.setBinaryFile('service_charge_file', surveyFile.name, surveyFile.type, surveyFile.content);
        // Call the create method to save your data at stackmob
        survey.create({
            success: function(model, result, options) {
               console.log("successfully saved the thing!");
              // Add new item to your collection
            
              // Send a change event to our collection so the
              // list of todos is refreshed on our homepage.
              //collection.trigger('change');

              // Return back to the home page
              //router.navigate('#', {
              //  trigger: true,
              //  replace: false
              //});
            }
        });
        
        return this;
    },

    attach: function(evt){
    
    },
        
    initialize: function() {
      homeTemplate = _.template($('#home').html());
      console.log("initing.");
      //x= document.getElementById("files");
      //console.log(x);
      //$(x).append("<H1>ljdlksjlkdj</h1>");
      
      //$('#service_charge_statement')[0].addEventListener('change', function(){alert("NICE!");}, false);
  
       //$('#service_charge_statement').bind('click', function() {
        //    console.log("amIN HETE.");
         //   alert('User clicked on "foo."');
      //});

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
