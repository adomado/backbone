// Model
var FeedItemModel = Backbone.Model.extend({

  // attributes are magically consumed by the constructor
  initialize : function(attributes) {
	  this.set({"liked" : false});
	  this.isInitiallyLiked();
  },
  
  
  like : function() {
    new FBAction().like(this.get("graphItem").id, jQuery.proxy(function(graphItemId) {  // 'this' now refers back to the calling context - ie : FeedItemModel
      this.set({"liked" : true});
    }, this));
  },
  
  
  isLiked : function() {
    return this.get("liked");
  },
  
  
  isInitiallyLiked : function() {
    if(this.get("graphItem").likes && this.get("graphItem").likes.data && this.get("graphItem").likes.data.length > 0)
      for(var i=0; i<this.get("graphItem").likes.data.length; i++)
        if(this.get("graphItem").likes.data[i].id == "593656556")
          this.set({liked : true});
  }
  
});
