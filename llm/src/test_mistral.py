from transformers import AutoModelForCausalLM, AutoTokenizer
from accelerate import Accelerator
import torch

accelerator = Accelerator()
device = accelerator.device

model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2", device_map='auto')
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2", use_fast=True)

# Place model on accelerator
model, tokenizer = accelerator.prepare(model, tokenizer)

inst_prompt = """You are a system that annotates electronic health records about adverse drug events and potential therapeutic events. 
A record may have multiple events.
An event must contain event_type (Adverse_event or Potential_therapeutic_effect).
Common fields are text: [[string]] which is the annotated text and start: [[int]] which is the start index of the annotated text.
An event may contain Effect, Trigger. These contain the common fields.
An event may contain Negated, Speculated. These contain the common fields. They also contain a value: bool field.
An event may contain Severity. This contains the common fields. It also contains a value: string field.
An event may contain Subject. This contains the common fields. It also can contain Age, Disorder, Gender, Population and Race json fields. These contain the common fields.
An event may contain Treatment. This contains the common fields. It also can contain Drug, Trigger, Disorder, Route, Dosage, Time_elapsed, Duration, Freq json fields. These contain the common fields.
Treatment can also contain Combination : [json] field. This contains the common fields. Each entry in the list contains the fields event_type, Drug, Trigger.
Additional information on how to identify these fields are provided here:
Subject: highlights the patients involved in themedical event. Sub-arguments of subject are:
Subject.Age: concrete age or span that indicates an age range.
Subject.Gender: the span that indicates the subject’s gender.
Subject.Population: the number of patients receiving the treatment.
Subject.Race: the span that indicates the subject’s race/nationality.
Subject.Disorder: preexisting conditions, i.e., disorders that the subject suffers other than the target disorder of the treatment.
Treatment: describes the therapy administered to the patients.
Treatment.Drug: drugs used as therapy in the event.
Treatment.Dosage: the amount of the drug is given.
Treatment.Frequency: the frequency of drug use.
Treatment.Route: the route of drug administration.
Treatment.Time_elapsed: the time elapsed after the drug was administered to the occurrence of the (side) effect.
Treatment.Duration: how long the patient has been taking the medicine (usually for long-term medication).
Treatment.Disorder: the target disorder of the medicine administration.
Effect: indicates the outcome of the treatment.
Attribute Attributes interpret certain properties of events, i.e., indicating whether an event is negated or speculated, and the severity level of the event.
negated: the attribute negated denotes whether or not there is any textual cues showing the event is negated, i.e., for ADE, the adverse effect does not exist; or for PTE, the therapy is ineffective.
speculated: the attribute speculated indicates if there is any uncertain or speculation as to whether an event will actually happen. Considering the speculative nature of the medical case reports, we only annotate a speculated attribute when the speculative attitude of the author is explicitly remarked.
severity: the attribute severity refers to the severity level of the adverse effect. For example, the fatal effect is a ‘high severity’, while a minor symptom could be a ‘low severity’. In general, we do not annotate ‘severity’ for PTE events.

Output the annotations as an array of JSON objects. DO NOT OUTPUT ANYTHING ELSE EXCEPT THE JSON OUTPUT. Generate the annotations for the following text:
"""
with open("examples.txt", "r") as file:
    lines = file.readlines()
    
    messages = []

    for i in range(0, len(lines)-1, 2):
        messages.append({"role": "user", "content": inst_prompt + lines[i]})
        messages.append({"role": "assistant", "content": lines[i+1]})
    
messages.append({"role": "user", "content": inst_prompt + "OBJECTIVE: To test the hypothesis that tumor necrosis factor (TNF)-alpha may mediate the loss and the dedifferentiation of subcutaneous fat tissue in the insulin-induced lipoatrophies of a diabetic patient who presented extensive lesions"})


encodeds = tokenizer.apply_chat_template(messages, tokenize=True, return_tensors="pt", add_generation_prompt=True)

# Move inputs to device
model_inputs = encodeds.to(device)

generated_ids = model.generate(model_inputs, max_new_tokens=1000, do_sample=True)
decoded = tokenizer.batch_decode(generated_ids)

with open('output.txt', 'w') as f:
    for item in decoded:
        f.write("%s\n" % item)


print("okey dokey")