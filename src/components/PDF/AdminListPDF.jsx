import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// Create Document Component
const AdminListPDF = ({ user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Admin Report</Text>
        <Text style={styles.text}>Full Name: {user.full_name}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        <Text style={styles.text}>Status: {user.status}</Text>
        <Text style={styles.text}>
          Date of Creation: {user.date_of_creation}
        </Text>
        <Text style={styles.text}>Permissions: {user.permission}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Detailed Permissions:</Text>
        <Text style={styles.text}>
          Can Create New User:{" "}
          {user.permissions.canCreateNewUser ? "Yes" : "No"}
        </Text>
        <Text style={styles.text}>
          Can Edit User: {user.permissions.canEditUser ? "Yes" : "No"}
        </Text>
        <Text style={styles.text}>
          Can Send Message: {user.permissions.canSendMessage ? "Yes" : "No"}
        </Text>
        <Text style={styles.text}>
          Can Export Medical Report:{" "}
          {user.permissions.canExportMedicalReport ? "Yes" : "No"}
        </Text>
        <Text style={styles.text}>
          Can Export Basic Info:{" "}
          {user.permissions.canExportBasicInfo ? "Yes" : "No"}
        </Text>
        <Text style={styles.text}>
          Can View Medical Record:{" "}
          {user.permissions.canViewMedicalRecord ? "Yes" : "No"}
        </Text>
        {/* Add other permissions as needed */}
      </View>
    </Page>
  </Document>
);

export default AdminListPDF;
