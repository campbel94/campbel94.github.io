window.addEventListener("envelopeModuleReady", () => {
    if (localStorage.getItem("_lr_env") !== null) OR (document.cookie.includes("_lr_env=")) {
        //how do wechange the if statement above to use the ats.retrieveEnvelope() method instead?
      console.log("envelope already in storage. directPass() not needed.")
      return;
    } else {
      let key;
      for (let n = 0, len = localStorage.length; n < len; ++n) {
        const thisKey = localStorage.key(n);
        if (thisKey.includes("@@auth0spajs@@::")) {
          key = thisKey;
          break;
        }
      }
      var email = localStorage.getItem(key);
      atsenvelopemodule.setAdditionalData({'type':'email','id':email});
    }

});


// window.addEventListener("envelopeModuleReady", () => {
//     console.log("is this listener event working?");
//     function directPass() {
//       if (document.cookie.includes("_lr_env=")) {
//         console.log("envelope already in storage. directPass() not needed.")
//         return;
//       } else {
//         let key;
//         for (let n = 0, len = localStorage.length; n < len; ++n) {
//           const thisKey = localStorage.key(n);
//           if (thisKey.includes("@@auth0spajs@@::")) {
//             key = thisKey;
//             break;
//           }
//         }
// //         in MNG's version 'var email = JSON.parse(localStorage.getItem(key)).body.decodedToken.user.email;
//         var email = localStorage.getItem(key);
//         atsenvelopemodule.setAdditionalData({'type':'email','id':email});
//       }
//     };

//     directPass()
// });
