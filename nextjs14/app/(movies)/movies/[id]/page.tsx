import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

export default async function MovieDetail({
    params,
}: { params: any; }) {
    const id = (await params).id;

    return <div>
        <Suspense>
            <MovieInfo id={id} />
        </Suspense>
        <Suspense>
            <MovieVideos id={id} />
        </Suspense>

    </div>
}