import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CircleUser, FileText, House, List, NotebookTabs, UserRound } from "lucide-react"

const listMenu = [
  { 
    "name" : "Dashboard",
    "url" : "/admin",
    "icon" : House
  },  
  { 
    "name" : "User Management",
    "url" : "/admin/user-management",
    "icon" : UserRound
  },  
  { 
    "name" : "Category",
    "url" : "/admin/category",
    "icon" : List
  } , 
  { 
    "name" : "Jurusan",
    "url" : "/admin/jurusan",
    "icon" : NotebookTabs
  } , 
  { 
    "name" : "Article",
    "url" : "/admin/article",
    "icon" : FileText
  } ,
  { 
    "name" : "Profile",
    "url" : "/admin/profile",
    "icon" : CircleUser
  } , 
  
  
]

export function AppSidebar() {
  return (
    <Sidebar className="!bg-blue-600">

      <SidebarHeader className="!bg-blue-600 text-white">
        <SidebarMenu>

          <SidebarMenuItem>
            <div>
              <img src="/img/smk_mvp_ars_logo_white.png" alt="Logo" className="mt-4 ml-2 h-15 mx-auto mb-4 object-contain" />
            </div>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="!bg-blue-600 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
            {listMenu.map((menu) => (
              <SidebarMenuItem key={menu.name}>
                <SidebarMenuButton asChild>
                  <a href={menu.url}>
                    <menu.icon/>
                    <span>{menu.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent> 
      <SidebarFooter className="!bg-blue-600 text-white"/>
    </Sidebar>
  )
}