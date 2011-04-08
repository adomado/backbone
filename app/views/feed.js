// View
var FeedView = Backbone.View.extend({

  tagName : "li",
  className : "feed-item",

  initialize : function(feedItemsCollection) {
    this.collection = feedItemsCollection;
	  this.collection.bind("add", this.render);
	  
	  window.fbFeed = new FBFeed(this, undefined, function(_this, graphItems, graphPaging) { // _this is a proxy to 'this'
      for(var i=0; i<graphItems.length; i++)
        _this.collection.create({id : graphItems[i].id, graphItem : graphItems[i]});  
	  });
  },

  render : function(feedItem) {
	  $("#feed-items").append("<li>" + feedItem.get("graphItem").id + "</li>");
	  return this;
  }
  
});


