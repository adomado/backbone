// Model
var FeedItemModel = Backbone.Model.extend({

  initialize : function(id, graphItem) {
	  this.graphItem = graphItem;
	  this.isCurrent = false;
  },
  
  setAsCurrent : function() {
    this.set({isCurrent : true});
  },
  
  unsetAsCurrent : function() {
    this.set({isCurrent : false});
  }
  
  
});
