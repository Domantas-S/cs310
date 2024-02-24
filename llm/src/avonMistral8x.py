import json
from lmformatenforcer import JsonSchemaParser, CharacterLevelParser
from lmformatenforcer.integrations.transformers import build_transformers_prefix_allowed_tokens_fn
from lmformatenforcer.integrations.llamacpp import build_llamacpp_logits_processor, build_token_enforcer_tokenizer_data
from llama_cpp import Llama, LogitsProcessorList
from typing import Optional
from llm.src.schema import Record


# config = AutoConfig.from_pretrained("TheBloke/Llama-2-7b-Chat-GGUF")
MODEL_LLAMA = "meta-llama/Llama-2-7b"
MODEL_LLAMA_QUANTISED = "TheBloke/Llama-2-7B-GGUF"
MODEL_LLAMA_QUANTISED_FILE = "llama-2-7b.Q2_K.gguf"

MODEL_MISTRAL = "mistralai/Mistral-7B-Instruct-v0.2"
MODEL_MISTRAL_QUANTISED = "TheBloke/Mistral-7B-Instruct-v0.2-GGUF"
MODEL_MISTRAL_QUANTISED_FILE = "mistral-7b-instruct-v0.2.Q2_K.gguf"

MODEL_8xMISTRAL = "mistralai/Mixtral-8x7B-Instruct-v0.1"
MODEL_8xMISTRAL_QUANTISED = "TheBloke/Mixtral-8x7B-Instruct-v0.1-GGUF"
MODEL_8xMISTRAL_QUANTISED_FILE = "mixtral-8x7b-instruct-v0.1.Q5_K_M.gguf"


# Create a transformers pipeline
# llm = AutoModelForCausalLM.from_pretrained(MODEL_8xMISTRAL_QUANTISED, model_file=MODEL_8xMISTRAL_QUANTISED_FILE, model_type="mistral", gpu_layers=50, hf=True, context_length=4096)
llm = Llama(
  model_path=".cache/huggingface/hub/models--TheBloke--Mixtral-8x7B-Instruct-v0.1-GGUF/snapshots/fa1d3835c5d45a3a74c0b68805fcdc133dba2b6a/mixtral-8x7b-instruct-v0.1.Q5_K_M.gguf",  # Download the model file first
  n_ctx=4096,  # The max sequence length to use - note that longer sequence lengths require much more resources            # The number of CPU threads to use, tailor to your system and the resulting performance
  n_gpu_layers=-1         # The number of layers to offload to GPU, if you have GPU acceleration available
)

# Place model on accelerator
# model, tokenizer = Accelerator.prepare(llm, tokenizer)

tokenizer_data = build_token_enforcer_tokenizer_data(llm)

def llamacpp_with_character_level_parser(prompt: str, character_level_parser: Optional[CharacterLevelParser]) -> str:
    logits_processors: Optional[LogitsProcessorList] = None
    if character_level_parser:
        logits_processors = LogitsProcessorList([build_llamacpp_logits_processor(tokenizer_data, character_level_parser)])

    output = llm(prompt, logits_processor=logits_processors, max_tokens=None)
    text: str = output['choices'][0]['text']
    return text

with open("prompt.txt", "r") as file:
    extra_info = file.read()

# Create a character level parser and build a transformers prefix function from it
parser = JsonSchemaParser(Record.schema())

output = open("output.txt", "w")
output.write("")
output.close()


with open("train.json", "r") as file:
    for line in file:
        record = json.loads(line)
        prompt_record = record["id"] + " " + record["context"]

        prompt = f""" [INST]
            Given an electronic health record, extract the relevant information to produce a JSON of the following schema:
            {str(Record.schema_json())}
            {extra_info}
            Start is the starting index of where that annotation appears within the text.
            Event type must be either of Adverse_event or Potential_therapeutic_effect.
            If an optional field is not present, it should be entirely omitted from the JSON. Required fields must not be empty.
            Ensure the JSON is valid and contains the correct data types.
            For example: '12962465_2 Gynaecomastia is a rarely reported adverse drug reaction due to isoniazid therapy.'
            {'{"id": "12962465_2", "context": "Gynaecomastia is a rarely reported adverse drug reaction due to isoniazid therapy.", "is_mult_event": false, "annotations": [{"events": [{"event_id": "E1", "event_type": "Adverse_event", "Trigger": {"text": [["adverse drug reaction"]], "start": [[35]], "entity_id": ["T4"]}, "Treatment": {"text": [["isoniazid therapy"]], "start": [[64]], "entity_id": ["T3"], "Drug": {"text": [["isoniazid"]], "start": [[64]], "entity_id": ["T6"]}}, "Effect": {"text": [["Gynaecomastia"]], "start": [[0]], "entity_id": ["T5"]}}]}]}'}
            Another example: '7986915_2 We describe a patient with a liver abscess due to Entamoeba histolytica, in whom metronidazole therapy (total dose, 21 g over 14 days) was complicated by reversible deafness, tinnitus, and ataxia and who relapsed 5 months later with a splenic abscess.'
            {'{"id": "7986915_2", "context": "We describe a patient with a liver abscess due to Entamoeba histolytica, in whom metronidazole therapy (total dose, 21 g over 14 days) was complicated by reversible deafness, tinnitus, and ataxia and who relapsed 5 months later with a splenic abscess.", "is_mult_event": false, "annotations": [{"events": [{"event_id": "E1", "event_type": "Adverse_event", "Trigger": {"text": [["complicated"]], "start": [[139]], "entity_id": ["T13"]}, "Subject": {"text": [["a patient with a liver abscess due to Entamoeba histolytica"]], "start": [[12]], "entity_id": ["T11"]}, "Treatment": {"text": [["metronidazole therapy (total dose, 21 g over 14 days)"]], "start": [[81]], "entity_id": ["T12"], "Drug": {"text": [["metronidazole"]], "start": [[81]], "entity_id": ["T17"]}, "Dosage": {"text": [["21 g"]], "start": [[116]], "entity_id": ["T18"]}, "Duration": {"text": [["14 days"]], "start": [[126]], "entity_id": ["T19"]}, "Disorder": {"text": [["liver abscess"], ["Entamoeba histolytica"]], "start": [[29], [50]], "entity_id": ["T20", "T21"]}}, "Effect": {"text": [["reversible deafness, tinnitus, and ataxia and who relapsed 5 months later with a splenic abscess"]], "start": [[154]], "entity_id": ["T14"]}}]}]}'}
            
            Now try the same with this sentence: {prompt_record} [/INST]"""

        result = llamacpp_with_character_level_parser(prompt, parser)
        result = result.replace("\n", "")

        output = open("output.txt", "a")
        output.write(result + "\n")
        output.close()

print("Success! Check the output.txt file for the results.")