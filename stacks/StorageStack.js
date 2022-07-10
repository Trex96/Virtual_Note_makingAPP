import { Bucket, Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
 
    const bucket = new Bucket(stack, "Uploads");
    const table = new Table(stack, "Notes", {
        fields: {
        userId: "string",
        noteId: "string",
        },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
  });

  return {
    table,
  };
}