// Model
var FeedItemModel = Backbone.Model.extend({
  initialize : function(id, graph) {
	  this.id = id;
	  this.graph = graph;
  },

  like : function() {
	  // Like this feedItem
  },

  comment : function(message) {
	  // comment on this feed item
  }
});
