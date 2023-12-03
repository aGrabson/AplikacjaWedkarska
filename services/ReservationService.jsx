import { getAuthData } from "../credentials/Store.jsx";
import { backendLocalHostname } from "./Hostname.jsx";
import axios from "axios";

export default class ReservationService {
  async GetUserReservations() {
    const authUrl = backendLocalHostname + "Reservation/getUserReservations";
    const authData = await getAuthData();
    const config = {
      headers: {
        Authorization: "Bearer " + authData.accessToken,
      },
    };
    try {
      const response = await axios.get(authUrl, config);
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async GetReservationDetails(reservationId) {
    const authUrl =
      backendLocalHostname +
      `Reservation/getReservationDetails/${reservationId}`;
    const authData = await getAuthData();
    const config = {
      headers: {
        Authorization: "Bearer " + authData.accessToken,
      },
    };
    try {
      const response = await axios.get(authUrl, config);
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
