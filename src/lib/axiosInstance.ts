import axios from "axios";

export default function axiosInstance() {
    const instance = axios.create({
        baseURL: "http://127.0.0.1:3002",
        timeout: 5000,
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
