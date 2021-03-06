const amqp = require("amqplib");

const userInput = process.argv[2];
const msg = { content: userInput };

async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");

        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Job sent successfully: ${msg.content}`);
    }
    catch (ex) {
        console.error(ex);
    }
};

connect();