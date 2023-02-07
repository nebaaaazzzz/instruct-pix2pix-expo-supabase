import React, { useState } from "react";
import supabase from "config/supabase";

import {
  VStack,
  ScrollView,
  Image,
  TextArea,
  Button,
  KeyboardAvoidingView,
} from "native-base";
import { Keyboard, Platform } from "react-native";
import Loading from "components/atoms/Loading";
const PromptScreen = (props: any) => {
  const { imgUrl }: { imgUrl: string } = props.route.params;
  const [fetchedUrl, setFetchedUrl] = useState("");
  const splittedUrl = fetchedUrl ? fetchedUrl.split("/") : imgUrl.split("/");
  const fileName: string = splittedUrl[splittedUrl.length - 1];
  const [prompt, setPrompt] = useState("");
  const formData = new FormData();
  const [isLoading, setIsLoading] = useState(false);
  const splittedFileName = fileName.split(".");
  const mimeType = "image/" + splittedFileName[splittedFileName.length - 1];
  formData.append("prompt", prompt);
  formData.append("file", {
    uri: imgUrl as string,
    type: mimeType,
    name: fileName,
  });
  const handleSubmit = async () => {
    console.log(await supabase.auth.getSession());
    // setIsLoading(true);
    try {
      const { url } = await (
        await fetch("http://192.168.43.136:8000/", {
          body: formData,
          method: "post",
          headers: {
            X_SUPABASE_ACCESS_TOKEN: "",
            "content-type": "multipart/form-data",
          },
        })
      ).json();
      // setFetchedUrl(url);
    } catch (err: any) {
      console.log(err.code);
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
      </ScrollView>
    </VStack>
  );
};
export default PromptScreen;
