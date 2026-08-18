import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("about", "./routes/about.tsx"),
  route("company", "./routes/company.tsx"),
  route("industries/:slug", "./routes/industry.tsx"),
  route("privacy", "./routes/privacy.tsx"),
  route("terms", "./routes/terms.tsx"),
  route("apply/join-team", "./routes/apply-join-team.tsx"),
  route("apply/strategic-conversation", "./routes/apply-strategic-conversation.tsx"),
  route("apply/strategic-collaboration", "./routes/apply-strategic-collaboration.tsx"),
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;
