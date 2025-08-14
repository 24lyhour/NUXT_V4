<script setup lang="ts">
import type { SidebarProps } from "~/components/ui/sidebar"
import {
  AudioWaveform,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-vue-next"
import Sidebar from "~/components/ui/sidebar/Sidebar.vue"
import SidebarHeader from "~/components/ui/sidebar/SidebarHeader.vue"
import TeamSwitcher from "~/components/TeamSwitcher.vue"
import SidebarContent from "~/components/ui/sidebar/SidebarContent.vue"
import NavMain from "~/components/NavMain.vue"
import NavProjects from "~/components/NavProject.vue"
import NavUser from "~/components/NavUser.vue"
import SidebarFooter from "~/components/ui/sidebar/SidebarFooter.vue"
import SidebarRail from "~/components/ui/sidebar/SidebarRail.vue"


const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
  variant: "sidebar",
})

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/github.png",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "Overviews",
          url: "/dashboard/overviews"
        },
        {
          title: "Reports",
          url: "/dashboard/reports",
        },

      ],
    },
    {
      title: "Users",
      url: "/users",
      icon: Bot,
      isActive: false,
      items: [
        {
          title: "All Users",
          url: "/users",
        },
        {
          title: "Memberships",
          url: "/memberships",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      isActive: false,
      items: [
        {
          title: "General",
          url: "/settings",
        },
        {
          title: "Profile",
          url: "/settings/profile",
        },
        {
          title: "Security",
          url: "/settings/security",
        },
      ],
    },
  ],
  projects: [
    {
      title: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      title: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      title: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :items="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
