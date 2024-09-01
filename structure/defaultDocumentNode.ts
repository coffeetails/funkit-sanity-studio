import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case `artist`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "event" && references($id)]`,
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'}
          })
          .title('Events'),
      ])
      case `page`:
        return S.document().views([
          S.view.form(),
          S.view
            .component(DocumentsPane)
            .options({
              query: `*[_type == "page" && $id == parentPage->_id]`,
              params: {id: `_id`},
              options: {perspective: 'previewDrafts'}
            })
            .title('Meny'),
        ])
    default:
      return S.document().views([S.view.form()])
  }
}