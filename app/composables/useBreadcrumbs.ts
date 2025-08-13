import { computed } from "vue";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export const useBreadcrumbs = () => {
  const route = useRoute();

  // Simple page name mapping
  const pageNames: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/analytics": "Analytics",
    "/dashboard/reports": "Reports",
    "/users": "Users",
    "/settings": "Settings",
  };

  // Get current breadcrumbs - just show current page
  const breadcrumbs = computed(() => {
    let currentPath = route.path;

    // Clean up path - remove trailing slashes
    currentPath = currentPath.replace(/\/+$/, "") || "/";

    // Get page name from mapping or generate from path
    let pageName = pageNames[currentPath];

    if (!pageName) {
      if (currentPath === "/" || currentPath === "") {
        pageName = "Home";
      } else {
        const segments = currentPath.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1];
        pageName =
          lastSegment.charAt(0).toUpperCase() +
          lastSegment.slice(1).replace(/-/g, " ");
      }
    }

    // Debug log to see what's happening
    console.log(
      "Breadcrumb - Current path:",
      currentPath,
      "Page name:",
      pageName
    );

    return [{ label: pageName, isActive: true }];
  });

  // Get page title for the current page
  const pageTitle = computed(() => {
    return breadcrumbs.value[0]?.label || "Page";
  });

  return {
    breadcrumbs,
    pageTitle,
  };
};
