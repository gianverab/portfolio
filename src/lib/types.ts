// Define TypeScript enum for menu items
export enum MenuItems {
    Home = 'HOME',
    About = 'ABOUT',
    Solutions = 'SOLUTIONS',
    Work = 'WORK',
    Skills = 'SKILLS',
    Testimonials = 'TESTIMONIALS',
    Contact = 'CONTACT',
}

// Define TypeScript enum for work items
export enum WorkItems {
    All = 'All',
    React = 'React',
    ReactNative = 'React Native',
    TypeScript = 'TypeScript',
    JavaScript = 'JavaScript',
    XState = 'XState',
    Sanity = 'Sanity',
    SPA = 'SPA',
    Web = 'Website',
}

// Define type for projects
export type Project = {
    codeLink: string
    description: string
    imageUrl: string
    projectLink: string
    tags: string[]
    title: string
    _id: string
}

// Define type for work experience
export type WorkExperience = {
    name: string
    description: string
    company: string
    _key: string
}

// Define type for experience
export type Experience = {
    _id: string
    year: string
    works: WorkExperience[]
}

// Define type for skill
export type Skill = {
    name: string
    bgColor: string
    _id: string
    iconSrc: string
}

// Define type for brand
export type Brand = {
    name: string
    _id: string
    imageUrl: string
}

// Define type for testimonial
export type Testimonial = {
    name: string
    _id: string
    company: string
    feedback: string
    imgUrl: string
}

// Define type for about
export type About = {
    title: string
    description: string
    _id: string
    imageUrl: string
}

// Define type for about
export type Solution = {
    title: string
    description: string
    _id: string
    imageUrl: string
}

// Define type for formdata
export type FormData = {
    name: string
    email: string
    message: string
}
