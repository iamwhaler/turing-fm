import _ from "lodash";
//from scale_graph_walking_no_pitch.constants import Amajor_matrix_no_pitch as Amajor

// start of the sequence to be returned by the API
var sequence_start;
// end of sequence returned by the API, set as the start of the next one
var sequence_end;


// all possible paths in the scale graph between the start and end notes
function find_all_paths(graph, start, end, path=[]) {
  path = path + [start];
  if (start == end) return [path];
  if (!(start in graph)) return [];

  var paths = [];
  var newpaths;

  for (let node in graph[start]) {
    if (!(node in path)) newpaths = find_all_paths(graph, node, end, path);
  }

  for (let newpath in newpaths) {
    paths.append(newpath);
  }

  return paths

}


// calculates cost of a path within the scale
function cost(path) {
  let cost = 0;
  let local_cost = 0;
  for (let i in range(0, len(path)-1)) {
    local_cost = intervals[Amajor[path[i]].index(path[i+1])];
  }
  cost += local_cost;
  return cost
}


// Randomly initializes a point in the solution space of paths and moves towards the local
// maximum of the neighborhood. Costs of intervals are defined in the intervals dict.
function find_local_optimum(paths){
  let current_solution_index = _.random(0, paths.length);

  while (true) {
    try {
      if (cost(paths[current_solution_index + 1]) < cost(paths[current_solution_index])) {
        current_solution_index += 1;
      }
      else if (cost(paths[current_solution_index - 1]) < cost(paths[current_solution_index])) {
        current_solution_index -= 1;
      }
      else {
        return paths[current_solution_index]
      }
    }
    catch(e) {
      return paths[current_solution_index - 1]
    }
  }
}



// How preferable is it to move over a certain interval
const intervals = [
    1,  // second
 7,  // third
 4,  // fourth
 8,  // fifth
 3,  // sixth
 2,  // seventh
];


// reset sequence start and end
sequence_start = list(Amajor.keys())[random.randint(0, len(Amajor.keys()) - 1)];
sequence_end = list(Amajor.keys())[random.randint(0, len(Amajor.keys()) - 1)];


function get_sequence(){
  let sequence_start;
  let sequence_end;
  let paths = find_all_paths(Amajor, sequence_start, sequence_end)
  sequence_start = list(Amajor.keys())[random.randint(0, len(Amajor.keys()) - 1)]
  sequence_end = list(Amajor.keys())[random.randint(0, len(Amajor.keys()) - 1)]
  return jsonify(find_local_optimum(paths))
}
