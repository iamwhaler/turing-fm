import random
from flask import jsonify

# start of the sequence to be returned by the API
global sequence_start
# end of sequence returned by the API, set as the start of the next one
global sequence_end


# all possible paths in the scale graph between the start and end notes
def find_all_paths(graph, start, end, path=[]):
    path = path + [start]
    if start == end:
        return [path]
    if start not in graph:
        return []
    paths = []
    for node in graph[start]:
        if node not in path:
            newpaths = find_all_paths(graph, node, end, path)
            for newpath in newpaths:
                paths.append(newpath)
    return paths


# calculates cost of a path within the scale
def cost(path):
    cost = 0
    for i in range(0, len(path)-1):
        local_cost = intervals[Amajor[path[i]].index(path[i+1])]
        cost += local_cost
    return cost


# Randomly initializes a point in the solution space of paths and moves towards the local
# maximum of the neighborhood. Costs of intervals are defined in the intervals dict.
def find_local_optimum(paths):
    current_solution_index = random.randint(0, len(paths))
    while True:
        try:
            if cost(paths[current_solution_index + 1]) < cost(paths[current_solution_index]):
                current_solution_index += 1
            elif cost(paths[current_solution_index - 1]) < cost(paths[current_solution_index]):
                current_solution_index -= 1
            else:
                return paths[current_solution_index]
        except IndexError:
            return paths[current_solution_index - 1]


# How preferable is it to move over a certain interval
intervals = {
    0: 1,  # second
    1: 7,  # third
    2: 4,  # fourth
    3: 8,  # fifth
    4: 3,  # sixth
    5: 2,  # seventh
}

Amajor = {'A': ['B', 'C#', 'D', 'E', 'F#', 'G#'],
          'B': ['C#', 'D', 'E', 'F#', 'G#', 'A'],
          'C#': ['D', 'E', 'F#', 'G#', 'A', 'B'],
          'D': ['E', 'F#', 'G#', 'A', 'B', 'C#'],
          'E': ['F#', 'G#', 'A', 'B', 'C#', 'D'],
          'F#': ['G#', 'A', 'B', 'C#', 'D', 'E'],
          'G#': ['A', 'B', 'C#', 'D', 'E', 'F#']}


# reset sequence start and end
sequence_start = list(Amajor.keys())[random.randint(0, len(Amajor.keys()) - 1)]
sequence_end = list(Amajor.keys())[random.randint(0, len(Amajor.keys()) - 1)]



def get_sequence():
    global sequence_start
    global sequence_end
    paths = find_all_paths(Amajor, sequence_start, sequence_end)
    sequence_start = list(Amajor.keys())[random.randint(0, len(Amajor.keys()) - 1)]
    sequence_end = list(Amajor.keys())[random.randint(0, len(Amajor.keys()) - 1)]
    return jsonify(find_local_optimum(paths))
