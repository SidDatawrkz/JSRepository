async function getfingerprint() {
    const storedFingerprint = getCookie('fingerprint');
    if (storedFingerprint) {
        console.log("Fingerprint is already stored in cookie: "+storedFingerprint);
        return storedFingerprint;
    } else {
        const FingerprintJS = await import('https://openfpcdn.io/fingerprintjs/v4');
        const fp = await FingerprintJS.load();

        const result = await fp.get();
        const visitorId = result.visitorId;
        console.log(visitorId);

        setCookie('fingerprint', visitorId, 365);
        console.log("Fingerprint saved in cookie: "+visitorId);
        return visitorId;
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
    const storedFingerprint = getCookie('fingerprint');
    if (storedFingerprint) {
        const FingerprintJS = await import('https://openfpcdn.io/fingerprintjs/v4');
        const fp = await FingerprintJS.load();

        const result = await fp.get();
        const visitorId = result.visitorId;

        if (visitorId !== storedFingerprint) {
            // Fingerprint has changed, update the cookie
            setCookie('fingerprint', visitorId, 365);
            document.getElementById('fingerprint_update').innerText = `Update stored id to: ${visitorId}`;
        }
    }
}
