import json
from lmformatenforcer import JsonSchemaParser, CharacterLevelParser
from lmformatenforcer.integrations.transformers import build_transformers_prefix_allowed_tokens_fn
from lmformatenforcer.integrations.llamacpp import build_llamacpp_logits_processor, build_token_enforcer_tokenizer_data
from ctransformers import AutoModelForCausalLM
from transformers import pipeline, AutoTokenizer
from accelerate import Accelerator
from llama_cpp import Llama, LogitsProcessorList
from typing import Optional
from schema import Record


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
  n_ctx=4096,  # The max sequence length to use - note that longer sequence lengths require much more resources
  n_threads=8,            # The number of CPU threads to use, tailor to your system and the resulting performance
  n_gpu_layers=-1         # The number of layers to offload to GPU, if you have GPU acceleration available
)
tokenizer = AutoTokenizer.from_pretrained(MODEL_8xMISTRAL, use_fast=True)

# Place model on accelerator
# model, tokenizer = Accelerator.prepare(llm, tokenizer)

tokenizer_data = build_token_enforcer_tokenizer_data(llm)

def llamacpp_with_character_level_parser(prompt: str, character_level_parser: Optional[CharacterLevelParser]) -> str:
    logits_processors: Optional[LogitsProcessorList] = None
    if character_level_parser:
        logits_processors = LogitsProcessorList([build_llamacpp_logits_processor(tokenizer_data, character_level_parser)])
    
    output = llm(prompt, logits_processor=logits_processors)
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
            Start means the starting index of where that annotation appears within the text.
            Event type must be either of Adverse_event or Potential_therapeutic_effect.
            If an optional field is not present, it should be omitted from the JSON.
            For example: '12962465_2 Gynaecomastia is a rarely reported adverse drug reaction due to isoniazid therapy.'
            {'{"id": "12962465_2", "context": "Gynaecomastia is a rarely reported adverse drug reaction due to isoniazid therapy.", "is_mult_event": false, "annotations": [{"events": [{"event_id": "E1", "event_type": "Adverse_event", "Trigger": {"text": [["adverse drug reaction"]], "start": [[35]], "entity_id": ["T4"]}, "Treatment": {"text": [["isoniazid therapy"]], "start": [[64]], "entity_id": ["T3"], "Drug": {"text": [["isoniazid"]], "start": [[64]], "entity_id": ["T6"]}}, "Effect": {"text": [["Gynaecomastia"]], "start": [[0]], "entity_id": ["T5"]}}]}]}'}
            Now try the same with this sentence: {prompt_record} [/INST]"""

        result = llamacpp_with_character_level_parser(prompt, parser)
        result = result.replace("\n", "")

        output = open("output.txt", "a")
        output.write(result + "\n")
        output.close()

print("Success! Check the output.txt file for the results.")