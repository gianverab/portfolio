// Define TypeScript enum for menu items
export enum MenuItems {
  Home = "HOME",
  About = "ABOUT",
  Work = "WORK",
  Skills = "SKILLS",
  Experience = "EXPERIENCE",
  Testimonials = "TESTIMONIALS",
  Contact = "CONTACT",
}

// Define TypeScript enum for work items
export enum WorkItems {
  All = "All",
  Web = "Web App",
  React = "React",
  TypeScript = "TypeScript",
}

// Define type for projects
export type Project = {
  codeLink: string;
  description: string;
  imageUrl: string;
  projectLink: string;
  tags: string[];
  title: string;
  _id: string;
};
