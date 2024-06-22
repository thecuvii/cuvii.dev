import { defineDocumentType, makeSource } from "contentlayer/source-files";

const Dish = defineDocumentType(() => ({
  name: "Dish",
  contentType: "mdx",
  filePathPattern: "content/dishes/*.mdx",
  fields: {
    published: { type: "boolean", required: false },
  },
  computedFields: {
    name: {
      type: "string",
      resolve: (dish) => dish._raw.sourceFileName.split(".")[1],
    },
    order: {
      type: "number",
      resolve: (dish) => Number(dish._raw.sourceFileName.split(".")[0]),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Dish],
  onSuccess: async (getData) => {},
});
