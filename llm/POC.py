from pydantic import BaseModel
from lmformatenforcer import JsonSchemaParser
from lmformatenforcer.integrations.transformers import build_transformers_prefix_allowed_tokens_fn
from ctransformers import AutoModelForCausalLM
from transformers import pipeline, AutoTokenizer



class AnswerFormat(BaseModel):
    first_name: str
    last_name: str
    year_of_birth: int
    num_seasons_in_nba: int
    

# config = AutoConfig.from_pretrained("TheBloke/Llama-2-7b-Chat-GGUF")
MODEL_LLAMA = "TheBloke/Llama-2-7B-GGUF"
MODEL_LLAMA_FILE = "llama-2-7b.Q2_K.gguf"

MODEL_MISTRAL = "mistralai/Mistral-7B-Instruct-v0.2"
MODEL_MISTRAL_QUANTISED = "TheBloke/Mistral-7B-Instruct-v0.2-GGUF"
MODEL_MISTRAL_QUANTISED_FILE = "mistral-7b-instruct-v0.2.Q2_K.gguf"


# Create a transformers pipeline
llm = AutoModelForCausalLM.from_pretrained(MODEL_MISTRAL_QUANTISED, model_file=MODEL_MISTRAL_QUANTISED_FILE, model_type="mistral", gpu_layers=50, hf=True)
tokenizer = AutoTokenizer.from_pretrained(MODEL_MISTRAL)

pipe = pipeline('text-generation', model=llm, tokenizer=tokenizer, max_new_tokens=1024)

prompt = f'Here is information about Michael Jordan in the following json schema: {AnswerFormat.schema_json()} :\n'

# Create a character level parser and build a transformers prefix function from it
parser = JsonSchemaParser(AnswerFormat.schema())
prefix_function = build_transformers_prefix_allowed_tokens_fn(pipe.tokenizer, parser)

# Call the pipeline with the prefix function
output_dict = pipe(prompt, prefix_allowed_tokens_fn=prefix_function)

# Extract the results
result = output_dict[0]['generated_text'][len(prompt):]
print(result)
# {'first_name': 'Michael', 'last_name': 'Jordan', 'year_of_birth': 1963, 'num_seasons_in_nba': 15}
