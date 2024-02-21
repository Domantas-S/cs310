import json

def deep_delete(data, keys_to_delete):
    if isinstance(data, dict):
        for key in list(data.keys()):
            if key in keys_to_delete:
                del data[key]
            elif isinstance(data[key], dict):
                deep_delete(data[key], keys_to_delete)
            elif isinstance(data[key], list):
                for item in data[key]:
                    deep_delete(item, keys_to_delete)
    elif isinstance(data, list):
        for item in data:
            deep_delete(item, keys_to_delete)

input_file = "dev.json"
output_file = "examples.txt"

with open(input_file, "r") as file:
    lines = [json.loads(line) for line in file.readlines()[:50]]

with open(output_file, "w") as file:
    for line in lines:
        annotations = line['annotations']
        deep_delete(annotations, ['event_id', 'entity_id'])
        file.write(line['context'] + '\n')
        file.write(json.dumps(annotations) + '\n')