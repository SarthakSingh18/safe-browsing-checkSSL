const https = require('https');
const fs = require("fs");
const trustedCa = [
    '/etc/ssl/certs/ca-certificates.crt'];

https.globalAgent.options.ca = [];
for (const ca of trustedCa) {
    https.globalAgent.options.ca.push(fs.readFileSync(ca));
}
    try {
        options = {
            host: process.argv[2],
            port: 443,
            path: '/',
            method: 'GET',
            rejectUnauthorized: true,
        };
        const req = https.request(options, function (res) {
            try {
                if (res.socket.getPeerCertificate().issuer.C != null) {
                    console.log("Country of certificate issuer is",res.socket.getPeerCertificate().issuer.C,". Certificate issuer is",res.socket.getPeerCertificate().issuer.O);
                } else {
                    console.log("error in certificates");
                }
            } catch (e) {
                console.log(e);
            }
        });
        req.end();

        req.on('error', function (e) {
            if (e.message === "unable to get local issuer certificate") {
                console.error(e.message);
            }
        });
    } catch (e) {
        console.log(e);
}
