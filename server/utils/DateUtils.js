/**
 * Create string stamp
 * @return {string}
 */

exports.formatTime = (time) => {
    try {
        const timeLife = new Date(time);
        const day = String(timeLife.getDate()).padStart(2, "0");
        const month = String(timeLife.getMonth() + 1).padStart(2, "0");
        const year = timeLife.getFullYear();
        const hours = String(timeLife.getHours()).padStart(2, "0");
        const minutes = String(timeLife.getMinutes()).padStart(2, "0");
        const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}`;
        return formattedTime;
    } catch (error) {
        return null;
    }
};
