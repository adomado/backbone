var NotificationItemModel = Backbone.Model.extend({

  // attributes are magically consumed by the constructor
  // new NotificationItemModel({data : {object_id : "aa", foo : bar}})
  initialize : function(options) {
    this.set({id: options.data.object_id, processed : false});
  },


  validate : function() {
    if(window.NotificationList.get(this.get("data").object_id))
      return "Error, notification already exists!";

    else
      window.NotificationList.add(this);
  }
  
});
