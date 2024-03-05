import json
from llama_cpp import Llama, LlamaGrammar

MODEL_LLAMA = "meta-llama/Llama-2-7b"
MODEL_LLAMA_QUANTISED = "TheBloke/Llama-2-7B-GGUF"
MODEL_LLAMA_QUANTISED_FILE = "llama-2-7b.Q2_K.gguf"

MODEL_MISTRAL = "mistralai/Mistral-7B-Instruct-v0.2"
MODEL_MISTRAL_QUANTISED = "TheBloke/Mistral-7B-Instruct-v0.2-GGUF"
MODEL_MISTRAL_QUANTISED_FILE = "mistral-7b-instruct-v0.2.Q2_K.gguf"

MODEL_8xMISTRAL = "mistralai/Mixtral-8x7B-Instruct-v0.1"
MODEL_8xMISTRAL_QUANTISED = "TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF"
MODEL_8xMISTRAL_QUANTISED_FILE = "mixtral-8x7b-instruct-v0.1.Q5_K_M.gguf"


llm = Llama(
    model_path=".cache/huggingface/hub/models--TheBloke--Mixtral-8x7B-Instruct-v0.1-GGUF/snapshots/fa1d3835c5d45a3a74c0b68805fcdc133dba2b6a/mixtral-8x7b-instruct-v0.1.Q5_K_M.gguf",  # Download the model file first
    n_ctx=4096,  # The max sequence length to use - note that longer sequence lengths require much more resources
    n_gpu_layers=-1,         # The number of layers to offload to GPU, if you have GPU acceleration available
    chat_format="mistral-instruct"
)

# load grammar
with open("grammar.gbnf", "r") as f:
    grammar_text = f.read()
    grammar = LlamaGrammar.from_string(grammar_text)


with open("lm_additional_system_prompt_info.txt", "r", encoding="utf-8") as f:
    extra_info = f.read()

system_message = f"""
You are a helpful AI that can extract information from electronic health records.
Given an electronic health record, extract the relevant information to produce a JSON with the following fields:
{extra_info}
Start is the starting index of where that annotation appears within the text.
Event type must be either of Adverse_event or Potential_therapeutic_effect.
If an optional field is not present, it should be entirely omitted from the JSON. Required fields must not be empty.
Ensure the JSON is valid and contains the correct data types.
"""

output_file = open("output.txt", "w")
output_file.write("")
output_file.close()

with open("train.json", "r") as file:
    for line in file:
        print("Processing record")
        record = json.loads(line)
        prompt_record = record["id"] + " " + record["context"]

        # Annotate the text
        output = llm.create_chat_completion(
            messages=[
                {
                    "role" : "user",
                    "content" : system_message + '12962465_2 Gynaecomastia is a rarely reported adverse drug reaction due to isoniazid therapy.'
                },
                {
                    "role" : "assistant",
                    "content" : "{'id': '12962465_2', 'context': 'Gynaecomastia is a rarely reported adverse drug reaction due to isoniazid therapy.', 'is_mult_event': False, 'annotations': [{'events': [{'event_id': 'E1', 'event_type': 'Adverse_event', 'Trigger': {'text': ['adverse drug reaction'], 'start': [35], 'entity_id': ['T4']}, 'Treatment': {'text': ['isoniazid therapy'], 'start': [64], 'entity_id': ['T3'], 'Drug': {'text': ['isoniazid'], 'start': [64], 'entity_id': ['T6']}, 'Effect': {'text': ['Gynaecomastia'], 'start': [0], 'entity_id': ['T5']}}]}]}"
                },
                {
                    "role" : "user",
                    "content" : '7986915_2 We describe a patient with a liver abscess due to Entamoeba histolytica, in whom metronidazole therapy (total dose, 21 g over 14 days) was complicated by reversible deafness, tinnitus, and ataxia and who relapsed 5 months later with a splenic abscess.'
                },
                {
                    "role" : "assistant",
                    "content" : '{"id": "7986915_2", "context": "We describe a patient with a liver abscess due to Entamoeba histolytica, in whom metronidazole therapy (total dose, 21 g over 14 days) was complicated by reversible deafness, tinnitus, and ataxia and who relapsed 5 months later with a splenic abscess.", "is_mult_event": false, "annotations": [{"events": [{"event_id": "E1", "event_type": "Adverse_event", "Trigger": {"text": ["complicated"], "start": [139], "entity_id": ["T13"]}, "Subject": {"text": ["a patient with a liver abscess due to Entamoeba histolytica"], "start": [12], "entity_id": ["T11"]}, "Treatment": {"text": ["metronidazole therapy (total dose, 21 g over 14 days)"], "start": [81], "entity_id": ["T12"], "Drug": {"text": ["metronidazole"], "start": [81], "entity_id": ["T17"]}, "Dosage": {"text": ["21 g"], "start": [116], "entity_id": ["T18"]}, "Duration": {"text": ["14 days"], "start": [126], "entity_id": ["T19"]}, "Disorder": {"text": ["liver abscess"], ["Entamoeba histolytica"], "start": [29], [50], "entity_id": ["T20", "T21"]}}, "Effect": {"text": ["reversible deafness, tinnitus, and ataxia and who relapsed 5 months later with a splenic abscess"], "start": [154], "entity_id": ["T14"]}}]}]}'
                },
                {
                    "role" : "user",
                    "content" : prompt_record
                },
            ],
            max_tokens=4096,
            temperature=0.5,
            stop=["</s>"],
            grammar=grammar # Try format outputs with a grammar
        )  

        result = output["choices"][0]["message"]["content"]
        print(f"Prompt record: {prompt_record}\n output: {result}")
        with open("output.txt", "a", encoding="utf-8") as output_file:
            output_file.write(result + "\n")

print("Done!")
