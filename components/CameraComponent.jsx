import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { CameraButton } from "./CameraButton";
import * as FileSystem from "expo-file-system";

export const CameraComponent = ({ onPhotoTaken, onBase64Taken }) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const convertToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error("Błąd konwersji na Base64:", error);
      return null;
    }
  };

  const handlePhotoTaken = async (photoUri) => {
    if (onPhotoTaken) {
      const base64Image = await convertToBase64(photoUri);
      onBase64Taken(base64Image);
    }
  };

  const saveImage = async () => {
    if (photo) {
      try {
        alert("Zapisano zdjęcie!");
        handlePhotoTaken(photo);
        onPhotoTaken(photo);
        setPhoto(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({
          skipProcessing: true,
        });
        setPhoto(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (cameraPermission === false) {
    return <Text>Brak uprawnień do kamery</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        paddingBottom: 24,
      }}
    >
      {!photo ? (
        <Camera
          style={{ flex: 1, borderRadius: 20 }}
          type={cameraType}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <CameraButton
              icon="autorenew"
              onPress={() => {
                setCameraType(
                  cameraType === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                );
              }}
            ></CameraButton>

            <CameraButton
              icon="flare"
              title={
                flash ? (
                  <Text style={{ color: "white" }}>on</Text>
                ) : (
                  <Text style={{ color: "white" }}>off</Text>
                )
              }
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            ></CameraButton>
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: photo }} style={{ flex: 1, borderRadius: 20 }} />
      )}
      <View>
        {photo ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <CameraButton
              title={"Jeszcze raz"}
              icon="replay"
              onPress={() => setPhoto(null)}
            ></CameraButton>
            <CameraButton
              title={"Zapisz"}
              icon="beenhere"
              onPress={() => saveImage()}
            ></CameraButton>
          </View>
        ) : (
          <CameraButton
            title={"Zrób zdjęcie"}
            icon="add-a-photo"
            onPress={takePicture}
          ></CameraButton>
        )}
      </View>
    </View>
  );
};
