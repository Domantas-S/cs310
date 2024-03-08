import json
import untruncate_json
from llama_cpp import Llama, LlamaGrammar
# from newschema import Record

from typing import Optional, List
from enum import Enum
from pydantic import BaseModel

class annotation(BaseModel):
    start: Optional[int]
    annotation: str
    text: str
    
class event(BaseModel):
    type: str
    annotations: List[annotation]

class Record(BaseModel):
    id: str
    context: str
    events: List[event]


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
    n_ctx=2048,  # The max sequence length to use - note that longer sequence lengths require much more resources
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
Event type must be either of Adverse_event or Potential_therapeutic_effect.
If a annotaion field is not present, don't include it in the JSON.
Ensure the JSON is valid and contains the correct data types.
"""

output_file = open("output.txt", "w")
output_file.write("")
output_file.close()

with open("test.json", "r") as file:
    for line in file:
        print("Processing record")
        record = json.loads(line)
        prompt_record = record["id"] + " " + record["context"]

        # Annotate the text
        output = llm.create_chat_completion(
            messages=[
                {
                    "role" : "user",
                    "content" : system_message + '7978578_1 Response of a promethazine-induced coma to flumazenil.'
                },
                {
                    "role" : "assistant",
                    "content" : '{"id":"7978578_1","context":"Response of a promethazine-induced coma to flumazenil.","events":[{"type":"Adverse_event","annotations":[{"annotation":"Trigger","text":"induced"},{"annotation":"Treatment","text":"promethazine"},{"annotation":"Treatment.Drug","text":"promethazine"},{annotation":"Effect","text":"coma"}]},{"type":"Potential_therapeutic_event","annotations":[{"annotation":"Trigger","text":"Response"},{"annotation":"Treatment","text":"flumazenil"},{"annotation":"Treatment.Disorder","text":"promethazine-induced coma"},{"annotation":"Treatment.Drug","text":"flumazenil"}]}]}',
                },
                {
                    "role" : "user",
                    "content" : '16728538_2 Drug-induced hepatitis in an acromegalic patient during combined treatment with pegvisomant and octreotide long-acting repeatable attributed to the use of pegvisomant.'
                },
                {
                    "role" : "assistant",
                    "content" : '{"id":"16728538_2","context":"Drug-induced hepatitis in an acromegalic patient during combined treatment with pegvisomant and octreotide long-acting repeatable attributed to the use of pegvisomant.","events":[{"type":"Adverse_event","annotations":[{"annotation":"Trigger","text":"induced"},{"annotation":"Effect","text":"hepatitis"},{"annotation":"Treatment","text":"combined treatment with pegvisomant and octreotide long-acting repeatable"},{"annotation":"Treatment.Disorder","text":"acromegalic"},{"annotation":"Treatment.Drug","text":"pegvisomant"},{"annotation":"Treatment.Drug","text":"octreotide"},{"annotation":"Treatment.Combination.Trigger","text":"and"},{"annotation":"Treatment.Combination.Drug","text":"pegvisomant"},{"annotation":"Treatment.Combination.Drug","text":"octreotide"},{"annotation":"Subject","text":"an acromegalic patient"},{"annotation":"Subject.Disorder","text":"acromegalic"}]}]}'
                },
                {
                    "role" : "user",
                    "content" : prompt_record
                },
            ],
            max_tokens=4096,
            temperature=0.5,
            stop=["</s>"],
            # response_format={ # Using built-in llama cpp response format is not strict and introduces fields that are not in the schema
            #     "type": "json_object",
            #     "schema" : json.dumps(Record.model_json_schema()),
            # },
            grammar=grammar # Try format outputs with a grammar
        )  

        result = output["choices"][0]["message"]["content"].replace("\n", "").replace('\\', '')
        print(f"Prompt record: {prompt_record}\n output: {result}")
        with open("output.txt", "a", encoding="utf-8") as output_file:
            output_file.write(untruncate_json.complete(result) + "\n")

print("Done!")
