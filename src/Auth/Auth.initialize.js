import { initializeApp } from "firebase/app";
import firebaseConfig from "./Auth.configure";

const initializeAuthentication = () => {
    initializeApp(firebaseConfig);
};

export default initializeAuthentication;