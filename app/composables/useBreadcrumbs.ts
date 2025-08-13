import { computed } from "vue";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export const useBreadcrumbs = () => {
  const route = useRoute();

  // Extended page name mapping with hierarchy
  const pageNames: Record<string, string> = {
    "/": "Home",
    "/dashboard": "Dashboard",
    "/dashboard/analytics": "Analytics",
    "/dashboard/reports": "Reports",
    "/users": "Users",
    "/settings": "Settings",
  };

  // Generate full breadcrumb trail
  const breadcrumbs = computed(() => {
    const currentPath = route.path.replace(/\/+$/, "") || "/";
    const segments = currentPath.split("/").filter(Boolean);
    const items: BreadcrumbItem[] = [];

    // Always add Home as first item unless we're already on home
    if (currentPath !== "/") {
      items.push({
        label: "Home",
        href: "/",
      });
    }

    // Build breadcrumb trail
    let accumulatedPath = "";
    segments.forEach((segment, index) => {
      accumulatedPath += "/" + segment;
      const normalizedPath = accumulatedPath;
      
      // Get page name from mapping or generate from segment
      let label = pageNames[normalizedPath];
      
      if (!label) {
        // Format segment: capitalize and replace hyphens with spaces
        label = segment
          .split("-")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }

      const isLast = index === segments.length - 1;
      
      items.push({
        label,
        href: isLast ? undefined : normalizedPath,
        isActive: isLast,
      });
    });

    // If we're on home page, just show Home
    if (currentPath === "/") {
      items.push({
        label: "Home",
        isActive: true,
      });
    }

    return items;
  });

  // Get page title for the current page
  const pageTitle = computed(() => {
    const crumbs = breadcrumbs.value;
    return crumbs[crumbs.length - 1]?.label || "Page";
  });

  return {
    breadcrumbs,
    pageTitle,
  };
};
