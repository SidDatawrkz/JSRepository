function getparam(key){
    //fetching param key-value passed: https://www.sitepoint.com/get-url-parameters-with-javascript/
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const value = urlParams.get(key);
    console.log(value);
    return value;
}
