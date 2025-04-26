import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectedCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

const Profile = () => {
  const user = useAppSelector(selectedCurrentUser);
  console.log(user);

  return (
    <div className="min-h-[calc(100vh-400px)] flex justify-center items-center p-4">
      <Card className="w-full max-w-4xl p-6 rounded-2xl shadow-lg border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Profile
          </CardTitle>
          <p className="text-sm  mt-2">
            Manage your profile information
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 ">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="update">Update Profile</TabsTrigger>
            </TabsList>

            {/* Overview Section */}
            <TabsContent value="overview">
              <div className="flex flex-col md:flex-row gap-6 items-center mt-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center  text-5xl text-gray-500">
                      {user?.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="text-2xl font-semibold ">
                    {user?.name || "No Name"}
                  </h2>
                  <p className="text-sm ">{user?.email}</p>
                  <p className="text-sm ">
                    Phone: {user?.phone || "No Phone"}
                  </p>
                  <p className="text-sm ">
                    Username: {user?.userName}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Update Profile Section */}
            <TabsContent value="update">
              <form className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1" htmlFor="name">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      defaultValue={user?.name || ""}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block  mb-1" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email || ""}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1" htmlFor="phone">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      type="text"
                      defaultValue={user?.phone || ""}
                      placeholder="Enter your phone"
                    />
                  </div>
                  <div>
                    <label
                      className="block  mb-1"
                      htmlFor="userName"
                    >
                      Username
                    </label>
                    <Input
                      id="userName"
                      type="text"
                      defaultValue={user?.userName || ""}
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block  mb-1" htmlFor="image">
                    Profile Image URL
                  </label>
                  <Input
                    id="image"
                    type="text"
                    defaultValue={user?.image || ""}
                    placeholder="Paste image URL"
                  />
                </div>

                <Button type="submit" className="w-full mt-4">
                  Update Profile
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
