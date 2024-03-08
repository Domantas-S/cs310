
export const enum InputType {
    Parameters,
    Text
}

export const enum DataSource {
    PHEE_TRAIN_SET,
    PHEE2_TEST_SET,
    FLANT5,
    UIE,
    MISTRAL7B,
    MIXTRAL_8X7B_INSTRUCT // mixtral-8x7b-instruct-v0.1.Q5_K_M.gguf
    // Add more LLMs in the future
}

export function dataSourceToString(ds: DataSource) {
    switch (ds) {
        case DataSource.PHEE_TRAIN_SET:
            return "PHEE Train Set";
        case DataSource.PHEE2_TEST_SET:
            return "PHEE2 Test Set";
        case DataSource.FLANT5:
            return "FLAN-T5";
        case DataSource.UIE:
            return "UIE";
        case DataSource.MISTRAL7B:
            return "Mistral 7B Instruct (v0.1.Q5_K_M)";
        case DataSource.MIXTRAL_8X7B_INSTRUCT:
            return "Mixtral 8x7B Instruct (v0.1 Q5_K_M)";
    }
}