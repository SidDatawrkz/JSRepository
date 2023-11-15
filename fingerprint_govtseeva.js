async function getfingerprint() {
    const storedFingerprint = getCookie('fingerprint');
    if (storedFingerprint) {
        console.log("Fingerprint is already stored in cookie: "+storedFingerprint);
        return storedFingerprint;
    } else {
        console.log("Default fingerprint 85e1293153c56349abd3530e3d16e6a3");
        return "85e1293153c56349abd3530e3d16e6a3";
    }
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    console.log(expires);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
async function checkAndUpdateFingerprint() {
    const FingerprintJS = await import('https://openfpcdn.io/fingerprintjs/v4');
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const visitorId = result.visitorId;

    const storedFingerprint = getCookie('fingerprint');
    if (storedFingerprint) {
        if (visitorId !== storedFingerprint) {
            // Fingerprint has changed, update the cookie
            setCookie('fingerprint', visitorId, 365);
            console.log("Updated id to: "+visitorId);
        }
    }
    else {
        setCookie('fingerprint', visitorId, 365);
        console.log("Fingerprint saved in cookie: "+visitorId);
    }
}
