import axios from "axios";

const getGlobalIp = async () => {
  const url = "https://api64.ipify.org?format=json";
  try {
    const response = await axios.get(url);
    return response.data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
  }

  return null;
};

const getLocalIp = (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      const rtcConnection = new RTCPeerConnection();
      rtcConnection.createDataChannel("");
      rtcConnection
        .createOffer()
        .then((offer) => rtcConnection.setLocalDescription(offer))
        .catch(reject);

      rtcConnection.onicecandidate = (event) => {
        if (event && event.candidate && event.candidate.candidate) {
          const ipMatch = event.candidate.candidate.match(
            /(\d{1,3}\.){3}\d{1,3}/
          );
          if (ipMatch) {
            const localIP = ipMatch[0];
            rtcConnection.close();
            resolve(localIP);
          }
        } else if (!event.candidate) {
          rtcConnection.close();
          resolve(null);
        }
      };
    } catch (error) {
      console.error("Error retrieving local IP:", error);
      reject(error);
    }
  });
};

const getIp = async () => {
  let ip: string = "unknown";

  const globalIp = await getGlobalIp();
  const localIp = await getLocalIp();

  console.log("Global IP:", globalIp);
  console.log("Local IP:", localIp);

  if (globalIp) {
    ip = globalIp;
  }

  if (localIp) {
    ip.concat(`\\${localIp}`);
  }

  return ip;
};

export default getIp;
