with open("mistral7b(dirty).txt", "r") as f:
    output = "["
    for line in f:
        output += line + ","
    output = output[:-1] + "]"
    with open("mistral7b(clean).json", "w") as f:
        f.write(output)
