import admin from "../src/config/firebaseAdmin.js";

export const sendNotificationToHR = async(token, leaveData) => {
    const message = {
        notification: {
            title: "New Leave Request",
            body: `${leaveData.name} applied for leave`
        },
        token: token,
    }
    await admin.messaging().send(message);
}