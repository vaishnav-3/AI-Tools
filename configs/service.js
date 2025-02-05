import axios from "axios";

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3'

const getVideos = async(query) => {
    try {
        const params = {
            part: 'snippet',
            q: query,
            maxResults: 1,
            type: 'video',
            key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
        }
        const resp = await axios.get(`${YOUTUBE_BASE_URL}/search`, {params});
        console.log("YouTube API full response:", resp.data); // Debug log
        return resp.data.items;
    } catch (error) {
        console.error("YouTube API error:", error);
        return [];
    }
};

export default{
    getVideos
}