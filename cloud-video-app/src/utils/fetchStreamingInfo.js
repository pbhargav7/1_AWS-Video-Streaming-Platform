import { Auth } from 'aws-amplify';
const API_URL = 'https://4n0bs0px08.execute-api.us-east-1.amazonaws.com/dev'

function stripPublicPrefix(str) {
  if (str.startsWith("public/")) {
    return str.slice("public/".length);
  }
  return str;
}


function parseResponseDataFoeGetAllVideo(responseData) {
  const parsedData = responseData;
  const formattedData = parsedData.map(item => {
    const parsedSrcMediainfo = JSON.parse(item.srcMediainfo);
    return {
      guid: item.guid,
      filename: stripPublicPrefix(parsedSrcMediainfo.filename),
      thumbnails: item.thumbNailsUrls,
    };
  });
  return formattedData;
}


async function getHeaders() {
  try {
    const session = await Auth.currentSession();
    const idToken = session.getIdToken().getJwtToken();
    return {
      'Authorization': idToken,
      'Content-Type': 'application/json'
    };
  } catch (error) {
    console.error('Error fetching headers:', error);
    throw error;
  }
}

export async function getAllVideos() {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${API_URL}/videos`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = parseResponseDataFoeGetAllVideo(await response.json());
    return data;
  } catch (error) {
    console.error('Error fetching all videos:', error);
    throw error;
  }
}

export async function getVideo(guid) {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${API_URL}/videos/${guid}`, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return {
      ...data
    };
  } catch (error) {
    console.error(`Error fetching video with guid ${guid}:`, error);
    throw error;
  }
}
