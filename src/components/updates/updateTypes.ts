export type UpdateType =
  | "project"
  | "featured-ui"
  | "featured-graphic"
  | "blog"
  | "ui-diary";

export type UpdateItem = {
  type: UpdateType;
  id: string; // references ID in respective data file
};