// View
var FeedView = Backbone.View.extend({

  tagName : "li",
  className : "feed-item",

  initialize : function(feedItemsCollection) {
	  feedItemsCollection.bind("add", this.render);
  },

  render : function(feedItem) {
	  $("#feed-items").append("<li>" + feedItem.get("graph") + "</li>");
	  return this;
  }
});


