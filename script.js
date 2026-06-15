async function send() {
    const msg = document.getElementById("msg");
    const text = msg.value;

    if (!text) return;

    document.getElementById("chat").innerHTML += 
        `<p><b>Kamu:</b> ${text}</p>`;

    msg.value = "";

    const res = await fetch("/chat", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    document.getElementById("chat").innerHTML += 
        `<p><b>Fahri AI:</b> ${data.reply}</p>`;
}