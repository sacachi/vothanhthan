import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileForms from "./ProfileForms";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/admins/login");

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Profile</h1>
      <ProfileForms username={session.user.name ?? ""} />
    </div>
  );
}
