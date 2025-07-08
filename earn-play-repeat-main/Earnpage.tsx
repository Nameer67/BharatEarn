import { useState } from "react";

function VideoBox({ link }: { link: string }) {
  const getEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|v=)([^?&]+)/);
    const videoId = match?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  return (
    <div className="w-[320px] m-2 border rounded overflow-hidden shadow">
      <iframe
        width="100%"
        height="180"
        src={getEmbedUrl(link)}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="p-2 text-center font-semibold text-green-600">₹2</div>
    </div>
  );
}

export default function EarnPage() {
  const [videos, setVideos] = useState<string[]>([
    "https://youtu.be/EpI_vsIsLZg?si=WN308zdQisMx_6nf", // ← Your link here
  ]);
  const [input, setInput] = useState("");

  const addVideo = () => {
    if (input.trim()) {
      setVideos([input, ...videos]);
      setInput("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📺 Add YouTube Videos</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Paste YouTube link"
          className="border p-2 rounded w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={addVideo}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap">
        {videos.map((link, index) => (
          <VideoBox key={index} link={link} />
        ))}
      </div>
    </div>
  );
}
