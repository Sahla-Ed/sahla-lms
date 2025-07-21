"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { colors } from "./design-tokens";

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    padding: 30,
  },
  container: {
    flex: 1,
    border: `5px solid ${colors.primary}`,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 15,
  },
  header: {
    fontSize: 42,
    marginBottom: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  presentedTo: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.mutedForeground,
  },
  userName: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.destructive,
    marginBottom: 30,
    textTransform: "capitalize",
  },
  completionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: colors.foreground,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.primary,
    marginBottom: 40,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 40,
    alignItems: "flex-end",
  },
  date: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  signature: {
    fontSize: 12,
    color: colors.foreground,
    borderTop: `1px solid ${colors.primary}`,
    paddingTop: 5,
    width: 200,
    textAlign: "center",
  },

  certificateId: {
    position: "absolute",
    bottom: -15,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: colors.mutedForeground,
  },
});

interface CertificateDocumentProps {
  userName: string;
  courseTitle: string;
  completionDate: string;
  certificateId: string | null;
}

export const CertificateDocument = ({
  userName,
  courseTitle,
  completionDate,
  certificateId,
}: CertificateDocumentProps) => (
  <Document
    title={`${userName} - ${courseTitle} Certificate`}
    author="Sahla Platform"
  >
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <Image src="/logoDark.png" style={styles.logo} />
          <Text style={styles.header}>Certificate of Completion</Text>
          <Text style={styles.presentedTo}>
            This certificate is proudly presented to
          </Text>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.completionText}>
            for successfully completing the online course
          </Text>
          <Text style={styles.courseTitle}>&quot;{courseTitle}&quot;</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.date}>Issued on: {completionDate}</Text>
          <Text style={styles.signature}>Sahla Platform</Text>
        </View>
        {certificateId && (
          <Text style={styles.certificateId}>
            Certificate ID: {certificateId}
          </Text>
        )}
      </View>
    </Page>
  </Document>
);
