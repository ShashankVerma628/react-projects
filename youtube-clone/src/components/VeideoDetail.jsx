import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

function VideoDetail() {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(
      `search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=5`
    ).then((data) => setVideos(data.items));
  }, [id]);

  if (!videoDetail?.snippet) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }} />
          <ReactPlayer
            controls={true}
            className="react-player"
            url={`https://www.youtube.com/watch?v=${id}`}
          />
          <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
            {title}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ color: "#fff" }}
            py={2}
          >
            <Link to={`/channel/$channelId`}>
              <Typography variant={{ sm: "subtitle1", md: "h6" }} color="#fff">
                {channelTitle}
                <CheckCircle
                  sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                />
              </Typography>
            </Link>
            <Stack direction="row" gap="20px" alignItems="center">
              <Typography variant="bod1" sx={{ opacity: 0.7 }}>
                {parseInt(likeCount).toLocaleString()} Likes
              </Typography>
              <Typography variant="bod1" sx={{ opacity: 0.7 }}>
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail;