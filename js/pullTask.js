const amqp = require('amqplib/callback_api');
const checkSSL = require("../js/checkSSL");

function pullFromQueue() {
    try {
        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
                const exchange = 'logs';
                channel.assertExchange(exchange, 'fanout', {
                    durable: false
                });
                const queue = 'rpc_queue2';
                channel.assertQueue(queue, {
                    durable: false
                });
                channel.bindQueue(queue, exchange, '');
                channel.prefetch(1);
                channel.consume(queue, async function reply(msg) {
                    channel.ack(msg);
                    let r;
                    try {
                        r = await checkSSL.checkCertificateOriginProcess(msg.content.toString());
                        const buf = Buffer.from(JSON.stringify(r));
                        channel.sendToQueue(msg.properties.replyTo, buf, {
                            headers: {"msgFrom": "check-ssl"},
                            correlationId: msg.properties.correlationId,
                        });
                    } catch (e) {
                        console.log(e);
                        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(e)), {
                            headers: {"msgFrom": "check-ssl"},
                            correlationId: msg.properties.correlationId
                        });
                    }
                });
            });
        });
    } catch (e) {
        console.log(e);

    }
}

pullFromQueue();