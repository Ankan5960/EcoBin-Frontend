import axios from "axios";

export const postContactUsFrom = async (fromData: FormData): Promise<boolean> => {
  const res = await axios.post(
    `${
      import.meta.env.VITE_ECOBIN_USER_DATA_SERVICE
    }/api/ContactUs/post-contact-us`,
    fromData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "*/*",
      },
    }
  );
  return res.data;
};
