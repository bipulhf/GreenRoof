import axios from "axios";

const axiosInstance = (path: string) =>
    axios.create({
        baseURL: "http://localhost:8080/api/v1" + path,
    });

class APIClient<T, V> {
    subbase: string;
    constructor(subbase: string) {
        this.subbase = subbase;
    }

    get = (endpoint: string, params: object = {}) =>
        axiosInstance(this.subbase)
            .get<T>(endpoint, params)
            .then((res) => res.data);
    getWithCred = (endpoint: string, params: object = {}) =>
        axiosInstance(this.subbase)
            .get<T>(endpoint, { params, withCredentials: true })
            .then((res) => res.data);
    getWithAuth = (endpoint: string, headers: object) =>
        axiosInstance(this.subbase)
            .get<T>(endpoint, headers)
            .then((res) => res.data);
    getAll = (endpoint: string, params: object = {}) =>
        axiosInstance(this.subbase)
            .get<T[]>(endpoint, params)
            .then((res) => res.data);
    getAllWithAuth = (endpoint: string, headers: object) =>
        axiosInstance(this.subbase)
            .get<T[]>(endpoint, headers)
            .then((res) => res.data);
    post = (endpoint: string, headers: object, data: V) =>
        axiosInstance(this.subbase)
            .post<V>(endpoint, data, { headers })
            .then((res) => res.data);
    login = (endpoint: string, data = {}) =>
        axiosInstance(this.subbase)
            .post<V>(endpoint, data)
            .then((res) => res.data);
    follow = (endpoint: string, headers: object, data = {}) =>
        axiosInstance(this.subbase)
            .post(endpoint, data, { headers })
            .then((res) => res.data);
    update = (endpoint: string, headers: object, id: number, data: V) =>
        axiosInstance(this.subbase).put(endpoint + "/" + id, data, { headers });
    delete = (endpoint: string, headers: object, id: number) =>
        axiosInstance(this.subbase).delete(endpoint + "/" + id, { headers });
    unfollow = (endpoint: string, headers: object) =>
        axiosInstance(this.subbase).delete(endpoint, { headers });
    changeUserInfo = (endpoint: string, headers: object, data = {}) =>
        axiosInstance(this.subbase).put(endpoint, data, { headers });
}

export default APIClient;
