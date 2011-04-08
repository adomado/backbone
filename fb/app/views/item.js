// View
var ItemView = Backbone.View.extend({

  events : {
    "cick #like-button" : "like"
  },
  
  initialize : function(feedItemId) {
    this.feedItem = window.FeedList.get(feedItemId).get("graphItem");
    this.renderItemDetail();
  },
  
  
  renderItemDetail : function() {
    // this should point to the item clicked
    var feedItemData = {
      title: this.feedItem.message || this.feedItem.name,
      fromUserPic : "http://graph.facebook.com/" + this.feedItem.from.id + "/picture?type=normal",
      fromUserName : this.feedItem.from.name,      
      description : this.feedItem.description || this.feedItem.caption,
      picture : this.feedItem.picture || false,
      likeCount : this.feedItem.likes ? this.feedItem.likes.count : false,
      likePlural : (this.feedItem.likes && this.feedItem.likes.count > 1) ? true : false,
      commentCount : this.feedItem.comments ? this.feedItem.comments.count : false,
      commentPlural : (this.feedItem.comments && this.feedItem.comments.count > 1) ? true : false,
      fromUserProfile : "http://www.facebook.com/profile.php?id=" + this.feedItem.from.id,
      permalink : this.feedItem.actions[0].link,
      itemId : this.feedItem.id,
      linkTo : this.feedItem.link
    };    
    
    $("#fb-feed-item-detail").html(ich.fbFeedItemDetail(feedItemData));  
    
    this.renderItemComments();
    $("#fb-feed-item-detail").autolink();    
  },
  
  
  renderItemComments : function(appendToId) {
    var appendToId = "#comments";
    $(appendToId).html(""); // cleanup
    
    if(this.feedItem.comments && this.feedItem.comments.data && this.feedItem.comments.data.length > 0)
    {
      var comments = this.feedItem.comments.data;
      for(var i=0; i<comments.length; i++)
        this.renderComment(comments[i], appendToId);
        
      if(this.feedItem.comments.count > this.feedItem.comments.data.length)
        $("#more-comments").attr("href", this.feedItem.actions[0].link).show();      
        
      $("#fb-feed-item-comments").show();        
    }
  },
  
  
  renderComment : function(commentItem, appendToId) {
    var commentHtml;
    var commentData = {
      commentFromUserId : commentItem.from.id,
      commentText : commentItem.message,
      userProfleLink : "http://www.facebook.com/profile.php?id=" + commentItem.from.id,
    }
    
    commentHtml = ich.fbFeedItemComment(commentData);
    $(appendToId).append(commentHtml);
  },
  
  
  like : function() {
    console.log("foo");
  }
  
});