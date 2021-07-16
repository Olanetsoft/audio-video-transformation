import React, { useState } from "react";
import { Helmet } from "react-helmet";
import TransformVideo from "../components/video";

const App = () => {
  const [videoPublicId, setVideoPublicId] = useState("");
  const [alt, setAlt] = useState("");
  const [audioPublicId, setAudioPublicId] = useState("");
  const [textValue, setTextValue] = useState(" ");
  const [color, setColor] = useState("green");
  const [crop, setCrop] = useState("scale");
  const [blur, setBlur] = useState("");

  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "olanetsoft",
        uploadPreset: "w42epls6"
      },
      (error, result) => {
        if (result.event === "success") {
          console.log(result.info);
          if (result.info.is_audio === true) {
            setAudioPublicId(result.info.public_id);
            setAlt(`A file of ${result.info.original_filename}`);
          } else {
            setVideoPublicId(result.info.public_id);
            setAlt(`A file of ${result.info.original_filename}`);
          }
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  return (
    <div>
      <main className="App">
        <section className="left-side">
          <Helmet>
            <meta charSet="utf-8" />
            <script
              src="https://widget.Cloudinary.com/v2.0/global/all.js"
              type="text/javascript"
            ></script>
          </Helmet>
          <form>
            <h1>Media Upload</h1>
            <button
              type="button"
              className="btn widget-btn"
              onClick={openWidget}
            >
              Upload Video
            </button>
            &nbsp; &nbsp;
            <button
              type="button"
              className="btn widget-btn"
              onClick={openWidget}
            >
              Upload Audio
            </button>
            <h1>Video Transformation</h1>
            <h3>Progress Bar Color:</h3>
            <label className="label">Change Color</label>
            <input
              type="radio"
              value="blue"
              name="color"
              onChange={(event) => setColor(event.target.value)}
            />
            <label>Blue</label>
            <input
              type="radio"
              value="red"
              name="color"
              onChange={(event) => setColor(event.target.value)}
            />
            <label>Red</label>
            <h3>Crop Video</h3>
            <label className="label">Select Type</label>
            <input
              type="radio"
              value="scale"
              name="crop"
              onChange={(event) => setCrop(event.target.value)}
            />
            <label>Scale</label>
            <input
              type="radio"
              value="crop"
              name="crop"
              onChange={(event) => setCrop(event.target.value)}
            />
            <label>Crop</label>
            <h3>Text</h3>
            <label className="label">Add Text</label>
            <input
              id="text"
              type="text"
              onChange={(event) => setTextValue(event.target.value)}
            />
            <h3>Blur Effect</h3>
            <label className="label">Adjust Blur Effect</label>
            <input
              type="number"
              onChange={(event) => setBlur(event.target.value)}
            />
          </form>
        </section>
        <section className="right-side">
          <h1>The resulting video with audio will be displayed here</h1>

          {videoPublicId && (
            <TransformVideo
              crop={crop}
              color={color}
              text={textValue}
              blur={blur}
              audio={audioPublicId}
              video={videoPublicId}
            />
          )}
        </section>
      </main>
    </div>
  );
};
export default App;
