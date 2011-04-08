// View
var ItemView = Backbone.View.extend({

  initialize : function(feedItemId) {
    this.feedItemId = feedItemId;
	  this.collection.bind("add", this.render);
  }
  

});