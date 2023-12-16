require("colors");

module.exports = (client) => {
  console.log(`[SUCCESS] Logged in as ${client.user.tag}!`.green);
  client.user.setActivity("large server even");
};
