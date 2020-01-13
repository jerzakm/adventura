interface User {
    id: string
    email: string
    location: Location
    avatar: string
    name: string
    geoBin: string //uber h3?
    friends: string[] //friend user id array
}

/**
 * Can even use jsdoc for stuff
 */
interface Location {
    longitude: number
    latitude: number
}

interface Listing {
    owner: string //userId
    created: number //ts
    updated: number //ts
    geoBin: Location
    system: string[] //array or string, array for more
    online: boolean
    description: string //markdown
}