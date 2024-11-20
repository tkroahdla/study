import { API_URL } from "../app/(home)/page";

async function getVidoes(id: string) {
    console.log(`Fethiing videos : ${Date.now()}`)
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`${API_URL}/${id}/videos`);
    return response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
    const videos = await getVidoes(id);
    return (
        <div>
            <h6>{JSON.stringify(videos)}</h6>
        </div>
    )
}