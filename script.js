// UI Varaibles
let envPreviouslyGenerated = false;

// email/phone submit button
const idSubmitButton = document.getElementById('submit-button');
const hashingButton = document.getElementById('hashing-button');
const geoButton = document.getElementById('geo-button');
const domainButton = document.getElementById('domain-button');
const requestButton = document.getElementById('envelopeRequest-button');
const responseButton = document.getElementById('envelopeResponse-button');
const detectButton = document.getElementById('detectButton');
const directButton = document.getElementById('directButton');
const invalidateEnvelopeButton = document.getElementById('invalidateEnvelopeButton');


// raw identifiers
let emailInput = document.getElementById('email-input');

// ATS Reponse
const atsResponseSpan = document.getElementById("atsResponseSpan");

// API Variables
// hashes
var SHA256 =  new Hashes.SHA256
var SHA1 = new Hashes.SHA1
var MD5 = new Hashes.MD5
// hashed identifiers
const emailHashSHA256 = SHA256.hex(emailInput)
const emailHashSHA1 = SHA1.hex(emailInput)
const emailHashMD5 = MD5.hex(emailInput)
// geo API

// Envelope endpoint
const baseUrl = 'https://api.rlcdn.com/api/identity/v2/envelope'
const pid = 13671


// Helper/Utility Functions


// Event Handlers
async function emailDisplay(evt){
    if (emailInput.value){
        // Dispaly Email
        const emailField = document.getElementById("identifierSpan");
        emailField.innerHTML = emailInput.value;

        // Display the three hash types
        const emailHashSHA256 = SHA256.hex(emailInput.value);
        document.getElementById("sha256Span").innerHTML = emailHashSHA256
        const emailHashSHA1 = SHA1.hex(emailInput.value);
        document.getElementById("sha1Span").innerHTML = emailHashSHA1
        const emailHashMD5 = MD5.hex(emailInput.value);
        document.getElementById("md5Span").innerHTML = emailHashMD5

        // Display ATS placement ID
        document.getElementById("pidSpan").innerHTML = ats.outputCurrentConfiguration().ENVELOPE_MODULE_INFO.ENVELOPE_MODULE_CONFIG.placementID;
        

        // Display Current geo
        const currentLocation = await window.axios.get('https://geo.privacymanager.io/');
        const countrySpan = document.getElementById("countrySpan");
        countrySpan.innerHTML = currentLocation.data.country;
        const regionSpan = document.getElementById("regionSpan");
        regionSpan.innerHTML = currentLocation.data.region;

        // Display Current Domain
        domainSpan.innerHTML = window.location.origin

        // Show Envelope Request
        const requestUrl = `${baseUrl}?pid=${pid}&it=4&iv=${emailHashSHA256}&it=4&iv=${emailHashSHA1}&it=4&iv=${emailHashMD5}`;
        document.getElementById("envelopeRequestSpan").innerHTML = requestUrl;

        // Show Envelope Response
        const responseSpan = document.getElementById("envelopeResponseSpan");
        const envelopeResponse = await window.axios.get(requestUrl);
        responseSpan.textContent = envelopeResponse.data.envelopes[0].value;
    }
    
}

function detectMode(evt) {
    // ats.triggerDetection();
    if (document.getElementById("identifierSpan").innerText){
        if (envPreviouslyGenerated) {
            ats.triggerDetection();
            window.addEventListener("lrEnvelopePresent", async () => {
            const detectModeResponse = await atsenvelopemodule.retrieveEnvelope()
            console.log("lrEnvelopePresent: ", detectModeResponse);
            atsResponseSpan.innerHTML = detectModeResponse;
            });
        } else {
            window.addEventListener("lrEnvelopePresent", async () => {
            // ats.triggerDetection();
            const detectModeResponse = await atsenvelopemodule.retrieveEnvelope()
            atsResponseSpan.innerHTML = detectModeResponse;
            envPreviouslyGenerated = true;
            });
        };
    };
        
}

function directMode(evt) {
    if (document.getElementById("identifierSpan").innerText) {
        ats.setAdditionalData({id: document.getElementById("identifierSpan").innerText, type: 'email'});
        window.addEventListener("lrEnvelopePresent", async () => {
            const directModeResponse = await atsenvelopemodule.retrieveEnvelope()
            console.log("lrEnvelopePresent: ", directModeResponse);
            atsResponseSpan.innerHTML = directModeResponse;
        });
        envPreviouslyGenerated = true;
    }

}

function invalidateEnvelope(evt) {
    var envelope = ats.retrieveEnvelope();
    if (localStorage.getItem("_lr_env") === null) {
        alert("No envelope in storage!");
      } else {
        ats.invalidateEnvelope();
        atsResponseSpan.innerHTML = "";
      }
    // if (typeof(envelope) != 'undefined') {
    //     ats.invalidateEnvelope();
    //     atsResponseSpan.innerHTML = "";
    // } else {
    //     alert("No envelope in storage!");
    // }
}



// Event Listeners
idSubmitButton.addEventListener('click', emailDisplay);
detectButton.addEventListener('click', detectMode);
directButton.addEventListener('click', directMode);
invalidateEnvelopeButton.addEventListener('click', invalidateEnvelope);