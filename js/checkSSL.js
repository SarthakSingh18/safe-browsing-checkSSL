const { exec } = require('child_process');
module.exports = {
    checkCertificateOriginProcess:(url)=>{
        return new Promise((resolve,reject)=>{
            exec(`node /home/sarthak/WebstormProjects/safe-browsing-checkSSL/js/nodeRequestProcess.js ${url}`, (error, stdout) => {
                if (error) {
                    console.log("ERROR",error);
                    reject({"error":"some error occurred"})
                }
                resolve(stdout);
            });
        })
    }
}