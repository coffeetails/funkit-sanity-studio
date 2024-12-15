import type { StructureResolver } from "sanity/structure";
import { CalendarIcon, UsersIcon, PinIcon, DocumentsIcon, HeartIcon, BellIcon, CogIcon } from "@sanity/icons";
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list';
// import client from 'part:@sanity/base/client';

// TODO: Add an image gallery https://www.sanity.io/guides/how-to-use-structured-content-for-page-building - 3days
// TODO: Add a page builder (link above) to be able to add images to pages - 1week
// TODO: Add separate document type for events (makes the data more dynamic and easier to work with & spread) - 1week



export const structure: StructureResolver = (S, context) => 
    S.list()
        .id("root")
        .title("Kategorier")
        .items([
            orderableDocumentListDeskItem({
                type: 'page',
                title: 'Sidor',
                icon: DocumentsIcon,
                createIntent: true,
                menuItems: [],
                S,
                context,
            }),
            // S.documentTypeListItem("updates").title("Uppdateringar").icon(BellIcon),
            orderableDocumentListDeskItem({
                type: 'updates',
                title: 'Uppdateringar',
                icon: BellIcon,
                createIntent: true,
                menuItems: [],
                S,
                context,
            }),
            S.divider(),
            S.documentTypeListItem("location").title("Lokaler").icon(PinIcon),
            // S.documentTypeListItem("gallery").title("Bilder").icon(PinIcon),
            orderableDocumentListDeskItem({
                type: 'sponsor',
                title: 'Sponsorer',
                icon: HeartIcon,
                // Required if using multiple lists of the same 'type'
                // id: 'orderable-en-projects',
                // See notes on adding a `filter` below
                // filter: `__i18n_lang == $lang`,
                // params: {
                //   lang: 'en_US',
                // },
                createIntent: true, // do not add an option for item creation
                menuItems: [], // allow an array of `S.menuItem()` to be injected to orderable document list menu
                // pass from the structure callback params above
                S,
                context,
            }),
            S.divider(),
            S.documentTypeListItem("settings").title("Inställningar").icon(CogIcon),
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
        