// Model
var FeedItemModel = Backbone.Model.extend({

  initialize : function(id, graphItem) {
	  this.graphItem = graphItem;
  },

  like : function() {
	  // Like this feedItem
  },

  comment : function(message) {
	  // comment on this feed item
  }

});
