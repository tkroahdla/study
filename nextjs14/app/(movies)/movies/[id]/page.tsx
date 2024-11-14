export default async function MovieDetail({
    params,
}: { params: any; }) {
    const id = (await params).id;

    return <div>Movie Detail {id}</div>
}