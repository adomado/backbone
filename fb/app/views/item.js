// View
var ItemView = Backbone.View.extend({

  initialize : function(feedItemId) {
    _.bindAll(this, "onLikeChanged"); // proxy the 'this' context back to the ItemView object
    this.feedItem = window.FeedList.get(feedItemId)
    this.graphItem = this.feedItem.get("graphItem");
    this.feedItem.bind("change:liked", this.onLikeChanged);    
    this.renderItemDetail();
    
    $('#fb-feed-item-page').live('pagehide', function(event, ui) {
      $("#fb-feed-item-comments").hide();
      $("#like-button").die("click"); // so that we saftely disconnect from a previously viewed feedItem
      return true;
    });    
  },
  
  
  renderItemDetail : function() {
    // this should point to the item clicked
    var feedItemData = {
      title: this.graphItem.message || this.graphItem.name,
      fromUserPic : "http://graph.facebook.com/" + this.graphItem.from.id + "/picture?type=normal",
      fromUserName : this.graphItem.from.name,      
      description : this.graphItem.description || this.graphItem.caption,
      picture : this.graphItem.picture || false,
      likeCount : this.graphItem.likes ? this.graphItem.likes.count : false,
      likePlural : (this.graphItem.likes && this.graphItem.likes.count > 1) ? true : false,
      commentCount : this.graphItem.comments ? this.graphItem.comments.count : false,
      commentPlural : (this.graphItem.comments && this.graphItem.comments.count > 1) ? true : false,
      fromUserProfile : "http://www.facebook.com/profile.php?id=" + this.graphItem.from.id,
      permalink : this.graphItem.actions[0].link,
      itemId : this.graphItem.id,
      linkTo : this.graphItem.link
    };    
    $("#fb-feed-item-detail").html(ich.fbFeedItemDetail(feedItemData));  
    
    this.renderItemComments();
    $("#fb-feed-item-detail").autolink();
    
    $("#like-button").live("click", jQuery.proxy(this.like, this));  // proxy saves the 'this' context
  },
  
  
  renderItemComments : function(appendToId) {
    var appendToId = "#comments";
    $(appendToId).html(""); // cleanup
    
    if(this.graphItem.comments && this.graphItem.comments.data && this.graphItem.comments.data.length > 0)
    {
      var comments = this.graphItem.comments.data;
      for(var i=0; i<comments.length; i++)
        this.renderComment(comments[i], appendToId);
        
      if(this.graphItem.comments.count > this.graphItem.comments.data.length)
        $("#more-comments").attr("href", this.graphItem.actions[0].link).show();      
        
      $("#fb-feed-item-comments").show();
    }
    this.feedItem.isLiked() == true ? $("#fb-like-ok").show() : $("#fb-like-ok").hide();    
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
    $("#fb-like-spinner").show();
    this.feedItem.like();
  },
  
  
  onLikeChanged : function() {
    if(this.feedItem.isLiked() == true) {
      console.log(this.graphItem.id + " got liked!");
      $("#fb-like-spinner").hide();
      $("#fb-like-ok").show();
    }
  }
  
  
});