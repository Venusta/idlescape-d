import { Client, Message } from "discord.js";
import { CombatSimulator } from "./src/CombatSimulator";
import { chicken } from "./src/monsters/Chicken";
import { AttackStyle } from "./src/types/types";

const token = process.env.DISCORD_TOKEN;
const client = new Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message: Message) => {
  if (message.content === "!ping") {
    // send back "Pong." to the channel the message was sent in
    message.channel.send("Pong.")
      .catch(() => console.log("Pong failed to send!"))
      .then(() => console.log("Ponged!"))
      .catch(() => {});
  } else if (message.content.startsWith("!kill")) {
    const parameters: Array<string> = message.content.split(" ");
    const simulator = new CombatSimulator(chicken, "12345", AttackStyle.accurate, {});
    const { killcount, rewards, ticks } = simulator.simulate(
      { kills: parseInt(parameters[1], 10) || Infinity },
    );
    message.channel.send(`You killed ${killcount} chickens!`);
  }
});

client.login(token);
