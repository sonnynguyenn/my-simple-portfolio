function getURLParams() {
        var urlParams = {};
        var queryString = window.location.search.substring(1);
        var params = queryString.split('&');
        for (var i = 0; i < params.length; i++) {
            var pair = params[i].split('=');
            urlParams[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return urlParams;
}
let params = getURLParams();
let string = `✅ I will contact you later, <b>${params["fname"]} ${params["lname"]}</b> via <b><u>${params["email"]}</u></b>`;
document.querySelector("h1").innerHTML = string;
console.log(params);