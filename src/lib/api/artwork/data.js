import { serverFetch } from "../server"

export const myArt = async (email) => {
    const result = await serverFetch(`/api/artworks/${email}`)
    return result
}