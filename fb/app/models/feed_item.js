// Model
var FeedItemModel = Backbone.Model.extend({

  // attributes are magically consumed by the constructor
  initialize : function(attributes) {
	  this.set({"liked" : false});
	  //this.isInitiallyLiked();
  },
  
  
  like : function() {
    this.set({liked : true});
    new FBAction().like(this.graphItem.id, function(graphItemId) {
      console.log(graphItemId);
    });
  },
  
  
  _getGraphItem : function() {
    return JSON.parse(this.get("graphItem"));
  },
  
  
  isLiked : function() {
    return this.get("liked");
  },
  
  
  isInitiallyLiked : function() {
    if(this.graphItem.likes && this.graphItem.likes.data && this.graphItem.likes.data.length > 0)
      for(var i=0; i<this.graphItem.likes.data.length; i++)
        if(this.graphItem.likes.data[i].id == "593656556")
          this.set({liked : true});
  }
  
});
