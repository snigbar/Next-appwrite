

const ProfilePage = ({params}:any) => {
  return (
    <div className="flex justify-center  items-center h-screen text-center bg-zinc-900 text-white">Proflile <span className="ml-1 px-2 py-3 bg-orange-500 rounded-lg text-dark">{params.id}</span></div>
  )
}

export default ProfilePage