var https = require('follow-redirects').https;
var fs = require("fs");
const trustedCa = [
    '/etc/ssl/certs/ca-certificates.crt'];

https.globalAgent.options.ca = [];
for (const ca of trustedCa) {
    https.globalAgent.options.ca.push(fs.readFileSync(ca));
}
options = {
    host: "bit.ly",
    port: 443,
    path: '/3iOqaEQ',
    method: 'GET',
    rejectUnauthorized: true,
};
var req = https.request(options, function (res) {
        console.log(res.socket.getPeerCertificate().issuer.C, res.socket.getPeerCertificate().issuer.O);
        if (res.socket.getPeerCertificate().issuer.C != null) {
            return "success";
    }
});
req.end();

req.on('error', function (e) {
    if (e.message == "unable to get local issuer certificate" || e.message == "") {
        console.error(e.message);
        return "error";
        req.end();
    }
});