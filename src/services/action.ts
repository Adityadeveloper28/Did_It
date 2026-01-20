import api from "./api";


export const getActions = async () => {
    const res = await api.get("/actions");
    return res.data;
}

export const getActionById = async (id: string) => {
    const res = await api.get(`/actions/${id}`);
    return res.data;
}

export const createAction = async (title: string, description?: string) => {
    const res = await api.post("/actions", {
        title,
        description,
    });
    return res.data;
}