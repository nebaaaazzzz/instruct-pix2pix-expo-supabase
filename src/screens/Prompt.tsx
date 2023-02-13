import React, { useState } from "react";
import supabase from "config/supabase";

import {
  VStack,
  ScrollView,
  Image,
  TextArea,
  Button,
  KeyboardAvoidingView,
  Toast,
} from "native-base";
import { downloadFile } from "src/utils/file";
import { Keyboard, Platform } from "react-native";
import Loading from "components/atoms/Loading";
const PromptScreen = (props: any) => {
  const { imgUrl }: { imgUrl: string } = props.route.params;
  const [fetchedUrl, setFetchedUrl] = useState("");
  const splittedUrl = fetchedUrl ? fetchedUrl.split("/") : imgUrl.split("/");
  const fileName: string = splittedUrl[splittedUrl.length - 1];
  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const formData = new FormData();
  const [isLoading, setIsLoading] = useState(false);
  const splittedFileName = fileName.split(".");
  const mimeType = "image/" + splittedFileName[splittedFileName.length - 1];
  formData.append("prompt", prompt);
  formData.append("file", {
    type: mimeType,
    name: fileName,
    uri: imgUrl as string,
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const accessToken = await (
        await supabase.auth.getSession()
      ).data.session?.access_token;
      if (accessToken) {
        try {
          const res = await fetch(
            "https://snap-clone-server-express-production.up.railway.app",
            {
              body: formData,
              method: "post",
              headers: {
                TOKEN: accessToken,
                "content-type": "multipart/form-data",
              },
            }
          );
          if (!res.ok) {
            throw new Error("faild");
          }
          const { url } = await res.json();
          setFetchedUrl(url);
        } catch (err) {
          Toast.show({
            duration: 5,
            title: "please try again",
          });
        }
      } else {
        Toast.show({
          title: "this is not possible",
        });
      }
    } catch (err: any) {
      console.log("error code", err);
    }
    setIsLoading(false);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <VStack
      flex={1}
      bg="white"
      onTouchStart={() => {
        Keyboard.dismiss();
      }}
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Image
          source={{ uri: fetchedUrl ? fetchedUrl : imgUrl }}
          alt="img"
          my="1.5"
          height={"70%"}
          resizeMode="contain"
        />
        {fetchedUrl ? (
          <Button
            my="2"
            mx="3"
            bg="blue.500"
            onPress={async () => {
              const bool = await downloadFile(fetchedUrl, setProgress);
              if (bool) {
                Toast.show({
                  title: "Image Saved",
                });
              } else {
                Toast.show({
                  title: "error occured",
                });
              }
            }}
          >
            Download
          </Button>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextArea
              autoCompleteType={"none"}
              onChangeText={setPrompt}
              value={prompt}
              mx="3"
              placeholder="prompt"
            />
            <Button my="2" mx="3" bg="blue.500" onPress={handleSubmit}>
              Submit
            </Button>
          </KeyboardAvoidingView>
        )}
      </ScrollView>
    </VStack>
  );
};
export default PromptScreen;
