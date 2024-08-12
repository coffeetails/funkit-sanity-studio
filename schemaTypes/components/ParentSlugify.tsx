export async function parentSlugify(_input_: any) {
    const parentQuery = '*[_id == $id][0]';
    const parentQueryParams = { id: _input_.doc.parent?._ref || '', }

    const parent = await client.fetch(parentQuery, parentQueryParams)

    const parentSlug = parent?.slug?.current ? parent.slug.current : ''

    const pageSlug = _input_.doc.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)

    if (!parentSlug) {
        return slugify(pageSlug)
    }

    `return `${slugify(parentSlug)}/${slugify(pageSlug)}``

}