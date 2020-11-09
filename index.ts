import {
  Client, Message, TextChannel,
} from "discord.js";
import Agenda from "agenda";
import mongoose from "mongoose";
import { CombatSimulator } from "./src/CombatSimulator";
import { chicken } from "./src/monsters/Chicken";
import { AttackStyle } from "./src/types/types";

const token = process.env.DISCORD_TOKEN;
const connectionString = process.env.MONGODB_CONNECTIONSTRING || "";
const client = new Client();
const agenda = new Agenda();
const databaseConnection = mongoose.connect(connectionString);

databaseConnection
  .then(() => {
    console.log("Connecting agenda to database...");
    agenda.mongo(mongoose.connection.db).processEvery("one minute");
  })
  .catch((err) => console.log(err));

client.login(token).catch((err) => console.log(err));

client.once("ready", () => {
  console.log("Discord bot ready!");
});

agenda.on("ready", () => {
  console.log("Agenda ready!");
  agenda.define("send message", (job) => {
    const { data } = job.attrs;
    (async () => {
      const channel = await client.channels.fetch(data.channelId);
      if (channel instanceof TextChannel) {
        channel.send("Send message job executed!")
          .then(() => console.log("Message sent!"))
          .catch((err) => console.log(err));
      }
    })().catch((err) => console.log(err));
  });
  agenda.start()
    .then(() => console.log("Scheduler started!"))
    .catch((err) => console.log(err));
});

client.on("message", (message: Message) => {
  if (message.content === "!ping") {
    message.channel.send("Pong.")
      .then(() => console.log("Ponged!"))
      .catch((err) => console.log(err));
  } else if (message.content.startsWith("!kill")) {
    const parameters: Array<string> = message.content.split(" ");
    const simulator = new CombatSimulator(chicken, "12345", AttackStyle.accurate, {});
    const { killcount, rewards, ticks } = simulator.simulate(
      { kills: parseInt(parameters[1], 10) || Infinity },
    );
    void message.channel.send(`You killed ${killcount} chickens!`);
  } else if (message.content.startsWith("!agenda")) {
    agenda.schedule("in 1 minute", "send message", { channelId: message.channel.id })
      .then(() => console.log("Job scheduled!"))
      .catch((err) => console.log(err));
  }
});
