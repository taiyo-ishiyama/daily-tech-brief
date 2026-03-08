import { defineField, defineType } from "sanity";

export const digest = defineType({
  name: "digest",
  title: "Digest",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "featuredArticle",
      title: "Featured Article",
      type: "reference",
      to: [{ type: "article" }],
    }),
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),
    defineField({
      name: "topicStats",
      title: "Topic Stats",
      type: "object",
      fields: [
        defineField({ name: "ai", title: "AI", type: "number" }),
        defineField({ name: "startups", title: "Startups", type: "number" }),
        defineField({ name: "cloud", title: "Cloud", type: "number" }),
        defineField({ name: "security", title: "Security", type: "number" }),
        defineField({ name: "webDevelopment", title: "Web Development", type: "number" }),
        defineField({ name: "openSource", title: "Open Source", type: "number" }),
      ],
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
    },
    prepare({ title, date }) {
      return {
        title,
        subtitle: date,
      };
    },
  },
});
