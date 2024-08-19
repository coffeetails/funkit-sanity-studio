export async function parentSlugify(input: any) {
    //@ts-nocheck

    console.log("input",input);

    // ERROR: input.doc is undefined

    const parentQuery = '*[_id == $id][0]'
    const parentQueryParams = {
        id: input.doc.parent?._ref || '',
    }

    console.log("parentQuery", parentQuery);
    console.log("parentQueryParams", parentQueryParams);

    const parent = await client.fetch(parentQuery, parentQueryParams);
    const parentSlug = parent?.slug?.current ? parent.slug.current : '';
    console.log("parentSlug", parentSlug);
    const pageSlug = input.doc.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200); // standard slug prep
    console.log("pageSlug", pageSlug);
    
    if (!parentSlug) {
        return slugify(pageSlug);
    }
    return `${slugify(parentSlug)}/${slugify(pageSlug)}`;
}