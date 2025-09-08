export const ROLE_PERMISSIONS = {
  admin: ["*"],
  researcher: ["create_sample", "edit_own_sample", "view_projects"],
  reviewer: ["review_sample", "edit_any_sample"],
  regulator: ["view_data", "export_data"],
  policy_maker: ["view_dashboard"],
  community: ["view_local_data"],
};

export const can = (action, user) => {
  return (
    ROLE_PERMISSIONS[user.role]?.includes(action) ||
    ROLE_PERMISSIONS[user.role]?.includes("*")
  );
};
