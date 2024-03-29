

export default ({params}: any) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">
                Profile page of
                <span className="rounded-full bg-blue-400 ml-3 p-5">{params.id}</span>
            </p>
        </div>
    )
}