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

    get = (endpoint: string) =>
        axiosInstance(this.subbase)
            .get<T>(endpoint)
            .then((res) => res.data);
    getWithAuth = (endpoint: string, headers: object) =>
        axiosInstance(this.subbase)
            .get<T>(endpoint, { headers })
            .then((res) => res.data);
    getAll = (endpoint: string) =>
        axiosInstance(this.subbase)
            .get<T[]>(endpoint)
            .then((res) => res.data);
    post = (endpoint: string, headers: object, data: V) =>
        axiosInstance(this.subbase)
            .post<V>(endpoint, data, { headers })
            .then((res) => res.data);
    update = (endpoint: string, headers: object, id: number, data: V) =>
        axiosInstance(this.subbase).put(endpoint + "/" + id, data, { headers });
    delete = (endpoint: string, headers: object, id: number) =>
        axiosInstance(this.subbase).delete(endpoint + "/" + id, { headers });
}

export default APIClient;
