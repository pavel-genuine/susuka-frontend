"use client";
import AI_MODELS from "@/interfaces/AI_MODELS";
import React, { useState } from "react";
import Editor from "./Editor.component";

const App = () => {
  const [d, setD] = useState();
  const [prompt, setPrompt] = useState("");
  const [token, setToken] = useState(0);

  const handleClick = async () => {
    console.log(prompt, token);
    const response = await fetch("http://localhost:8000/api/openaiApi", {
      method: "POST",
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: "quick-blog-section",
        max_token: 200,
        userDescription: prompt,
        keywords: "money",
        chat: true,
        modelName: AI_MODELS.GPT35_TURBO,
      }),
    });

    console.log(response, "res");

    // eslint-disable-next-line no-undef
    let decoder = new TextDecoderStream();
    const reader = response.body.pipeThrough(decoder).getReader();
    let count = 0;
    let arr = [];
    while (true) {
      const { value, done } = await reader.read();

      if (value) {
        let x = value.split("data: ");
        arr?.push(x[1]?.replace("\n\n", ""));
      }
      count++;
      if (count % 10 == 0) {
        setD((prev) => {
          return prev + arr?.join("");
        });
        arr = [];
      }
      if (done) {
        setD((prev) => {
          return prev + arr?.join("");
        });
        break;
      }
    }
  };

  console.log("Data array:  ", d);

  return (
    <div style={{ width: "1000px", margin: "auto", padding: "10px" }}>
      <Editor />
    </div>
  );
};
export default App;
