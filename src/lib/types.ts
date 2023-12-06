// Define TypeScript enum for menu items
export enum MenuItems {
  Home = "HOME",
  About = "ABOUT",
  Work = "WORK",
  Skills = "SKILLS",
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

// Define type for work experience
export type WorkExperience = {
  name: string;
  description: string;
  company: string;
  _key: string;
};

// Define type for experience
export type Experience = {
  _id: string;
  year: string;
  works: WorkExperience[];
};

// Define type for skill
export type Skill = {
  name: string;
  bgColor: string;
  _id: string;
  iconSrc: string;
};
