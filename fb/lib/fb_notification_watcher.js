var FBNotificationWatcher = new JS.Class({

  include : Storage,

  initialize : function(options) {
    this.timeout = options.timeout || (5 * 1000); // default is 5 sec
  },


  get : function(callback) {
    var url = "https://api.facebook.com/method/notifications.GetList?access_token=" + this.getItem("fbAccessToken") + "&format=json";
    
    $.ajax({
      dataType: 'jsonp',
      context : this,
      url: url,
      success : jQuery.proxy(function (jsonData) {  // save the 'this' calling context
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
  }
  
  
});