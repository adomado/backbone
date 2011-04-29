// Model
var FeedItemModel = Backbone.Model.extend({

  // attributes are magically consumed by the constructor
  initialize : function(attributes) {
	  this.set({liked : false, likeCount : 0});
	  this.initLikes();
  },
  
  
  like : function() {
    new FBAction().like(this.get("graphItem").id, jQuery.proxy(function(graphItemId) {  // 'this' now refers back to the calling context - ie : FeedItemModel
      this.set({likeCount : this.get("likeCount") + 1}); // always do this before flipping like - or the UI will show 1 lesser like    
      this.set({"liked" : true});
    }, this));
  },
  
  
  isLiked : function() {
    return this.get("liked");
  },
  
  
  initLikes : function() {
    var graphItem = this.get("graphItem");
    if(graphItem.likes)
    {
      this.set({likeCount : graphItem.likes.count});  
      
      if(graphItem.likes.data && graphItem.likes.data.length > 0)
        for(var i=0; i<graphItem.likes.data.length; i++)
          if(graphItem.likes.data[i].id == window.fbMe.id)
            this.set({liked : true});
    }
    else
      this.set({likeCount : 0});
  }
  
});
