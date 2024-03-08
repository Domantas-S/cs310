import json
from llama_cpp import Llama, LlamaGrammar

MODEL_LLAMA = "meta-llama/Llama-2-7b"
MODEL_LLAMA_QUANTISED = "TheBloke/Llama-2-7B-GGUF"
MODEL_LLAMA_QUANTISED_FILE = "llama-2-7b.Q2_K.gguf"

MODEL_MISTRAL = "mistralai/Mistral-7B-Instruct-v0.2"
MODEL_MISTRAL_QUANTISED = "TheBloke/Mistral-7B-Instruct-v0.2-GGUF"
MODEL_MISTRAL_QUANTISED_FILE = "mistral-7b-instruct-v0.2.Q2_K.gguf"

MODEL_MISTRAL_Q5 = "TheBloke/Mistral-7B-Instruct-v0.1-GGUF"
MODEL_MISTRAL_Q5_FILE = "mistral-7b-instruct-v0.1.Q5_K_M.gguf"

MODEL_8xMISTRAL = "mistralai/Mixtral-8x7B-Instruct-v0.1"
MODEL_8xMISTRAL_QUANTISED = "TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF"
MODEL_8xMISTRAL_QUANTISED_FILE = "mixtral-8x7b-instruct-v0.1.Q5_K_M.gguf"


llm = Llama(
    model_path=f"models/{MODEL_MISTRAL_Q5_FILE}",
    n_ctx=4096,  # The max sequence length to use - note that longer sequence lengths require much more resources
    n_gpu_layers=-1,         # The number of layers to offload to GPU, if you have GPU acceleration available
    chat_format="mistral-instruct"
)

# load grammar
# with open("grammar.gbnf", "r") as f:
#     grammar_text = f.read()
#     grammar = LlamaGrammar.from_string(grammar_text)

systemMessage = 'If this JSON string is invalid, correct all the errors and make it valid. If the JSON string is already valid, return it as is. Only return the JSON and nothing else. '

exampleInput1 = '{"id": "10698143_4","context": "We report the case of an 11-month-old female infant with a depressed level of consciousness after ingestion of ibuprofen whose mental status markedly improved with administration of naloxone.","events": [{"type": "Adverse_event","annotations": [{"annotation": "Trigger","text": "ingestion of ibuprofen"},{"annotation": "Treatment","text": "naloxone"},{"annotation": "Treatment.Drug","text": "ibuprofen"},{"annotation": "Effect","text": "depressed level of consciousness"},{"annotation": "Treatment.Drug","text": "naloxone"},{"annotation": "Treatment.Drug","text": "ibuprofen"},{"annotation": "Event type","text": "Adverse_event"}]}]'
exampleOutput1 = '{"id": "10698143_4","context": "We report the case of an 11-month-old female infant with a depressed level of consciousness after ingestion of ibuprofen whose mental status markedly improved with administration of naloxone.","events": [{"type": "Adverse_event","annotations": [{"annotation": "Trigger","text": "ingestion of ibuprofen"},{"annotation": "Treatment","text": "naloxone"},{"annotation": "Treatment.Drug","text": "ibuprofen"},{"annotation": "Effect","text": "depressed level of consciousness"},{"annotation": "Treatment.Drug","text": "naloxone"},{"annotation": "Treatment.Drug","text": "ibuprofen"},{"annotation": "Event type","text": "Adverse_event"}]}]}'
exampleInput2 = '{"id": "11197767_1","context": "Toxicity of cadmium and zinc to encystment and in vitro excystment of Parorchis acanthus (Digenea: Philophthalmidae).","events": [{"type": "Adverse_event","annotations": [{"annotation": "Trigger","text": "toxicity"},{"annotation": "Effect","text": "encystment and in vitro excystment"},{"annotation": "Treatment","text": "cadmium and zinc"},{"annotation": "Treatment.Drug","text": "cadmium"},{"annotation": "Treatment.Drug","text": "zinc"},{"annotation": "Treatment.Disorder","text": "Parorchis acanthus"}]}]'
exampleOutput2 = '{"id": "11197767_1","context": "Toxicity of cadmium and zinc to encystment and in vitro excystment of Parorchis acanthus (Digenea: Philophthalmidae).","events": [{"type": "Adverse_event","annotations": [{"annotation": "Trigger","text": "toxicity"},{"annotation": "Effect","text": "encystment and in vitro excystment"},{"annotation": "Treatment","text": "cadmium and zinc"},{"annotation": "Treatment.Drug","text": "cadmium"},{"annotation": "Treatment.Drug","text": "zinc"},{"annotation": "Treatment.Disorder","text": "Parorchis acanthus"}]}]}'

output_file = open("output_clean.txt", "w")
output_file.write("")
output_file.close()

with open("output.txt", "r") as file:
    for line in file:
        print(f"Processing line: {line}")

        # Annotate the text
        output = llm.create_chat_completion(
            messages=[
                {
                    "role" : "user",
                    "content" : systemMessage + exampleInput1
                },
                {
                    "role" : "assistant",
                    "content" : exampleOutput1
                },
                {
                    "role" : "user",
                    "content" : exampleInput2
                },
                {
                    "role" : "assistant",
                    "content" : exampleOutput2
                },
                {
                    "role" : "user",
                    "content" : line
                }
            ],
            max_tokens=4096,
            temperature=0.5,
            stop=["</s>"]
            # response_format={ # Using built-in llama cpp response format is not strict and introduces fields that are not in the schema
            #     "type": "json_object",
            #     "schema" : json.dumps(Record.model_json_schema()),
            # },
            # grammar=grammar # Try format outputs with a grammar
        )  

        result = output["choices"][0]["message"]["content"].replace("\n", "").replace('\\', '')
        # print(f"Prompt record: {prompt_record}\n output: {result}")
        with open("output_clean.txt", "a", encoding="utf-8") as output_file:
            output_file.write(result + "\n")

print("Done!")
