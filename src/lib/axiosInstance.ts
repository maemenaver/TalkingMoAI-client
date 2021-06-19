import axios from "axios";

export default function axiosInstance() {
    const instance = axios.create({
        baseURL: "http://192.168.0.31:3002", // Write baseURL
        timeout: 3000,
    });

    instance.interceptors.response.use(
        function (response) {
            return response;
        },

        function (error) {
            const statusCode = error.response.data.statusCode;
            const message = error.response.data.message;
            const code = error.code;
            return Promise.reject({ statusCode, message, code });
        }
    );

    return instance;
}
