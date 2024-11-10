import UserList from "../components/UserList";
import users from "../data/users.json";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="items-center bg-gray-50 justify-items-center min-h-screen">
      <Navbar />
      <UserList users={users} />
    </div>
  );
}
