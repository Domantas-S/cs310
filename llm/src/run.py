import json
from lmformatenforcer import JsonSchemaParser
from lmformatenforcer.integrations.transformers import build_transformers_prefix_allowed_tokens_fn
from ctransformers import AutoModelForCausalLM
from transformers import pipeline, AutoTokenizer
from llm.src.schema import Record


# config = AutoConfig.from_pretrained("TheBloke/Llama-2-7b-Chat-GGUF")
MODEL_LLAMA = "meta-llama/Llama-2-7b"
MODEL_LLAMA_QUANTISED = "TheBloke/Llama-2-7B-GGUF"
MODEL_LLAMA_QUANTISED_FILE = "llama-2-7b.Q2_K.gguf"

MODEL_MISTRAL = "mistralai/Mistral-7B-Instruct-v0.2"
MODEL_MISTRAL_QUANTISED = "TheBloke/Mistral-7B-Instruct-v0.2-GGUF"
MODEL_MISTRAL_QUANTISED_FILE = "mistral-7b-instruct-v0.2.Q2_K.gguf"


# Create a transformers pipeline
llm = AutoModelForCausalLM.from_pretrained(MODEL_MISTRAL_QUANTISED, model_file=MODEL_MISTRAL_QUANTISED_FILE, model_type="mistral", gpu_layers=50, hf=True, context_length=4096)
tokenizer = AutoTokenizer.from_pretrained(MODEL_MISTRAL)

pipe = pipeline('text-generation', model=llm, tokenizer=tokenizer, max_new_tokens=4096)

with open("prompt.txt", "r") as file:
    extra_info = file.read()

prompt_record = ""

# Create a character level parser and build a transformers prefix function from it
parser = JsonSchemaParser(Record.schema())
prefix_function = build_transformers_prefix_allowed_tokens_fn(pipe.tokenizer, parser)

output = open("output.txt", "w")
output.write("")
output.close()

output = open("output.txt", "a")


with open("dev.json", "r") as file:
    for line in file:
        record = json.loads(line)
        prompt_record = record["id"] + " " + record["context"]
        
        prompt = f"""
            Given an electronic health record, extract the relevant information to produce a JSON of the following schema: 
            {str(Record.schema_json())} 
            {extra_info}
            Start means the starting index of where that annotation appears within the text.
            Event type must be either of Adverse_event or Potential_therapeutic_effect.
            If an optional field is not present, it should be omitted from the JSON.
            For example: '12962465_2 Gynaecomastia is a rarely reported adverse drug reaction due to isoniazid therapy.'
            {'{"id": "12962465_2", "context": "Gynaecomastia is a rarely reported adverse drug reaction due to isoniazid therapy.", "is_mult_event": false, "annotations": [{"events": [{"event_id": "E1", "event_type": "Adverse_event", "Trigger": {"text": [["adverse drug reaction"]], "start": [[35]], "entity_id": ["T4"]}, "Treatment": {"text": [["isoniazid therapy"]], "start": [[64]], "entity_id": ["T3"], "Drug": {"text": [["isoniazid"]], "start": [[64]], "entity_id": ["T6"]}}, "Effect": {"text": [["Gynaecomastia"]], "start": [[0]], "entity_id": ["T5"]}}]}]}'}
            Now try the same with this sentence: {prompt_record}"""
        
        output_dict = pipe(prompt, prefix_allowed_tokens_fn=prefix_function)
        
        result = output_dict[0]['generated_text'][len(prompt):]
        result = result.replace("\n", "")
        output.write(result + "\n")
        
output.close()

print("Success! Check the output.txt file for the results.")
        
        
# Call the pipeline with the prefix function
# output_dict = pipe(prompt, prefix_allowed_tokens_fn=prefix_function)

# # Extract the results
# result = output_dict[0]['generated_text'][len(prompt):]
# result = result.replace("\n", "")
# print(result)
