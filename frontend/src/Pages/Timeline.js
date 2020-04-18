import React, { useState, useEffect } from "react";

import api from "../services/api";
import websocket from "../services/websocket";

import twitterLogo from "../twitter.svg";
import "./Timeline.css";

import Tweet from "../Compoment/Tweet.js";

export default function Timeline() {
  const [newTweet, setNewTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function loadTweets() {
      const response = await api.get("tweets");

      setTweets(response.data);
    }

    loadTweets();
  }, []);

  useEffect(() => {
    websocket.on("tweet", (data) => setTweets([data, ...tweets]));

    websocket.on("like", (data) =>
      setTweets(tweets.map((tweet) => (tweet._id === data._id ? data : tweet)))
    );
  }, [tweets]);

  async function handleSubmit(e) {
    if (e.keyCode !== 13) return;

    const content = newTweet;
    const author = localStorage.getItem("@GoTwitter:username");

    await api.post("/tweets", { content, author });

    setNewTweet("");
  }

  return (
    <div className="timeline-wrapper">
      <img height={24} src={twitterLogo} alt="GoTwitter" />

      <form>
        <textarea
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          onKeyDown={handleSubmit}
          placeholder="Novo twitter"
        />
      </form>

      <ul className="tweet-list">
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </ul>
    </div>
  );
}
