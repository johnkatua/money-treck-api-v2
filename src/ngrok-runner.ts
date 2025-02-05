import ngrok from "@ngrok/ngrok";

const token = process.env.NGROK_TOKEN;
const port = process.env.PORT || 8000;

(async function () {
  console.log("Initializing Ngrok tunnel...")

  const url = await ngrok.connect({
    proto: "http",
    authtoken: token,
    hostname: "",
    addr: port
  })

  console.log(`Listening on url ${url.url()}`);
  console.log("Ngrok tunnel initialized!");
  process.stdin.resume();
})()