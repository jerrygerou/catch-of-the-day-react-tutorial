import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCNeXWP8EMar3f2e9m2FGbaJiRx19E-FiI",
    authDomain: "catch-of-the-day-jerbear.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-jerbear.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;