import { API_URL } from "../../../(home)/page";

async function getMovie(id: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
}

export default async function MovieDetail({
    params,
}: { params: any; }) {
    const id = (await params).id;
    const movie = await getMovie(id);

    return <div>
        <h2>{movie.title}</h2>
    </div>
}