var FBNotificationWatcher = new JS.Class({

  include : Storage,

  // Accepts timeout in minutes. Default is 1 minute
  initialize : function(timeout) {
    this.timeout = (timeout || 1) * 60 * 1000; // stores in millisec
    this.getNotifications(); // initiate the first fetch
  },


  getNotifications : function() {
    var url = "https://api.facebook.com/method/notifications.GetList?access_token=" + this.getItem("fbAccessToken") + "&format=json";
    
    $.ajax({
      dataType: 'jsonp',
      context : this,
      url: url,
      success : jQuery.proxy(function(jsonData) {  // save the 'this' calling context
          this.processNotifications(jsonData);
        }, this)
    });
  },


  processNotifications : function(rawNotificationData) {
    if(rawNotificationData && rawNotificationData.notifications) {
      var length = rawNotificationData.notifications.length;
      if(length > 0) {
        for(var i=0; i<length; i++) {
          new NotificationItemModel({data : rawNotificationData.notifications[i]});
        }
      }
    }

    setTimeout(jQuery.proxy(this.getNotifications, this), this.timeout); // setTimeout needs to remain in callback so that we don't fire another timer while callback is executing.
  }
  
  
});