import type { StructureResolver } from "sanity/structure";
import { CalendarIcon, UsersIcon, PinIcon, DocumentsIcon, HeartIcon } from "@sanity/icons";

// TODO: Make a GROQ filter for the pages to get nice categories in the studio https://www.sanity.io/docs/dynamically-group-list-items-with-a-groq-filter - 1week
// TODO: Add an image gallery https://www.sanity.io/guides/how-to-use-structured-content-for-page-building - 3days
// TODO: Add a page builder (link above) to be able to add images to pages - 1week
// TODO: Add News section - 3days
// TODO: Add separate document type for events (makes the data more dynamic and easier to work with & spread) - 1week
// FIXME: Clean up the studio from dev stuff - 1day

export const structure: StructureResolver = (S) => 
    S.list()
        .id("root")
        .title("Content")
        .items([
            S.documentTypeListItem("page").title("Sidor").icon(DocumentsIcon),
            S.documentTypeListItem("location").title("Lokaler").icon(PinIcon),
            S.documentTypeListItem("sponsor").title("Sponsorer").icon(HeartIcon),
            S.divider(),
            S.listItem().title("Development")
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
        