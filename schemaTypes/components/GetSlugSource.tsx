export async function GetSlugSource(document: { parentPage: { _ref: any; }; title: any; }, {getClient}: any) {
    
        let currentSlug = document.title.slice(0, 200)
        .toLowerCase()
        .replaceAll(/\s+/g, '-')
        .replaceAll(/[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=]/g, '')
        .replaceAll(/-{2,}/g, '')
        .replaceAll(/[æÆ]/g, 'ae')
        .replaceAll(/[åÅäÄ]/g, 'a')
        .replaceAll(/[öÖøØ]/g, 'o')
    
    if(!document.parentPage) {
        return currentSlug;
    }
    
    const { parentPage: {_ref} } = document;

    const client = getClient({apiVersion: '2024-08-19'});
    const parentSlug = await client.fetch(`*[_id == $id][0].slug.current`, {id: _ref});
    
    // If it should be on the homepage
    if(parentSlug == "/") {
        return currentSlug;
    }

    return [parentSlug, currentSlug].join('/');
}