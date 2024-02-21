from typing import Optional
from llama_cpp import LogitsProcessorList
from lmformatenforcer import CharacterLevelParser
from lmformatenforcer.integrations.llamacpp import build_llamacpp_logits_processor
from lmformatenforcer import JsonSchemaParser
from pydantic import BaseModel
from typing import List
from IPython.display import display, Markdown

def display_header(text):
    display(Markdown(f'**{text}**'))

def display_content(text):
    display(Markdown(f'```\n{text}\n```'))

def llamacpp_with_character_level_parser(llm: Llama, prompt: str, character_level_parser: Optional[CharacterLevelParser]) -> str:
    logits_processors: Optional[LogitsProcessorList] = None
    if character_level_parser:
        logits_processors = LogitsProcessorList([build_llamacpp_logits_processor(llm, character_level_parser)])
    
    output = llm(prompt, logits_processor=logits_processors)
    text: str = output['choices'][0]['text']
    return text