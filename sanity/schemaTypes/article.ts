import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
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
      options: { source: "title", maxLength: 120 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourceName",
      title: "Source Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
    }),
    defineField({
      name: "summaryShort",
      title: "Short Summary (TL;DR)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summaryLong",
      title: "Full Summary",
      type: "text",
      rows: 10,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whyItMatters",
      title: "Why It Matters",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "keyTakeaways",
      title: "Key Takeaways",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "reference",
      to: [{ type: "topic" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "object",
      fields: [
        defineField({
          name: "mode",
          title: "Mode",
          type: "string",
          options: {
            list: [
              { title: "Source", value: "source" },
              { title: "Screenshot", value: "screenshot" },
              { title: "None", value: "none" },
            ],
          },
          initialValue: "none",
        }),
        defineField({ name: "url", title: "URL", type: "url" }),
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
        defineField({ name: "width", title: "Width", type: "number" }),
        defineField({ name: "height", title: "Height", type: "number" }),
        defineField({ name: "sourceUrl", title: "Source URL", type: "url" }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "digestDate",
      title: "Digest Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      initialValue: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "sourceName",
      date: "digestDate",
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: `${subtitle} — ${date}`,
      };
    },
  },
});
