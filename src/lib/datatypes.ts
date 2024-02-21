
export const enum InputType {
    Parameters,
    Text
}

export const enum DataSource {
    HUMAN_ANNOTATED,
    MIXTRAL_8X7B_INSTRUCT // mixtral-8x7b-instruct-v0.1.Q5_K_M.gguf
    // Add more LLMs in the future
}

export function dataSourceToString(ds: DataSource) {
    switch (ds) {
        case DataSource.HUMAN_ANNOTATED:
            return "Human Annotated";
        case DataSource.MIXTRAL_8X7B_INSTRUCT:
            return "Mixtral 8x7B Instruct (v0.1 Q5_K_M)";
    }
}