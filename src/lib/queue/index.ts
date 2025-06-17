import amq from "amqplib";
import { logger } from "../logger";
import { EXCHANGE_NAME } from "../config";

let channel: amq.Channel | null = null;

export async function connectToRabbitMq() {
  try {
    const connection = await amq.connect(process.env.RABBITMQ_URL);

    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "topic", { durable: true });

    logger.info("Connected to rabbitmq");

    return channel;
  } catch (error) {
    // console.log(error);
    logger.error(`Connected to rabbitmq ${error}`);

    throw error;
  }
}

export async function publishEvent(routingKey: string, message: object) {
  if (!channel) {
    await connectToRabbitMq();
  }

  channel?.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(message)));

  logger.info(`Event published: ${routingKey}`);
}
