function atsDirectPass() {
  window.addEventListener("envelopeModuleReady", function() {
    // let key;
    for (var n = 0, len = localStorage.length; n < len; ++n) {
      var thisKey = localStorage.key(n);
      if (thisKey.includes("@@auth0spajs@@::")) {
        // var email = JSON.parse(localStorage.getItem(thisKey)).body.decodedToken.user.email;
        var email = localStorage.getItem(thisKey);
        // console.log("auth0 email");
        atsenvelopemodule.setAdditionalData({'type':'email','id':email});
        break;
        } else if (thisKey == "trb.registration.userData") {
          // var email = JSON.parse(localStorage.getItem("trb.registration.userData")).email
          var email = localStorage.getItem(thisKey);
          // console.log("trb email");
          atsenvelopemodule.setAdditionalData({'type':'email','id':email});
          break;
        } else {
          break;
        }
      }
    
  });
};

atsDirectPass()