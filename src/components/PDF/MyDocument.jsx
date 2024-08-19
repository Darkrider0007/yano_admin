import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
});

// Create Document Component
const MyDocument = ({ user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>First Name: {user?.firstName}</Text>
        <Text>Last Name: {user?.lastName}</Text>
        <Text>Email: {user?.email}</Text>
        <Text>Phone Number: {user?.phoneNumber}</Text>
        <Text>Speciality: {user?.speciality}</Text>
        <Text>Gender: {user?.gender}</Text>
        <Text>
          Date of Birth: {new Date(user?.dateOfBirth).toLocaleDateString()}
        </Text>
        <Text>User Type: {user.userType}</Text>
      </View>
      <View style={styles.section}>
        <Text>Permissions:</Text>
        <Text>
          Can Create New User:{" "}
          {user?.permission?.canCreateNewUser ? "Yes" : "No"}
        </Text>
        <Text>
          Can Edit User: {user?.permission.canEditUser ? "Yes" : "No"}
        </Text>
        <Text>
          Can Send Message: {user?.permission?.canSendMessage ? "Yes" : "No"}
        </Text>
        {/* Add other permissions as needed */}
      </View>
      <View style={styles.section}>
        <Image style={styles.image} src={user?.userImg?.secure_url} />
      </View>
    </Page>
  </Document>
);

export default MyDocument;
