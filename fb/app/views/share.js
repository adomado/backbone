// Share page...
var ShareView = Backbone.View.extend({

  initialize : function() {
    $("#share-button").live("click", jQuery.proxy(this.share, this));
    this.onPageHide();
  },


  onPageHide : function() {
    $('fb-new-post-page').live('pagehide', function(event, ui) {
      $("#fb-new-post-text").val("");
      return true;
    });
  },


  share : function() {
    $("#fb-share-spinner").show();
    
    var message = $("#fb-new-post-text").val();
    new FeedItemModel().createNewOnFb(message, function() {
      $("#fb-new-post-text").val("");
      window.FeedApp.fetchNewerFeed();
      $.mobile.changePage($("#fb-feed-page"));
    });
  }
  
});