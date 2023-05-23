/**
 * @file Zoom API
 * @author Kevin Bravo (kevinbravo.me)
 * @see link https://developers.zoom.us/docs/api/ for more information about the Zoom API
 * 
 * @description Functions related to the Zoom API
 */

import axios from "axios";

const ZOOM_API_CLIENT_KEY = process.env.ZOOM_API_KEY;
const ZOOM_API_CLIENT_SECRET = process.env.ZOOM_API_SECRET;
const ZOOM_USER_ID = process.env.ZOOM_USER_ID;

type ZoomAuthResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

/**
 * Authenticates with the Zoom API using server-to-server OAuth.
 * @see link https://developers.zoom.us/docs/internal-apps/s2s-oauth/ for more information about server-to-server OAuth 
 * @returns A Promise that resolves to a ZoomAuthResponse object.
 */
const authenticateWithZoom = async (): Promise<ZoomAuthResponse> => {
    const url = 'https://zoom.us/oauth/token';
    const data = {
        grant_type: 'client_credentials'
    };
    const headers = {
        Authorization: `Basic ${Buffer.from(`${ZOOM_API_CLIENT_KEY}:${ZOOM_API_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const response = await axios.post(url, new URLSearchParams(data).toString(), { headers });
    return response.data;
};

/**
 * Creates a Zoom meeting with the specified name and start time.
 *
 * @param name - The name of the meeting.
 * @param startTime - The start time of the meeting in ISO 8601 format (yyyy-MM-ddTHH:mm:ss)
 * @see link https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/meetingCreate for more information about the Zoom API
 * @returns A Promise that resolves to an array containing the join URL, ID, and password of the meeting.
 */
const createZoomMeeting = async (name: string, startTime: Date) => {

    const date = startTime.toLocaleString("en-US", { timeZone: "America/Caracas" });
    
    const { access_token } = await authenticateWithZoom();
    const meetingOptions = {
        topic: name,
        type: 2,
        start_time: date,
        duration: 120,
        timezone: 'America/Caracas',
        default_password: true,
        settings: {
            auto_recording: 'none',
            mute_upon_entry: true,
            participant_video: false,
            waiting_room: true,
            breakout_room: {
                enable: true
            },

        },
    };
    const response = await axios.post(`https://api.zoom.us/v2/users/${ZOOM_USER_ID}/meetings`, {
        method: 'post',
        contentType: 'application/json',
        headers: { Authorization: `Bearer ${access_token}` },
        payload: JSON.stringify(meetingOptions),
    });
    const { join_url, id, password } = response.data
    return [join_url, id, password];
};

export default createZoomMeeting;