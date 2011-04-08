// Model
var FeedItemModel = Backbone.Model.extend({

  initialize : function(id, graphItem) {
	  this.graphItem = graphItem;
	  this.liked = false;
	  this.isLiked();
  },
  
  isLiked : function() {
    if(this.graphItem.likes && this.graphItem.likes.data && this.graphItem.likes.data.length > 0)
      for(var i=0; i<this.graphItem.likes.data.length; i++)
        if(this.graphItem.likes.data[i].id == "593656556")
          this.set({liked : true});
        else
          this.set({liked : false});
  }
  
});
