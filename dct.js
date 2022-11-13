// constants to make algorithm more efficient
const SIZE = 8;
const RECIPROCAL_SQRT_2 = 1.0 / Math.sqrt(2);
const PI = Math.PI;

function compute() {
    // handle input matrix
    const input = document.getElementById("input_matrix").value.replaceAll(" ", "");
    const input_arr_1_dim = input.split(",");
    if (input_arr_1_dim.length != 64) {
        console.log("Must be a 8x8 matrix.");
        return;
    }
    const input_arr_2_dim = to_2_dim_arr(input_arr_1_dim);
    console.log(input_arr_2_dim);
    document.getElementById("input_matrix").innerHTML = display_matrix(input_arr_2_dim);

    // dct
    // create 8x8 Array and assign all values with 0
    var result_matrix = Array(8).fill(0).map(x => Array(8).fill(0));
    var u, v, cu, cv, j, k, sum;

    for (u = 0; u < SIZE; u++) {
        for (v = 0; v < SIZE; v++) {
            // C(u), C(v)
            cu = u == 0 ? RECIPROCAL_SQRT_2 : 1.0;
            cv = v == 0 ? RECIPROCAL_SQRT_2 : 1.0;
            sum = 0.0;
            for (j = 0; j < SIZE; j++) {
                for (k = 0; k < SIZE; k++) {
                    // tmp -> f(j,k)
                    var tmp = input_arr_2_dim[j][k];
                    tmp *= Math.cos(((2 * j + 1) * u * PI) / 16);
                    tmp *= Math.cos(((2 * k + 1) * v * PI) / 16);
                    sum += tmp;
                }
            }
            result_matrix[u][v] = Math.round(0.25 * cu * cv * sum); 
        }
    }
    console.log(result_matrix);
    document.getElementById("output_matrix").innerHTML = display_matrix(result_matrix);
}

function to_2_dim_arr(input_arr_1_dim) {
    var resultArray = [];
    for (var i = 0; i < input_arr_1_dim.length; i += SIZE) {
        // store values for each row in an tmp array
        let tmp = [];
        for (var j = i; j < i + SIZE; j++) {
            tmp.push(input_arr_1_dim[j]);
        }
        // push tmp array to 2 dim result array
        resultArray.push(tmp);
    }
    return resultArray;
}

function display_matrix(matrix) {
    var res = "";
    for (var x = 0; x < SIZE; x++) {
        for (var y = 0; y < SIZE; y++) {
            if (y == SIZE - 1) {
                res += matrix[x][y];
            } else {
                res += matrix[x][y] + "\t";
            }
        }
        res += "\n";
    }
    return res;
}