
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "running",
    app: "Anime AI Studio"
  });
});

app.post("/api/plan", (req, res) => {
  const { prompt, minutes = 5 } = req.body;

  if (!prompt || prompt.trim().length < 8) {
    return res.status(400).json({
      error: "Apni anime story likho."
    });
  }

  const duration = Number(minutes);

  if (!Number.isFinite(duration) || duration < 1 || duration > 10) {
    return res.status(400).json({
      error: "Duration 1 se 10 minute ke beech honi chahiye."
    });
  }

  const templates = [
    ["Opening Scene", "Hero ka introduction", "Curiosity", "Wide shot"],
    ["Character Introduction", "Hero ki personality dikhana", "Hope", "Medium shot"],
    ["First Encounter", "Ek naye character se mulaqat", "Surprise", "Over-the-shoulder shot"],
    ["Rising Conflict", "Ek mushkil ka saamna", "Tension", "Close-up"],
    ["Important Decision", "Hero ek faisla leta hai", "Determination", "Slow push-in"],
    ["Action Scene", "Dynamic action sequence", "Intensity", "Tracking shot"],
    ["Emotional Moment", "Dil ko chhoone wala pal", "Emotion", "Expressive close-up"],
    ["Climax", "Sabse bada conflict", "Excitement", "Fast cuts"],
    ["Resolution", "Kahani ka nateeja", "Relief", "Slow pull-back"],
    ["Next Episode Hook", "Ek mysterious ending", "Mystery", "Slow reveal"]
  ];

  const count = Math.min(10, Math.max(5, Math.ceil(duration * 1.5)));

  const scenes = templates.slice(0, count).map((item, i) => ({
    sceneNumber: i + 1,
    title: item[0],
    durationSeconds: Math.round(duration * 60 / count),
    location: "Story ke mutabik",
    time: i % 2 === 0 ? "Evening" : "Night",
    action: item[1],
    emotion: item[2],
    camera: item[3],
    videoPrompt:
      `Professional 2D Japanese anime animation. Story: ${prompt}. ` +
      `Scene: ${item[1]}. Emotion: ${item[2]}. Camera: ${item[3]}. ` +
      "Consistent character design, clean line art, expressive animation, " +
      "detailed backgrounds, cinematic lighting."
  }));

  res.json({
    title: "My Anime Episode",
    originalPrompt: prompt,
    durationMinutes: duration,
    totalScenes: scenes.length,
    scenes
  });
});

app.listen(PORT, () => {
  console.log("");
  console.log("================================");
  console.log(" ANIME AI STUDIO IS RUNNING");
  console.log("================================");
  console.log(`Website: http://localhost:${PORT}`);
});
