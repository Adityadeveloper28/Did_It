import api from "./api";

export const uploadProof = async (
  actionId: string,
  text?: string,
  imageUri?: string,
) => {
  const formData = new FormData();

  formData.append("actionId", actionId);
  if (text) formData.append("text", text);

  if (imageUri) {
    const filename =
      imageUri.split("/").pop() || `proof_${Date.now()}.jpg`;

    const extension = filename.split(".").pop()?.toLowerCase();
    let mimeType = "image/jpeg";

    if (extension === "png") mimeType = "image/png";
    if (extension === "gif") mimeType = "image/gif";
    if (extension === "webp") mimeType = "image/webp";

    formData.append("image", {
      uri: imageUri,
      type: mimeType,
      name: filename,
    } as any);
  }

  const res = await api.post("/proofs", formData,{
    headers: {
        "Content-Type": "multipart/form-data",
    },
    transformRequest: (data) => data,
    withCredentials: false,
  });
  return res.data;
};
