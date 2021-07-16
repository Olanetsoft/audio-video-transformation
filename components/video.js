import { CloudinaryContext, Transformation, Video } from "cloudinary-react";

const TransformVideo = ({ crop, color, text, blur, audio, video }) => {
  return (
    <CloudinaryContext cloudName="olanetsoft">
      <Video publicId={video} controls autoplay="true">
        <Transformation effect={`progressbar:bar:${color}:30`} />
        <Transformation
          overlay={{
            fontFamily: "arial",
            fontSize: 60,
            text
          }}
          endOffset="9.0"
          gravity="south"
          startOffset="2.0"
          y="80"
        />
        <Transformation effect={`blur:${blur}`} crop={crop} />
        <Transformation width="500" height="350" crop={crop} />
        <Transformation overlay={`video:${audio}`} />
      </Video>
    </CloudinaryContext>
  );
};

export default TransformVideo;
