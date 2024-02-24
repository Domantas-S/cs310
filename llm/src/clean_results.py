import os
import json


def remove_whitespace(results_file_name, output_file_name):
    """
    Removes extra whitespace from each line of a given file and writes the cleaned output to a new file.

    Parameters:
    results_file_name (str): The name of the file to be cleaned. Must be in the results directory.
    output_file_name (str): The name of the file to write the cleaned output to.
    Returns:
    None
    """
    cur_path = os.path.dirname('/Users/domantas/Documents/cs310/llm/')

    clean_output = open(os.path.relpath('results/'+output_file_name, cur_path), 'w')
    results_path = os.path.relpath('results/'+results_file_name, cur_path)

    with open(results_path, 'r') as f:
        for line in f:
            clean_output.write(' '.join(line.split()) + '\n')
            
    clean_output.close()


def remove_bad_lines(results_file_name, output_file_name):
    """
    Removes lines containing invalid JSONs. Writes the cleaned output to a new file. Bad lines are written to a separate file.

    Args:
        results_file_name (str): The name of the file to be cleaned. Must be in the results directory.
        output_file_name (str): The name of the file to write the cleaned output to.
    """
    cur_path = os.path.dirname('/Users/domantas/Documents/cs310/llm/')

    clean_output = open(os.path.relpath('results/'+output_file_name, cur_path), 'w')
    bad_lines = open(os.path.relpath('results/badlines.txt', cur_path), 'w')
    results_path = os.path.relpath('results/'+results_file_name, cur_path)

    with open(results_path, 'r') as f:
        for line in f:
            try:
                json.loads(line)
                clean_output.write(line)
            except json.JSONDecodeError:
                bad_lines.write(line)

    clean_output.close()
    bad_lines.close()


def main():
    remove_whitespace('output(avon_mixtral8x7b_run2).txt', 'whitespace_removed_output.txt')
    remove_bad_lines('whitespace_removed_output.txt', 'cleaned_output.txt')
    
main()