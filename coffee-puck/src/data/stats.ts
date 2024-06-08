import axios from "axios";

export const getStatistics = async () => {
    return (await axios.get(`http://localhost:3000/stats/get`))
        .data;
};
