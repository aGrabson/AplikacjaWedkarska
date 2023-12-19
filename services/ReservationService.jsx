import { getAuthData } from "../credentials/Store.jsx";
import { backendLocalHostname } from "./Hostname.jsx";
import axios from "axios";

export default class ReservationService {
  async GetUserReservations(pageNumber, pageSize) {
    const authUrl =
      backendLocalHostname +
      `Reservation/getUserReservations?pageNumber=${pageNumber}&pageSize=${pageSize}`;
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
  async GetFishingSpotsByQuery(searchQuery) {
    const authUrl =
      backendLocalHostname +
      `FishingSpot/getFishingSpotsByQuery/${searchQuery}`;
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
    const authData = await getAuthData();
    const config = {
      headers: {
        Authorization: "Bearer " + authData.accessToken,
      },
    };
    try {
      const response = await axios.put(
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
  async GetUsersForFishingSpot(id) {
    const authUrl =
      backendLocalHostname + `FishingSpot/getUsersForFishingSpot/${id}`;
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
  async GetRatingsForFishingSpot(id) {
    const authUrl =
      backendLocalHostname + `FishingSpot/getRatingsForFishingSpot/${id}`;
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
  async PostRatingForFishingSpot(data) {
    const authUrl =
      backendLocalHostname + "FishingSpot/postRatingForFishingSpot/";
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
          rating: data.newRating,
          fishingSpotId: data.spotId,
        },
        config
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async UpdateRatingForFishingSpot(data) {
    const authUrl =
      backendLocalHostname + "FishingSpot/updateRatingForFishingSpot/";
    const authData = await getAuthData();
    const config = {
      headers: {
        Authorization: "Bearer " + authData.accessToken,
      },
    };
    try {
      const response = await axios.put(
        authUrl,
        {
          rating: data.newRating,
          fishingSpotId: data.spotId,
        },
        config
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async CancelReservation(id) {
    const authUrl =
      backendLocalHostname + "Reservation/cancelReservation/";
    const authData = await getAuthData();
    const config = {
      headers: {
        Authorization: "Bearer " + authData.accessToken,
      },
    };
    try {
      const response = await axios.put(
        authUrl,
        {
          reservationId: id,
          isCancelled: true,
        },
        config
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
