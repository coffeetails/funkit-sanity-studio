import type { StructureResolver } from "sanity/structure";
import { CalendarIcon, UsersIcon, PinIcon, DocumentsIcon, HeartIcon, CircleIcon } from "@sanity/icons";

// TODO: Make a GROQ filter for the pages https://www.sanity.io/docs/dynamically-group-list-items-with-a-groq-filter 
// TODO: Add a image gallery https://www.sanity.io/guides/how-to-use-structured-content-for-page-building

export const structure: StructureResolver = (S) => 
    S.list()
        .id("root")
        .title("Content")
        .items([
            S.documentTypeListItem("page").title("Sidor").icon(DocumentsIcon),
            S.documentTypeListItem("location").title("Lokaler").icon(PinIcon),
            S.documentTypeListItem("sponsor").title("Sponsorer").icon(HeartIcon),
            S.divider(),
            S.listItem().title("Development").icon('CircleIcon')
            .child(
                S.list().title("Dev stuff").items([
                    S.listItem()
                        .title('Upcoming Events')
                        .schemaType('event')
                        .icon(CalendarIcon)
                        .child(S.documentList().title('Upcoming Events').filter('date > now()')),
                    S.listItem()
                        .title('Past Events')
                        .schemaType('event')
                        .icon(CalendarIcon)
                        .child(S.documentList().title('Past Events').filter('date < now()')),
                    S.divider(),
                    S.documentTypeListItem("artist").title("Artists").icon(UsersIcon),
                    S.documentTypeListItem("venue").title("Venues").icon(PinIcon),
                ])
            ),
        ])
        