import axios from "axios";

const instance = axios.create({
  // baseURL: 'http://localhost:5000', // Đặt địa chỉ cơ sở của backend
  baseURL: "https://dhd-admin-server.vercel.app",
});

export default instance;
