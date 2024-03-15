
export const enum DataSource {
    PHEE_TRAIN_SET,
    PHEE2_TEST_SET,
    USER_ANNOTATED,
}

export const enum ModelType {
    HUMAN,
    FLANT5,
    UIE,
    MISTRAL7B,
}

export function dataSourceToString(ds: DataSource) {
    switch (ds) {
        case DataSource.PHEE_TRAIN_SET:
            return "PHEE Train Set";
        case DataSource.PHEE2_TEST_SET:
            return "PHEE2 Test Set";
        case DataSource.USER_ANNOTATED:
            return "Uploaded Dataset";
    }
}

export function modelTypeToString(model: ModelType) {
    switch (model) {
        case ModelType.HUMAN:
            return "Human Annotated";
        case ModelType.FLANT5:
            return "FLAN-T5";
        case ModelType.UIE:
            return "UIE";
        case ModelType.MISTRAL7B:
            return "Mistral-7B Instruct";
    }
}