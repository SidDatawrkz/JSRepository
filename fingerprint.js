// Initialize the agent at application startup.
const fpPromise = import('https://openfpcdn.io/fingerprintjs/v4')
  .then(FingerprintJS => FingerprintJS.load())

// Get the visitor identifier when you need it.
fpPromise
  .then(fp => fp.get())
  .then(result =>   {
    // This is the visitor identifier:
    const visitorId = result.visitorId
    console.log(visitorId)
    
    const storedFingerprint = getCookie('fingerprint');
    if (storedFingerprint) {
      document.getElementById('fingerprint_para').innerText = `Fingerprint is already stored in cookie: ${storedFingerprint}`;
    } else {
        // Save the fingerprint in a cookie
        setCookie('fingerprint', visitorId, 365);
        document.getElementById('fingerprint_para').innerText = `Fingerprint saved in cookie: ${visitorId}`;
    }
  });

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
