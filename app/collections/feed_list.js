// Collection
var FeedListCollection = Backbone.Collection.extend({

  model : FeedItemModel,
  localStorage : new Store("feed"),
  
  items : function() {
	  // returns all feedItems
  } 
  
});
