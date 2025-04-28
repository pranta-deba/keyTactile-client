import { items } from "@/constants/sidebar.items";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Keyboard, Menu } from "lucide-react";

const DashboardLayout = () => {
  const location = useLocation();
  return (
    <div className="flex">
      <div className="">
        <SidebarProvider className="relative">
          <SidebarTrigger className="absolute top-2 left-2 flex md:hidden">
            <Menu scale={50} />
          </SidebarTrigger>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="!py-6">
                  <Link to="/" className="flex items-center space-x-1">
                    <Keyboard className="h-6 w-6" />
                    <span className="font-bold text-xl">KeyTactile</span>
                  </Link>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.url}
                            className={`${
                              location.pathname === item.url
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </div>
      <div className="min-h-screen w-full mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
