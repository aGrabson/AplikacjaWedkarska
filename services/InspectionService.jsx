import { getAuthData } from "../credentials/Store.jsx";
import { backendLocalHostname } from "./Hostname.jsx";
import axios from "axios";

export default class InspectionService {
    async ValidateUserCard(cardNumber, spotId) {
        const authUrl =
          backendLocalHostname + "Inspection/validateUserCard/";
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
              cardId: cardNumber,
              fishingSpotId: spotId,
            },
            config
          );
          return response;
        } catch (error) {
          return error.response;
        }
      }
      async ReleaseFishAsInspector(fishId, id) {
        const authUrl =
          backendLocalHostname + "Inspection/ReleaseFishAsInspector/";
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
      async PostInspection(data) {
        const authUrl =
          backendLocalHostname + "Inspection/postInspection/";
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
              base64Photos: data.ListOfPhotos,
              reservationId: data.reservationId,
              comment: data.comment,
            },
            config
          );
          return response;
        } catch (error) {
          return error.response;
        }
      }
}