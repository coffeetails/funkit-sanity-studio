import type { StructureResolver } from "sanity/structure";
import { CalendarIcon, UsersIcon, PinIcon, DocumentsIcon, HeartIcon, BellIcon, CogIcon, DiamondIcon, CaseIcon, ConfettiIcon, JoystickIcon } from "@sanity/icons";
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list';
// import client from 'part:@sanity/base/client';

// https://icons.sanity.build/all

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
            orderableDocumentListDeskItem({
                type: 'sponsor',
                title: 'Sponsorer',
                icon: HeartIcon,
                createIntent: true,
                menuItems: [],
                S,
                context,
            }),
            orderableDocumentListDeskItem({
                type: 'artistAlley',
                title: 'Artist Alley',
                icon: DiamondIcon,
                createIntent: true,
                menuItems: [], 
                S,
                context,
            }),
            orderableDocumentListDeskItem({
                type: 'nonprofitOrganization',
                title: 'Föreningar',
                icon: JoystickIcon,
                createIntent: true,
                menuItems: [], 
                S,
                context,
            }),
            orderableDocumentListDeskItem({
                type: 'companies',
                title: 'Företag',
                icon: ConfettiIcon,
                createIntent: true,
                menuItems: [], 
                S,
                context,
            }),
            S.documentTypeListItem("settings").title("Inställningar").icon(CogIcon),
            S.divider(),
            S.divider(),
            S.listItem().title("Development")
            .child(
                S.list().title("Dev stuff").items([
                    S.documentTypeListItem("location").title("Lokaler").icon(PinIcon),
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
        