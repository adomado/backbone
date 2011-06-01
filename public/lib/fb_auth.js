var FBAuth = new JS.Class({

    include : Storage,

    initialize: function(appId, returnUrl, reinforceAuthCallback) {
      this.appId = appId;
      this.returnUrl = returnUrl;
      this.reinforceAuthCallback = reinforceAuthCallback;
      this.authUrl = "https://graph.facebook.com/oauth/authorize?client_id=" + appId + "&redirect_uri=" + returnUrl +
                      "&scope=publish_stream,offline_access,email,read_stream,user_about_me,user_birthday,user_education_history," +
                      "user_hometown,user_online_presence,user_relationships,user_status&response_type=token";

      if(this.needAuth() == true)
        $.mobile.changePage($("#fb-auth-page"));

      this.getAccessTokenFromUrl();
    },


    getAuthUrl : function() {
      return this.authUrl;
    },


    needAuth : function() {
      if((this.getItem("fbAccessToken") == null) || (this.getItem("fbAccessToken") == undefined))
        return true;
      else
        return false;
    },


    // TODO - seems not to be used anymore...?
    reinforceAuth : function() {
      this.removeItem("fbAccessToken");
      this.reinforceAuthCallback.call();
    },


    getAccessTokenFromUrl : function() {
      try {
        if(document.location.hash != "")
        {
          var accessToken = document.location.hash.split("#access_token=")[1].split("&")[0];
          this.setItem("fbAccessToken", accessToken);

          // If we got auth in this window, that means we are a child window!
          // Reload the parent (as fbAccessToken is now available in localStorage) & close ourself (the child window)
          window.opener.document.location.reload();
          window.close();

          // Just in case, window.close fails!
          document.location.href = "http://" + document.location.host;
        }
      } catch(error) {
        return false;
      }
    }
});
