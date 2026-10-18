import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

export const siteConfig = {
  title: "Christian Storb",
  tagline: "STORB Consulting unterstützt Ihr Projekt bei Kunden und Geschäftspartnern vor Ort.",
  email: "mail2storb@gmail.com",
  description: "STORB Consulting unterstützt Ihr Projekt bei Kunden und Geschäftspartnern vor Ort – von der Planung über die Entwicklung bis zur Markteinführung und den Betrieb.",
  baseurl: "",
  url: "https://storb-consulting.github.io",
  author: {
    name: "Christian Storb",
    email: "mail2storb@gmail.com",
    url: "https://storb-consulting.github.io/author/christian-storb/",
    avatar: "/assets/images/authors/christian-storb.jpg",
    github: "https://github.com/chstorb",
    linkedin: "https://www.linkedin.com/in/christian-storb-326249aa/",
    twitter: "https://twitter.com/ChristianStorb",
    instagram: "https://www.instagram.com/storbconsulting"
  },
  facebook: {
    publisher: "https://www.facebook.com/storb.christian/"
  },
  github: {
    username: "chstorb"
  },
  twitter: {
    card: "summary",
    username: "ChristianStorb"
  },
  logo: "/assets/images/consulting/og-image.png",
  image: "/assets/images/consulting/og-image.png",
  social: {
    name: "Christian Storb",
    links: [
      "https://twitter.com/ChristianStorb",
      "https://www.facebook.com/storb.christian",
      "https://www.instagram.com/storbconsulting",
      "https://www.linkedin.com/in/christian-storb-326249aa/",
      "https://github.com/chstorb"
    ]
  },
  locale: "de_DE",
  lang: "de"
};

function loadYaml(filename: string): any {
  const filePath = path.join(process.cwd(), 'src', 'data', filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return YAML.parse(content);
}

export const siteData = {
  ads: loadYaml('ads.yml'),
  blog: loadYaml('blog.yml'),
  career: loadYaml('career.yml'),
  consulting: loadYaml('consulting.yml'),
  contact: loadYaml('contact.yml'),
  contacts: loadYaml('contacts.yml'),
  featured_companies: loadYaml('featured_companies.yml'),
  featured_projects: loadYaml('featured_projects.yml'),
  featured_references: loadYaml('featured_references.yml'),
  partner: loadYaml('partner.yml'),
  principles: loadYaml('principles.yml'),
  profiles: loadYaml('profiles.yml'),
  references: loadYaml('references.yml'),
  requirements: loadYaml('requirements.yml'),
  services: loadYaml('services.yml'),
};

export function loadAdHtml(includeName: string): string {
  const filePath = path.join(process.cwd(), 'src', 'data', 'ads', includeName);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  return '';
}
