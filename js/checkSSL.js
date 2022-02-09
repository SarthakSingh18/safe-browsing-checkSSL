const { exec } = require('child_process');
module.exports = {
    checkSSL: (url) => {
        return new Promise((resolve, reject) => {
            exec(`openssl s_client -connect www.google.com:443 -CApath /etc/ssl/certs < /dev/null |  awk 'NR>0&&NR<10' `, (error, stdout, stderr) => {
                if (error) {
                    console.log("ERROR",error);
                    reject({"error":"some error occured"})
                }
                resolve(stdout);
            });
        });
    }
}