const { 
    Client,
    EmbedBuilder
} = require('discord.js'); // Client and Events
const {
    token,
    channels,
    text,
    embeds,
    status: {
        activity,
        status
    }
} = require('./config.json'); // configuration

const intents = [
    "Guilds",
    "GuildMembers",
    "GuildMessages",
    "MessageContent"
]; // intents

const client = new Client({
    intents
}); // client definition

client.on("ready", client => {
    client.user.setPresence({ activities: [{ name: `${activity}` }], status: `${status}` });
}) // set activity
client.on("guildMemberAdd", member => {
    let em = [];
    const guild = client.guilds.cache.get(channels.guildid);
        const join = guild.channels.cache.get(channels.welcome);

    if(embeds.enabled){
        em = setupEmbed(member, guild, embeds.welcome)
    join.send({ content: `${text.welcome.replace("{guild:id}", guild.id).replace("{guild:name}", guild.name).replace("{user:id}", member.user.id).replace("{user:name}", member.user.username)}`, embeds: [em] })
} else {
    join.send({ content: `${text.welcome.replace("{guild:id}", guild.id).replace("{guild:name}", guild.name).replace("{user:id}", member.user.id).replace("{user:name}", member.user.username)}`})
}
})
client.on("guildMemberRemove", member => {
    let em = [];
    const guild = client.guilds.cache.get(channels.guildid);
    const join = guild.channels.cache.get(channels.goodbye);

    if(embeds.enabled){
        em = setupEmbed(member, guild, embeds.goodbye)
    join.send({ content: `${text.goodbye.replace("{guild:id}", guild.id).replace("{guild:name}", guild.name).replace("{user:id}", member.user.id).replace("{user:name}", member.user.username)}`, embeds: [em] })
}else {
    join.send({ content: `${text.goodbye.replace("{guild:id}", guild.id).replace("{guild:name}", guild.name).replace("{user:id}", member.user.id).replace("{user:name}", member.user.username)}`})
}
})

client.login(token)

function setupEmbed(member ,guild, embedObj){
    const title = embedObj.title.replace("{guild:id}", guild.id).replace("{guild:name}", guild.name).replace("{user:id}", member.user.id).replace("{user:name}", member.user.username);
    const description = embedObj.description.replace("{guild:id}", guild.id).replace("{guild:name}", guild.name).replace("{user:id}", member.user.id).replace("{user:name}", member.user.username);
    const color = embedObj.color;
    const embed = new EmbedBuilder()
    .setTitle(`${title}`)
    .setDescription(`${description}`)
    .setColor(`${color}`);

    return embed;
}