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
import { Keyboard } from "lucide-react";

const DashboardLayout = () => {
  const location = useLocation();
  return (
    <div className="flex">
      <div>
        <SidebarProvider>
          <SidebarTrigger className="flex md:hidden" />
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
      <div className=" h-screen w-full bg-red-400">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
