import { D as DataSource } from "../../../../chunks/datatypes.js";
import { g as getRecordByIDandModelPHEE, r as rowListToNewRecordList } from "../../../../chunks/common.js";
async function GET({ url }) {
  const id = url.searchParams.get("id");
  if (id == null) {
    return new Response(JSON.stringify({ error: "Missing id parameter" }), { status: 400 });
  }
  let source = url.searchParams.get("source");
  if (source == null) {
    return new Response(JSON.stringify({ error: "Missing source parameter" }), { status: 400 });
  }
  let model = url.searchParams.get("model");
  if (model == null) {
    return new Response(JSON.stringify({ error: "Missing model parameter" }), { status: 400 });
  }
  const sourceInt = parseInt(source);
  const modelInt = parseInt(model);
  let result = [];
  switch (sourceInt) {
    case DataSource.PHEE2_TEST_SET:
      result = await getRecordByIDandModelPHEE(id, modelInt);
      return new Response(JSON.stringify(rowListToNewRecordList(result)[0]), { status: 200 });
    case DataSource.PHEE_TRAIN_SET:
      return new Response(JSON.stringify({ error: "PHEE_TRAIN_SET not supported" }), { status: 400 });
    default:
      return new Response(JSON.stringify({ error: "Invalid source parameter" }), { status: 400 });
  }
}
export {
  GET
};
