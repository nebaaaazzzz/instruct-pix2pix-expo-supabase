import {
  Box,
  VStack,
  Input,
  Icon,
  Text,
  FlatList,
  ScrollView,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";
const Profile = (props: InterfaceBoxProps) => (
  <Box
    borderColor={"green.600"}
    h="16"
    w="16"
    p="0.5"
    borderWidth="2"
    rounded="full"
    {...props}
  >
    <Box h="full" w="full" rounded={"full"} bgColor="gray.400"></Box>
  </Box>
);
const ChatScreen = () => {
  const users = [
    { name: "Selam" },
    { name: "Emeline" },
    { name: "Sonia" },
    { name: "Jane" },
    { name: "Jbke" },
    { name: "Jcke" },
    { name: "Jfke" },
    { name: "Jgke" },
    { name: "Jdke" },
    { name: "Jeke" },
  ];
  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false} bg="white">
      <Box px="3" mt="2">
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="3xl"
          py="1.5"
          px="4"
          InputLeftElement={
            <Icon
              ml="2"
              size="4"
              color="gray.400"
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      </Box>
      <Box my="2">
        <Text my="2" ml="3">
          Activities
        </Text>
        <FlatList
          horizontal={true}
          data={users}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Box mx="2" alignItems={"center"}>
                <Profile />
                <Text>{item.name}</Text>
              </Box>
            );
          }}
        />
      </Box>
      <Box ml="3">
        <Text my="2">Messages</Text>
        {users.map(() => {
          return (
            <Box flexDirection="row" my="2">
              <Profile />
              <Box ml="2" w="4/6">
                <Box flexDirection={"row"} justifyContent="space-between">
                  <Text>Jane</Text>
                  <Text>23min</Text>
                </Box>
                <Text>
                  Hello how are you? I am going to the market .Do you want
                  burger
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </ScrollView>
  );
};
export default ChatScreen;
