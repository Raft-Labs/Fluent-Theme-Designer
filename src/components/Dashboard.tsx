import { TestImages } from "@fluentui/example-data";
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardDetails,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardType,
  IPersonaSharedProps,
  IStackItemStyles,
  Persona,
  PersonaPresence,
  PersonaSize,
  SearchBox,
  Stack,
  Text,
} from "@fluentui/react";
import {
  IDocumentCardActivityPerson,
  IDocumentCardPreviewProps,
} from "@fluentui/react/lib/DocumentCard";
import { IStackTokens } from "@fluentui/react/lib/Stack";
import { getTheme } from "@fluentui/react/lib/Styling";
import React from "react";
import { Navbar } from "./Navbar";

const stackTokens: IStackTokens = { childrenGap: 20 };
const theme = getTheme();
const { palette, fonts } = theme;

const people: IDocumentCardActivityPerson[] = [
  { name: "Annie Lindqvist", profileImageSrc: TestImages.personaFemale },
  { name: "Roko Kolar", profileImageSrc: "", initials: "RK" },
  { name: "Aaron Reid", profileImageSrc: TestImages.personaMale },
  { name: "Christian Bergqvist", profileImageSrc: "", initials: "CB" },
];

const previewPropsUsingIcon: IDocumentCardPreviewProps = {
  previewImages: [
    {
      previewIconProps: {
        iconName: "OpenFile",
        styles: {
          root: { fontSize: fonts.superLarge.fontSize, color: palette.white },
        },
      },
      width: 144,
    },
  ],
  styles: { previewIcon: { backgroundColor: palette.themePrimary } },
};

const previewProps: IDocumentCardPreviewProps = {
  getOverflowDocumentCountText: (overflowCount: number) =>
    `+${overflowCount} more`,
  previewImages: [
    {
      name: "Revenue stream proposal fiscal year 2016 version02.pptx",
      linkProps: {
        href: "http://bing.com",
        target: "_blank",
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
    {
      name: "New Contoso Collaboration for Conference Presentation Draft",
      linkProps: {
        href: "http://bing.com",
        target: "_blank",
      },
      previewImageSrc: TestImages.documentPreviewTwo,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
    {
      name: "Spec Sheet for design",
      linkProps: {
        href: "http://bing.com",
        target: "_blank",
      },
      previewImageSrc: TestImages.documentPreviewThree,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
    {
      name: "Contoso Marketing Presentation",
      linkProps: {
        href: "http://bing.com",
        target: "_blank",
      },
      previewImageSrc: TestImages.documentPreview,
      iconSrc: TestImages.iconPpt,
      width: 144,
    },
  ],
};

const previewOutlookUsingIcon: IDocumentCardPreviewProps = {
  previewImages: [
    {
      previewIconProps: {
        iconName: "OutlookLogo",
        styles: {
          root: {
            fontSize: fonts.superLarge.fontSize,
            color: "#0078d7",
            backgroundColor: palette.neutralLighterAlt,
          },
        },
      },
      width: 144,
    },
  ],
  styles: {
    previewIcon: { backgroundColor: palette.neutralLighterAlt },
  },
};

const stackItemStyle: IStackItemStyles = {
  root: {
    margin: 20,
    border: "2px solid #80808050",
    padding: 20,
  },
};

const Dashboard = () => {
  const examplePersona: IPersonaSharedProps = {
    imageInitials: "AJ",
    text: "Aravind Jaimon",
    secondaryText: "Software Engineer",
    showSecondaryText: true,
  };

  return (
    <div className="flex">
      <div className="fixed z-40 inset-0 flex-none h-full  bg-opacity-25 w-full  lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden">
        <Navbar />
      </div>
      <div className="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
        <Stack styles={{ root: { margin: 40 } }}>
          <Stack.Item styles={{ root: { padding: 20 } }}>
            <SearchBox
              placeholder="Search"
              onSearch={(newValue) => console.log("value is " + newValue)}
            />
          </Stack.Item>
          <Stack.Item styles={stackItemStyle}>
            <Stack horizontal>
              <Persona
                presence={PersonaPresence.online}
                size={PersonaSize.size72}
                {...examplePersona}
              />
            </Stack>
          </Stack.Item>
          <Stack.Item styles={stackItemStyle}>
            <Stack tokens={stackTokens}>
              <Stack.Item>
                <Text variant="xxLargePlus" className="py-10">
                  Your notifications
                </Text>
              </Stack.Item>
              <Stack.Item>
                <DocumentCard
                  aria-label="Document Card with document preview. Revenue stream proposal fiscal year 2016 version 2.
      Created by Roko Kolar a few minutes ago"
                  type={DocumentCardType.compact}
                  onClickHref="http://bing.com"
                >
                  <DocumentCardPreview
                    previewImages={[previewProps.previewImages[0]]}
                  />
                  <DocumentCardDetails>
                    <DocumentCardTitle
                      title="Revenue stream proposal fiscal year 2016 version02.pptx"
                      shouldTruncate
                    />
                    <DocumentCardActivity
                      activity="Created a few minutes ago"
                      people={[people[1]]}
                    />
                  </DocumentCardDetails>
                </DocumentCard>
                <DocumentCard
                  aria-label={
                    "Document Card with folder or site activity. 4 files were uploaded. " +
                    "Created by Annie Lindqvist a few minutes ago"
                  }
                  type={DocumentCardType.compact}
                  onClickHref="http://bing.com"
                >
                  <DocumentCardPreview {...previewProps} />
                  <DocumentCardDetails>
                    <DocumentCardTitle
                      title="4 files were uploaded"
                      shouldTruncate
                    />
                    <DocumentCardActivity
                      activity="Created a few minutes ago"
                      people={[people[0]]}
                    />
                  </DocumentCardDetails>
                </DocumentCard>
                <DocumentCard
                  aria-label="Document Card with icon. View and share files. Created by Aaron Reid a few minutes ago"
                  type={DocumentCardType.compact}
                  onClickHref="http://bing.com"
                >
                  <DocumentCardPreview {...previewPropsUsingIcon} />
                  <DocumentCardDetails>
                    <DocumentCardTitle
                      title="View and share files"
                      shouldTruncate
                    />
                    <DocumentCardActivity
                      activity="Created a few minutes ago"
                      people={[people[2]]}
                    />
                  </DocumentCardDetails>
                </DocumentCard>
                <DocumentCard
                  aria-label={
                    "Document Card with email conversation. Conversation about takeaways from annual SharePoint conference. " +
                    "Sent by Christian Bergqvist a few minutes ago"
                  }
                  type={DocumentCardType.compact}
                  onClickHref="http://bing.com"
                >
                  <DocumentCardPreview {...previewOutlookUsingIcon} />
                  <DocumentCardDetails>
                    <DocumentCardTitle
                      title="Conversation about takeaways from annual SharePoint conference"
                      shouldTruncate
                    />
                    <DocumentCardActivity
                      activity="Sent a few minutes ago"
                      people={[people[3]]}
                    />
                  </DocumentCardDetails>
                </DocumentCard>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </div>
    </div>
  );
};

export default Dashboard;
