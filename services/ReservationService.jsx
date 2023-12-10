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
  async GetFishingSpots() {
    const authUrl = backendLocalHostname + "FishingSpot/getFishingSpots/";
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
  async GetFishingSpot(id) {
    const authUrl = backendLocalHostname + `FishingSpot/getFishingSpot/${id}`;
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
  async Reserve(reservation) {
    const authUrl = backendLocalHostname + "Reservation/Reserve/";
    const authData = await getAuthData();
    const config = {
      headers: {
        Authorization: "Bearer " + authData.accessToken,
      },
    };
    try {
      const response = await axios.post(
        authUrl,
        {
          fishingSpotId: reservation.reservationId,
          reservationStart: reservation.dateOfReservation,
        },
        config
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async GetUserFishes(id) {
    const authUrl = backendLocalHostname + `Reservation/getUserFishes/${id}`;
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
  async AddToReservation(fishData) {
    const authUrl = backendLocalHostname + `Reservation/addFishToReservation/`;
    const authData = await getAuthData();
    const config = {
      headers: {
        Authorization: "Bearer " + authData.accessToken,
      },
    };
    try {
      const response = await axios.post(
        authUrl,
        {
          fishId: fishData.selectedFish,
          size: fishData.size,
          weight: fishData.weight,
          reservationId: fishData.reservationId,
        },
        config
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async GetFishList() {
    const authUrl = backendLocalHostname + "Reservation/getFishList/";
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
  async ReleaseFish(fishId, id) {
    const authUrl = backendLocalHostname + "Reservation/releaseFish/";
    console.log(fishId)
    console.log(id)
    const authData = await getAuthData();
    const config = {
      headers: {
        Authorization: "Bearer " + authData.accessToken,
      },
    };
    try {
      const response = await axios.post(
        authUrl,
        {
          caughtFishId: fishId,
          reservationId: id,
        },
        config
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
