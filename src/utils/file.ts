import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import {
  DownloadProgressData,
  FileSystemNetworkTaskProgressCallback,
} from "expo-file-system";
import { SetStateAction } from "react";
import { Toast } from "native-base";
const downloadFile = async (
  url: string,
  setProgress: SetStateAction<number>
) => {
  const splitted = url.split("/");
  const fileName = splitted[splitted.length - 1];
  const callback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    // setProgress(progress);
  };
  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + fileName,
    {},
    callback
  );

  try {
    const { uri } = await downloadResumable.downloadAsync();
    if (MediaLibrary.PermissionStatus.GRANTED) {
      console.log("save to media library");

      await MediaLibrary.saveToLibraryAsync(uri);
      return true;
    } else {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        console.log("save to media library");
        await MediaLibrary.saveToLibraryAsync(uri);
        return true;
      } else {
        Toast.show({
          title: "please allow to save message",
        });
        return false;
      }
    }
  } catch (e) {
    console.error(e);
    return false;
  }

  //   try {
  //     await downloadResumable.pauseAsync();
  //     console.log("Paused download operation, saving for future retrieval");
  //     AsyncStorage.setItem(
  //       "pausedDownload",
  //       JSON.stringify(downloadResumable.savable())
  //     );
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   try {
  //     const { uri } = await downloadResumable.resumeAsync();
  //     console.log("Finished downloading to ", uri);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   //To resume a download across app restarts, assuming the the DownloadResumable.savable() object was stored:
  //   const downloadSnapshotJson = await AsyncStorage.getItem("pausedDownload");
  //   const downloadSnapshot = JSON.parse(downloadSnapshotJson);
  //   const downloadResumable = new FileSystem.DownloadResumable(
  //     downloadSnapshot.url,
  //     downloadSnapshot.fileUri,
  //     downloadSnapshot.options,
  //     callback,
  //     downloadSnapshot.resumeData
  //   );

  //   try {
  //     const { uri } = await downloadResumable.resumeAsync();
  //     console.log("Finished downloading to ", uri);
  //   } catch (e) {
  //     console.error(e);
  //   }
};
export { downloadFile };
