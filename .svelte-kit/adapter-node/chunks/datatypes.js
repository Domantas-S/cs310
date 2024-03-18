var DataSource = /* @__PURE__ */ ((DataSource2) => {
  DataSource2[DataSource2["PHEE_TRAIN_SET"] = 0] = "PHEE_TRAIN_SET";
  DataSource2[DataSource2["PHEE2_TEST_SET"] = 1] = "PHEE2_TEST_SET";
  DataSource2[DataSource2["USER_ANNOTATED"] = 2] = "USER_ANNOTATED";
  return DataSource2;
})(DataSource || {});
var ModelType = /* @__PURE__ */ ((ModelType2) => {
  ModelType2[ModelType2["HUMAN"] = 0] = "HUMAN";
  ModelType2[ModelType2["FLANT5"] = 1] = "FLANT5";
  ModelType2[ModelType2["UIE"] = 2] = "UIE";
  ModelType2[ModelType2["MISTRAL7B"] = 3] = "MISTRAL7B";
  return ModelType2;
})(ModelType || {});
function dataSourceToString(ds) {
  switch (ds) {
    case 0:
      return "PHEE Train Set";
    case 1:
      return "PHEE2 Test Set";
    case 2:
      return "Uploaded Dataset";
  }
}
function modelTypeToString(model) {
  switch (model) {
    case 0:
      return "Human Annotated";
    case 1:
      return "FLAN-T5";
    case 2:
      return "UIE";
    case 3:
      return "Mistral-7B Instruct";
  }
}
export {
  DataSource as D,
  ModelType as M,
  dataSourceToString as d,
  modelTypeToString as m
};
