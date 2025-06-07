const ical = require("node-ical");

export async function parseICSFile(ICSLink: string) {
  const webEvents = await ical.async.fromURL(ICSLink);

  for (let event in webEvents) {
    console.log(webEvents[event]);
  }
}
